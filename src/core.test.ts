import Core from './core';

describe('Multiple claimable sessions flow', () => {
  process.env.MaxClaimableSession = '3';
  const core = new Core(0);

  test('Get max claimable session', () => {
    expect(core.getMaxClaimableSession()).toEqual(3);
  });

  test('Invest in the first session', () => {
    core.invest('Steve', 10);
    core.invest('Dave', 40);
    expect(core.investments['Steve']).toEqual(10);
  });

  test('Add profit in the first session', () => {
    core.addProfit(50);
    expect(core.getProfit()).toEqual(50);
  });

  test('Get claimable profit in the first session', () => {
    expect(core.getClaimableProfit('Steve')).toEqual(0);
  });

  test('Go to the second session', () => {
    core.nextSession();
    expect(core.getCurrentSession()).toEqual(1);
  });

  test('Invest in the second session', () => {
    core.invest('Steve', 10);
    expect(core.investments['Steve']).toEqual(20);
  });

  test('Add profit in the second session', () => {
    core.addProfit(10);
    expect(core.getProfit()).toEqual(10);
  });

  test('Get claimable profit in the second session', () => {
    expect(core.getClaimableProfit('Steve')).toEqual(10);
  });

  test('Go to the third session', () => {
    core.nextSession();
    expect(core.getCurrentSession()).toEqual(2);
  });

  test('Get claimable profit in the third sessoin', () => {
    expect(core.getClaimableProfit('Steve')).toEqual(13);
  });

  test('Claim for the first time should return previous claimables', () => {
    expect(core.claim('Steve')).toEqual(13);
  });

  test('Claim for the second time should return 0', () => {
    expect(core.claim('Steve')).toEqual(0);
  });
});
