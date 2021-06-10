import fs from 'fs';
import _ from 'lodash';

import getLogger from '../logger.mjs';

const logger = getLogger();

// NOTE: Mock db instance, we can use other database system soon.
export const orm = [];

// NOTE: we need to find the data with exact key first
export const indexOrmForGet = orm => _.chain(orm)
  .orderBy(['key', 'timestamp'], ['asc', 'desc'])
  .value();

// NOTE: we need to find the latest data first with latest timestamp first sorting
export const indexOrmForList = orm => _.chain(orm)
  .orderBy(['timestamp', 'key'], ['desc', 'asc'])
  .value();

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
!_.chain(process).get('env.NODE_ENV').isEqual('test') && setTimeout(ormPersister, 1000);

export default orm;
