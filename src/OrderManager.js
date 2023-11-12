import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import DateEvent from './DateEvent.js';
import DateValidator from './DateValidator.js';
import MenuValidator from './MenuValidator.js';
import Menu from './lib/Menu.js';

export default class OrderManager {
  #date;

  #menu;

  #amounts;

  #dateEvent;

  async order() {
    this.#date = await this.#getDate();
    this.#menu = await this.#getMenu();
    this.#amounts = this.#getTotalAmount();
    this.#dateEvent = new DateEvent(this.#date, this.#menu);
    OutputView.printMenu(this.#menu);
    OutputView.printAmounts(this.#amounts);
    this.#printGiftWinner();
    this.#printBenefit();
    OutputView.printTotalDiscount(this.#calculateTotalDiscount());
    OutputView.printExpectedPaymentAfterBenefits(this.#calculateExpectedPaymentAfterBenefits());
    OutputView.printBadge(this.#assignBadge());
  }

  #getTotalAmount() {
    let amount = 0;
    this.#menu.forEach(([menu, count]) => {
      amount += Menu.getMenuAmount(menu) * count;
    });
    return amount;
  }

  #assignBadge() {
    let badge = '';
    const discount = this.#calculateTotalDiscount();
    if (discount >= 5_000) {
      badge = '별';
      return badge;
    }
    if (discount >= 10_000) {
      badge = '트리';
      return badge;
    }
    if (discount >= 20_000) {
      badge = '산타';
      return badge;
    }
    badge = '없음';
    return badge;
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
      return DateValidator.validate(answer);
    } catch (error) {
      Console.print(error.message);
      return this.#getDate();
    }
  }

  async #getMenu() {
    try {
      const answer = await InputView.readMenu();
      return MenuValidator.validate(answer);
    } catch (error) {
      Console.print(error.message);
      return this.#getMenu();
    }
  }
}
