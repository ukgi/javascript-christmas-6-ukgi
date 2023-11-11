import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import AllOrderManager from './domain/AllOrderManager.js';
import OutputView from './OutputView.js';
import DateEvent from './domain/DateEvent.js';

class App {
  #date;

  #orders;

  #amounts;

  #dateEvent;

  async run() {
    this.#date = await this.#getDate();
    const { orders, amounts } = await this.#getOrderResult();
    this.#orders = orders;
    this.#amounts = amounts;
    this.#dateEvent = new DateEvent(this.#date, this.#orders);
    OutputView.printMenu(this.#orders);
    OutputView.printAmounts(this.#amounts);
    this.#printGiftWinner();
    this.#printBenefit();
    OutputView.printTotalDiscount(this.#calculateTotalDiscount());
    OutputView.printExpectedPaymentAfterBenefits(this.#calculateExpectedPaymentAfterBenefits());
  }

  #calculateExpectedPaymentAfterBenefits() {
    return this.#amounts - this.#calculateTotalDiscount();
  }

  #calculateTotalDiscount() {
    const discountByEvent = this.#dateEvent.getTotalDiscount();
    if (this.#isGiftWinner()) {
      const totalDiscount = discountByEvent + 25_000;
      return totalDiscount;
    }
    return discountByEvent;
  }

  #printBenefit() {
    if (this.#amounts < 10_000) {
      return OutputView.printBenefit('없음');
    }
    const benefitByDate = this.#dateEvent.getBenefit();
    const benefit = [...benefitByDate];
    if (this.#isGiftWinner()) {
      benefit.push(['증정 이벤트', 25_000]);
      return OutputView.printBenefit(benefit);
    }
    return OutputView.printBenefit(benefit);
  }

  #printGiftWinner() {
    if (this.#isGiftWinner()) {
      return OutputView.printGift('샴페인 1개');
    }
    OutputView.printGift('없음');
  }

  #isGiftWinner() {
    return this.#amounts >= 120_000;
  }

  async #getDate() {
    try {
      const answer = await InputView.readDate();
      return answer;
    } catch (error) {
      Console.print(error.message);
      return this.#getDate();
    }
  }

  async #getOrderResult() {
    try {
      const answer = await InputView.readOrder();
      const allOrderManager = new AllOrderManager(answer);
      return {
        orders: allOrderManager.getTotalOrderInfo(),
        amounts: allOrderManager.calculateTotalOrderAmount(),
      };
    } catch (error) {
      Console.print(error.message);
      return this.#getOrderResult();
    }
  }
}

export default App;
