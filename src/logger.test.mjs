import getLogger from './logger.mjs';

test('getLogger should be defined', () => {
  expect(getLogger).toBeDefined();
});

test('log method should be defined', () => {
  const logger = getLogger();
  expect(typeof logger.ERROR).toBe('function');
  expect(typeof logger.LOG).toBe('function');
  expect(typeof logger.WARN).toBe('function');
  expect(typeof logger.DEBUG).toBe('function');
});
