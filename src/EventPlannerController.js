import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import DateEvent from './DateEvent.js';
import DateValidator from './DateValidator.js';
import MenuValidator from './MenuValidator.js';
import MenuManager from './lib/MenuManager.js';

export default class EventPlannerController {
  async start() {
    const date = await this.#getDate();
    const menu = await this.#getMenu();
    const totalAmount = this.#getTotalAmount(menu);
    OutputView.printMenu(menu);
    OutputView.printAmounts(totalAmount);

    this.#totalBenefitHandler(date, menu, totalAmount);
  }

  #totalBenefitHandler(date, menu, totalAmount) {
    const { totalBenefit, totalDiscount } = new DateEvent(date, menu).getBenefit();
    totalBenefit.forEach(([event]) => {
      event === '증정 이벤트' ? OutputView.printGift('샴페인 1개') : OutputView.printGift('없음');
    });
    OutputView.printBenefit(totalBenefit);
    OutputView.printTotalDiscount(totalDiscount);
    this.#totalDiscountHandler(totalAmount, totalDiscount);
  }

  #totalDiscountHandler(totalAmount, totalDiscount) {
    const amountAfterBenefit = totalAmount - totalDiscount;
    const badge = this.#badgeHandler(totalDiscount);
    OutputView.printTotalDiscount(totalDiscount);
    OutputView.printAmountAfterBenefit(amountAfterBenefit);
    OutputView.printBadge(badge);
  }

  #badgeHandler(totalDiscount) {
    if (totalDiscount >= 5000) '별';
    if (totalDiscount >= 10_000) '트리';
    if (totalDiscount >= 20_000) '산타';
  }

  #getTotalAmount(menu) {
    let amount = 0;
    menu.forEach(([menuName, count]) => {
      amount += MenuManager.getMenuAmount(menuName) * count;
    });
    return amount;
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
