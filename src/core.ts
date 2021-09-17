export default class Core {
  session = [];

  constructor() {
  }

  get getMaxClaimableSession() {
    const mcs = parseInt(process.env.MaxClaimableSession as string);
    return Number.isInteger(mcs) ? mcs : 1;
  }

  addProfit() {
  }

  invest() {
  }

  withdraw() {
  }

  claim() {
  }
}
