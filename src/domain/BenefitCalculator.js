import EventFinder from './EventFinder.js';
import MenuManager from '../lib/MenuManager.js';
import { DISCOUNT_AMOUNT, EVENTS } from '../constants/benefit.js';
import {
  INITIAL_ZERO,
  NO_BENEFIT,
  NO_DISCOUNT,
  THRESHOLD_AMOUNT,
} from '../constants/conditions.js';
import { MENU_CATEGORY } from '../constants/menu.js';

export default class BenefitCalculator {
  getBenefitSummary(date, menu, amount) {
    if (amount >= THRESHOLD_AMOUNT.benefit) {
      const event = EventFinder.getEvent(date, amount);
      const totalBenefit = this.#calculateBenefit(date, menu, event);
      const totalDiscount = this.#calculateTotalDiscount(totalBenefit);

      return { totalBenefit, totalDiscount };
    }
    return { totalBenefit: NO_BENEFIT, totalDiscount: NO_DISCOUNT };
  }

  #calculateTotalDiscount(totalBenefit) {
    let totalDiscount = INITIAL_ZERO;
    totalBenefit.forEach(({ discount }) => {
      totalDiscount += discount;
    });

    return totalDiscount;
  }

  #calculateBenefit(date, menu, event) {
    const benefit = [];
    event.forEach((eventName) => {
      if (eventName === EVENTS.christmasDday)
        benefit.push(this.#christmasDdayHandler(eventName, date));
      if (eventName === EVENTS.weekday) benefit.push(this.#menuEventHandler(eventName, menu));
      if (eventName === EVENTS.weekend) benefit.push(this.#menuEventHandler(eventName, menu));
      if (eventName === EVENTS.special) benefit.push(this.#specialDayHandler(eventName));
      if (eventName === EVENTS.gift) benefit.push(this.#giftHandler(eventName));
    });

    return benefit.filter(({ discount }) => discount > NO_DISCOUNT);
  }

  #christmasDdayHandler(event, date) {
    return { event, discount: 1000 + 100 * date - 100 };
  }

  #menuEventHandler(event, menu) {
    let discount = INITIAL_ZERO;
    if (event === EVENTS.weekday) {
      menu.forEach(([menuName, count]) => {
        if (MenuManager.getCategoryByMenu(menuName) === MENU_CATEGORY.dessert)
          discount += 2023 * count;
      });
    }
    if (event === EVENTS.weekend) {
      menu.forEach(([menuName, count]) => {
        if (MenuManager.getCategoryByMenu(menuName) === MENU_CATEGORY.main)
          discount += 2023 * count;
      });
    }

    return { event, discount };
  }

  #specialDayHandler(event) {
    return { event, discount: DISCOUNT_AMOUNT.special };
  }

  #giftHandler(event) {
    return { event, discount: DISCOUNT_AMOUNT.gift };
  }
}
