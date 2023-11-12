import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import DateValidator from './DateValidator.js';
import MenuValidator from './MenuValidator.js';
import MenuManager from './lib/MenuManager.js';

export default class EventPlannerController {
  #benefitCalculator;

  constructor(benefitCalculator) {
    this.#benefitCalculator = benefitCalculator;
  }

  async start() {
    const { date, menu, totalAmount } = await this.#order();
    OutputView.printMenu(menu);
    OutputView.printAmounts(totalAmount);

    const { totalBenefit, totalDiscount } = this.#getTotalBenefit(date, menu);
    OutputView.printBenefit(totalBenefit);
    OutputView.printTotalDiscount(totalDiscount);
    OutputView.printAmountAfterBenefit(totalAmount - totalDiscount);

    const badge = this.#getBadge(totalDiscount);
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

  #getTotalBenefit(date, menu) {
    const { totalBenefit, totalDiscount } = this.#benefitCalculator.calculateTotalBenefit(
      date,
      menu,
    );
    // 🐛FIX
    totalBenefit.forEach(([eventName]) => {
      if (eventName === '증정 이벤트') {
        return OutputView.printGift('샴페인 1개');
      }
      return OutputView.printGift('없음');
    });
    return { totalBenefit, totalDiscount };
  }

  #getBadge(totalDiscount) {
    if (totalDiscount >= 5000 && totalDiscount < 10_000) {
      return '별';
    }
    if (totalDiscount >= 10_000 && totalDiscount < 20_000) {
      return '트리';
    }
    if (totalDiscount >= 20_000) {
      return '산타';
    }
    return '없음';
  }
}
