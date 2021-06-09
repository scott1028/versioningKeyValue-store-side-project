import DaoService from './DaoService.mjs';

test('DaoService should be defined', () => {
  expect(DaoService).toBeDefined();
});

test('Methods of DaoService be defined', () => {
  expect(typeof DaoService.list).toBe('function');
  expect(typeof DaoService.get).toBe('function');
  expect(typeof DaoService.create).toBe('function');
  // NOTE: for now those actions below are not supported by frontend.
  // expect(typeof DaoService.delete).toBe('function');
  // expect(typeof DaoService.update).toBe('function');
});
