export default class Session {
  #id: number;
  #profit: number;
  #isActive: boolean;
  #claimable: {[key: string]: number};

  constructor(id: number) {
    this.#id = id;
    this.#profit = 0;
    this.#isActive = true;
    this.#claimable = {};
  }

  get profit() {
    return this.#profit;
  }

  get claimable() {
    return this.#claimable;
  }

  verifyIfActive() {
    if (!this.#isActive) {
      throw new Error(`session ${this.#id} is inactive`);
    }
  }

  addProfit(amount: number) {
    this.verifyIfActive();
    this.#profit += amount;
  }

  settle(investments: {[key: string]: number}) {
    this.verifyIfActive();
    this.#isActive = false;

    // calculate the claimable amount of each investor,
    // the amount is considered the minimum unit as an integer type

    let totalInvestment = 0;
    for (let key in investments) {
      totalInvestment += investments[key];
    }
    for (let key in investments) {
      const amount = investments[key] / totalInvestment * this.#profit;
      this.#claimable[key] = Math.floor(amount);
    }
  }

  claim(name: string): number {
    if (this.#isActive) {
      throw new Error(`session ${this.#id} is active, not ready to claim`);
    }
    if (this.#claimable[name]) {
      const result = this.#claimable[name];
      this.#claimable[name] = 0;
      return result;
    } else {
      return 0;
    }
  }
}
