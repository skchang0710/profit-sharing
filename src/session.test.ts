import Session from './session';

describe('The session lifecycle', () => {
  const session = new Session(1);
  const investments = {
    Steve: 10,
    Dave: 20
  };

  test('Add profit of 50', () => {
    session.addProfit(50);
    expect(session.profit).toEqual(50);
  });

  test('Claim before settling should throw error', () => {
    expect(() => {
      session.claim('Steve');
    }).toThrow();
  });

  test('Settle the session', () => {
    session.settle(investments);
    expect(session.claimable.Steve).toEqual(16);
  });

  test('Add profit after settling should throw error', () => {
    expect(() => {
      session.addProfit(50);
    }).toThrow();
  });

  test('Claim for the first time', () => {
    expect(session.claim('Steve')).toEqual(16);
  });

  test('Claim for the second time should return 0', () => {
    expect(session.claim('Steve')).toEqual(0);
  });
});
