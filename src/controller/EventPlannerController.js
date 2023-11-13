import { Console } from '@woowacourse/mission-utils';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import DateValidator from '../validate/DateValidator.js';
import MenuValidator from '../validate/MenuValidator.js';
import MenuManager from '../lib/MenuManager.js';
import EventBadgeFinder from '../EventBadgeFinder.js';

export default class EventPlannerController {
  #benefitCalculator;

  constructor(benefitCalculator) {
    this.#benefitCalculator = benefitCalculator;
  }

  async start() {
    const { date, menu, totalAmount } = await this.#order();
    OutputView.printEventBenefitsOnScreen(date);
    OutputView.printMenu(menu);
    OutputView.printAmounts(totalAmount);

    const { totalBenefit, totalDiscount, gift } = this.#getTotalBenefit(date, menu, totalAmount);
    OutputView.printGift(gift);
    OutputView.printBenefit(totalBenefit);
    OutputView.printTotalDiscount(totalDiscount);
    OutputView.printAmountAfterBenefit(totalAmount - totalDiscount);

    const badge = EventBadgeFinder.findBadge(totalDiscount);
    OutputView.printBadge(badge);
  }

  async #order() {
    const date = await this.#getDate();
    const menu = await this.#getMenu();
    const totalAmount = this.#getTotalAmount(menu);

    return { date, menu, totalAmount };
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

  #getTotalAmount(menu) {
    let amount = 0;
    menu.forEach(([menuName, count]) => {
      amount += MenuManager.getMenuAmount(menuName) * count;
    });

    return amount;
  }

  #getTotalBenefit(date, menu, totalAmount) {
    let gift = '';
    const { totalBenefit, totalDiscount } = this.#benefitCalculator.calculateTotalBenefit(
      date,
      menu,
      totalAmount,
    );
    if (totalBenefit.find(([eventName]) => eventName === '증정 이벤트')) gift = '샴페인 1개';

    return { totalBenefit, totalDiscount, gift };
  }
}