import Core from './core';

describe('Multiple claimable sessions flow', () => {
  process.env.MaxClaimableSession = '3';
  const core = new Core(0);

  test('Returning 3 from getMaxClaimableSession', () => {
    expect(core.getMaxClaimableSession()).toEqual(3);
  });

  test('Investing', () => {
    core.invest('Steve', 10);
    core.invest('Dave', 40);
    expect(core.investments['Steve']).toEqual(10);
  });

  test('Adding profit', () => {
    core.addProfit(50);
    expect(core.getProfit()).toEqual(50);
  });

  test('Next session', () => {
    core.nextSession();
    expect(core.getCurrentSession()).toEqual(1);
  });

  test('Getting claimable profit', () => {
    expect(core.getClaimableProfit('Steve')).toEqual(10);
  });

  test('Investing more', () => {
    core.invest('Steve', 10);
    expect(core.investments['Steve']).toEqual(20);
  });

  test('Adding profit in the different session', () => {
    core.addProfit(10);
    expect(core.getProfit()).toEqual(10);
  });

  test('Getting claimable profit in the third sessoin', () => {
    core.nextSession();
    expect(core.getClaimableProfit('Steve')).toEqual(10);
  });

  test('Getting claimable profit in the third sessoin', () => {
    core.nextSession();
    expect(core.getClaimableProfit('Steve')).toEqual(10);
  });
});
