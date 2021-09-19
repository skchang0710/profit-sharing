import 'dotenv/config';
import Session from './session';

export default class Core {
  #sessions: Session[];
  #currentSession: number;
  #investments: {[key: string]: number};

  constructor(initSessionId: number) {
    this.#sessions = [new Session(initSessionId)];
    this.#currentSession = initSessionId;
    this.#investments = {};
  }

  get investments() {
    return this.#investments;
  }

  // read MaxClaimableSession from environment variable
  getMaxClaimableSession(): number {
    const mcs = parseInt(process.env.MaxClaimableSession as string);
    return Number.isInteger(mcs) ? mcs : 1;
  }

  getCurrentSession(): number {
    return this.#currentSession;
  }

  getClaimableSessions(): number[] {
    let claimableSessions = [];
    let i = this.#currentSession - 1;
    let min = this.#currentSession - this.getMaxClaimableSession();
    min = (min <= 0) ? 0 : min;
    while (i >= min) {
      claimableSessions.push(i);
      i--;
    }
    return claimableSessions;
  }

  nextSession() {
    this.#sessions[this.#currentSession].settle(this.#investments);
    this.#currentSession += 1;
    this.#sessions.push(new Session(this.#currentSession));
  }

  // return the profit of current session
  getProfit() {
    return this.#sessions[this.#currentSession].profit;
  }

  addProfit(amount: number) {
    // the amount is considered the minimum unit as an integer type
    // should use another type in real cases
    amount = Math.floor(amount);
    this.#sessions[this.#currentSession].addProfit(amount);
  }

  invest(name: string, amount: number) {
    if (typeof this.#investments[name] === 'number') {
      this.#investments[name] += amount;
    } else {
      this.#investments[name] = amount;
    }
  }

  withdraw(name: string, amount: number) {
    // the amount is considered the minimum unit as an integer type
    // should use another type in real case
    amount = Math.floor(amount);
    const balance = this.#investments[name];

    if (!balance) return 0;
    if (balance - amount <= 0) {
      this.#investments[name] = 0;
      return balance
    }
    this.#investments[name] -= amount;
    return amount;
  }

  getClaimableProfit(name: string) {
    const claimableSessions = this.getClaimableSessions();
    let amount = 0;
    for (let sid of claimableSessions) {
      amount += this.#sessions[sid].claimable[name] ?? 0;
    }
    return amount;
  }

  claim(name: string): number {
    const claimableSessions = this.getClaimableSessions();
    let amount = 0;
    for (let sid of claimableSessions) {
      amount += this.#sessions[sid].claim(name);
    }
    return amount;
  }
}
