import _ from 'lodash';

const ERROR_LEVEL = 0;
const WARN_LEVEL = 1;
const LOG_LEVEL = 2;
const DEBUG_LEVEL = 3;

// NOTE: logger adapter
export const getLogger = () => {
  const loggerLevel = _.chain(process.env)
    .get('LOGGER_LEVEL', ERROR_LEVEL)
    .parseInt()
    .value();
  switch (loggerLevel) {
    case ERROR_LEVEL:
      return {
        ERROR: console.log,
        WARN: _.noop,
        LOG: _.noop,
        DEBUG: _.noop,
      };
    case WARN_LEVEL:
      return {
        ERROR: console.log,
        WARN: console.log,
        LOG: _.noop,
        DEBUG: _.noop,
      }
    case LOG_LEVEL:
      return {
        ERROR: console.log,
        WARN: console.log,
        LOG: console.log,
        DEBUG: _.noop,
      };
    case DEBUG_LEVEL:
      return {
        ERROR: console.log,
        WARN: console.log,
        LOG: console.log,
        DEBUG: console.log,
      };
  }
  return {
    ERROR: _.noop,
    WARN: _.noop,
    LOG: _.noop,
    DEBUG: _.noop,
  };
}

export default getLogger;
