import { Console } from '@woowacourse/mission-utils';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import DateValidator from '../validate/DateValidator';
import MenuValidator from '../validate/MenuValidator';
import MenuManager from '../lib/MenuManager';
import EventBadgeFinder from '../domain/EventBadgeFinder';
import { EVENTS, GIFT } from '../constants/benefit';
import { INITIAL_GIFT, INITIAL_ZERO } from '../constants/constants';
import EventFinder from '../domain/EventFinder';

export default class EventPlannerController {
  #benefitCalculator;

  constructor(benefitCalculator) {
    this.#benefitCalculator = benefitCalculator;
    OutputView.printPlannerStart();
  }

  async start() {
    const { date, menu, totalAmount } = await this.#order();
    OutputView.printOrder(date, menu, totalAmount);

    const eventList = EventFinder.getEvent(date, totalAmount);
    OutputView.printGift(this.#handleGift(eventList));

    const { totalBenefit, totalDiscount } = this.#handleBenefitSummary(date, menu, eventList);
    const expectedAmountAfterDiscount = totalAmount - totalDiscount;
    OutputView.printBenefitSummary(totalBenefit, totalDiscount, expectedAmountAfterDiscount);

    OutputView.printBadge(EventBadgeFinder.findBadge(totalDiscount));
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

  #handleGift(eventList) {
    let gift = INITIAL_GIFT;
    if (eventList.find((event) => event === EVENTS.gift)) gift = GIFT;

    return gift;
  }

  #handleBenefitSummary(date, menu, eventList) {
    const { totalBenefit, totalDiscount } = this.#benefitCalculator.getBenefitSummary(
      date,
      menu,
      eventList,
    );

    return { totalBenefit, totalDiscount };
  }
}
