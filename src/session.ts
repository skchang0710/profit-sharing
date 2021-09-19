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

  verifyIfActive() {
    if (!this.#isActive) {
      throw new Error(`session ${this.#id} is inactive`);
    }
  }

  addProfit(amount: number) {
    this.verifyIfActive();
    this.#profit = amount;
  }

  invest(name: string, amount: number) {
    this.verifyIfActive();
    if (typeof this.#claimable[name] === 'number') {
      this.#claimable[name] += amount;
    } else {
      this.#claimable[name] = amount;
    }
  }

  settle(investments: {[key: string]: number}) {
    this.verifyIfActive();
    this.#isActive = false;
  }

  claim(name: string) {
    if (this.#isActive) {
      throw new Error(`session ${this.#id} is active, not allow to claim`);
    }
  }
}
