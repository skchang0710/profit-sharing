import 'dotenv/config';
import Core from './core';

test('test getMaxClaimableSession', () => {
  const core = new Core();
  expect(core.getMaxClaimableSession).toEqual(expect.any(Number));
});

