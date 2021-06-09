import fs from 'fs';
import _ from 'lodash';

import getLogger from '../logger.mjs';
import orm, { indexOrmForGet, indexOrmForList } from './index.mjs';

const logger = getLogger();

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
    return _.chain(orm).get(orm.length - 1).value();
  }

  // NOTE: for now those actions below are not supported by frontend.
  // static delete(key, timestamp = null) {
  //   if (_.chain(key).isEqual(undefined).value()) {
  //     throw new Error('No value in payload body.');
  //   };
  //   const index = _.chain(indexOrmForGet(orm))
  //     .findIndex(item =>
  //       timestamp
  //         ? (item.key === key && item.timestamp <= +timestamp)
  //         : item.key === key)
  //     .value();
  //   const removedItem = orm.splice(index, 1);
  //   logger.DEBUG('delete/removedItem,timestamp,key:', removedItem, timestamp, key);
  //   return orm;
  // }

  // static update(key, data, timestamp = null) {
  //   if (_.chain(key).isEqual(undefined).value()) {
  //     throw new Error('No value in payload body.');
  //   };
  //   if (_.chain(data).get('value').isEqual(undefined).value()) {
  //     throw new Error('No value in payload body.');
  //   };
  //   const index = _.chain(indexOrmForGet(orm))
  //     .findIndex(item =>
  //       timestamp
  //         ? (item.key === key && item.timestamp <= +timestamp)
  //         : item.key === key)
  //     .value();
  //   const updatedItem = _.chain(orm).get(index, {}).merge(data).value();
  //   logger.DEBUG('update/updatedItem,timestamp,data,key:', updatedItem, timestamp, data, key);
  //   return updatedItem;
  // }
};

export default DaoService;
