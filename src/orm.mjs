import fs from 'fs';
import _ from 'lodash';

import getLogger from './logger.mjs';

const logger = getLogger();

// NOTE: Mock db instance, we can use other database system soon.
export const orm = [];

// NOTE: we need to find the data with exact key first
export const indexOrmForGet = orm => _.chain(orm)
  .orderBy(['key', 'timestamp'], ['asc', 'desc'])
  .value();

// NOTE: we need to find the latest data first
export const indexOrmForList = orm => _.chain(orm)
  .orderBy(['timestamp', 'key'], ['desc', 'asc'])
  .value();

/* NOTE: 1. dao service & a tiny json database engine
         2. implement index definition support in the future.
 */
export class DaoService {
  static list(timestamp = null) {
    logger.DEBUG('list/orm,timestamp:', JSON.stringify(orm, null, 2), timestamp);
    const data = _.chain(indexOrmForList(orm))
      .filter(item =>
        timestamp
          ? item.timestamp <= +timestamp
          : true)
      .uniqBy('key')
      .value();
    return {
      data,
      total: data.length,
      totalAll: orm.length,
    }
  }

  static get(key, timestamp = null) {
    if (_.chain(key).isEqual(undefined).value()) {
      throw new Error('No value in payload body.');
    };
    logger.DEBUG('get/timestamp,key:', key, timestamp);
    return _.chain(indexOrmForGet(orm))
      .find(item =>
        timestamp
          ? (item.key === key && item.timestamp <= +timestamp)
          : item.key === key)
      .value(); 
  }

  // NOTE: for now this action is not supported by frontend.
  static delete(key, timestamp = null) {
    if (_.chain(key).isEqual(undefined).value()) {
      throw new Error('No value in payload body.');
    };
    const index = _.chain(indexOrmForGet(orm))
      .findIndex(item =>
        timestamp
          ? (item.key === key && item.timestamp <= +timestamp)
          : item.key === key)
      .value();
    const removedItem = orm.splice(index, 1);
    logger.DEBUG('delete/removedItem,timestamp,key:', removedItem, timestamp, key);
    return orm;
  }

  static update(key, data, timestamp = null) {
    if (_.chain(key).isEqual(undefined).value()) {
      throw new Error('No value in payload body.');
    };
    if (_.chain(data).get('value').isEqual(undefined).value()) {
      throw new Error('No value in payload body.');
    };
    const index = _.chain(indexOrmForGet(orm))
      .findIndex(item =>
        timestamp
          ? (item.key === key && item.timestamp <= +timestamp)
          : item.key === key)
      .value();
    const updatedItem = _.chain(orm).get(index, {}).merge(data).value();
    logger.DEBUG('update/updatedItem,timestamp,data,key:', updatedItem, timestamp, data, key);
    return updatedItem;
  }

  static create(data) {
    if (_.chain(data).get('key').isEqual(undefined).value()) {
      throw new Error('No value in payload body.');
    };
    if (_.chain(data).get('value').isEqual(undefined).value()) {
      throw new Error('No value in payload body.');
    };
    orm.push({
      ...data, timestamp: Date.now(),
    });
    logger.DEBUG('create/data.orm:', data, orm);
    return orm;
  }
};

export const ormRestorer = (() => {
  try {
    const data = JSON.parse(fs.readFileSync('./persist.db.json', 'utf8'))
    orm.splice(0, 0, ...data);
  } catch(err) {
    logger.ERROR(err);
  }
})();

export const ormPersister = () => {
  fs.writeFileSync('./persist.db.json', JSON.stringify(orm, null, 2), 'utf8');
  setTimeout(ormPersister, 1000);
};
setTimeout(ormPersister, 1000);

export default DaoService;
