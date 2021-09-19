import Session from './session';

describe('The session lifecycle', () => {
  const session = new Session(1);
  const investments = {
    Steve: 10,
    Dave: 20
  };

  test('Adding profit of 50', () => {
    session.addProfit(50);
    expect(session.profit).toEqual(50);
  });

  test('Claiming throw error before settling', () => {
    expect(() => {
      session.claim('Steve');
    }).toThrow();
  });

  test('Settling the session', () => {
    session.settle(investments);
    expect(session.claimable.Steve).toEqual(16);
  });

  test('Adding profit throw error after settling', () => {
    expect(() => {
      session.addProfit(50);
    }).toThrow();
  });

  test('Claiming', () => {
    expect(session.claim('Steve')).toEqual(16);
  });

  test('Return 0 by second claiming', () => {
    expect(session.claim('Steve')).toEqual(0);
  });
});
