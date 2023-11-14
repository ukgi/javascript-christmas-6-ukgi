import { Console } from '@woowacourse/mission-utils';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import DateValidator from '../validate/DateValidator.js';
import MenuValidator from '../validate/MenuValidator.js';
import MenuManager from '../lib/MenuManager.js';
import EventBadgeFinder from '../domain/EventBadgeFinder.js';
import { EVENTS, GIFT } from '../constants/benefit.js';
import { INITIAL_ZERO } from '../constants/conditions.js';
import EventFinder from '../domain/EventFinder.js';

export default class EventPlannerController {
  #benefitCalculator;

  constructor(benefitCalculator) {
    this.#benefitCalculator = benefitCalculator;
    OutputView.printPlannerStart();
  }

  async start() {
    const { date, menu, totalAmount } = await this.#order();
    const eventList = EventFinder.getEvent(date, totalAmount);
    this.#giftHandler(eventList);
    const totalDiscount = this.#benefitHandler(date, menu, eventList);
    const expectedAmountAfterDiscount = totalAmount - totalDiscount;
    OutputView.printAmountAfterBenefit(expectedAmountAfterDiscount);
    OutputView.printBadge(EventBadgeFinder.findBadge(totalDiscount));
  }

  #benefitHandler(date, menu, eventList) {
    const { totalBenefit, totalDiscount } = this.#benefitCalculator.getBenefitSummary(
      date,
      menu,
      eventList,
    );
    OutputView.printBenefit(totalBenefit);
    OutputView.printTotalDiscount(totalDiscount);

    return totalDiscount;
  }

  async #order() {
    const date = await this.#getDate();
    const menu = await this.#getMenu();
    const totalAmount = this.#getTotalAmount(menu);
    OutputView.printEventBenefitsOnScreen(date);
    OutputView.printMenu(menu);
    OutputView.printAmounts(totalAmount);

    return { date, menu, totalAmount };
  }

  #giftHandler(eventList) {
    let gift = '';
    if (eventList.find((event) => event === EVENTS.gift)) gift = GIFT;
    OutputView.printGift(gift);
  }

  async #getDate() {
    try {
      const answer = await InputView.readDate();
      return DateValidator.validate(answer);
    } catch ({ message }) {
      Console.print(message);
      return this.#getDate();
    }
  }

  async #getMenu() {
    try {
      const answer = await InputView.readMenu();
      return MenuValidator.validate(answer);
    } catch ({ message }) {
      Console.print(message);
      return this.#getMenu();
    }
  }

  #getTotalAmount(menu) {
    let amount = INITIAL_ZERO;
    menu.forEach(([menuName, count]) => {
      amount += MenuManager.getMenuAmount(menuName) * count;
    });

    return amount;
  }
}
