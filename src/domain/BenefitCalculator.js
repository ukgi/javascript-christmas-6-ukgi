import MenuManager from '../lib/MenuManager.js';
import { DISCOUNT_AMOUNT, EVENTS } from '../constants/benefit.js';
import { INITIAL_ZERO, NO_DISCOUNT } from '../constants/conditions.js';
import { MENU_CATEGORY } from '../constants/menu.js';

export default class BenefitCalculator {
  getBenefitSummary(date, menu, event) {
    const totalBenefit = this.#calculateBenefit(date, menu, event);
    const totalDiscount = this.#calculateTotalDiscount(totalBenefit);

    return { totalBenefit, totalDiscount };
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
    if (event.length === 0) return benefit;

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
    if (event === EVENTS.weekday) {
      const discount = this.#calculateDiscountByCategory(menu, MENU_CATEGORY.dessert);
      return { event, discount };
    }
    if (event === EVENTS.weekend) {
      const discount = this.#calculateDiscountByCategory(menu, MENU_CATEGORY.main);
      return { event, discount };
    }
  }

  #calculateDiscountByCategory = (menu, category) => {
    let discount = INITIAL_ZERO;
    menu.forEach(([menuName, count]) => {
      if (MenuManager.getCategoryByMenu(menuName) === category)
        discount += DISCOUNT_AMOUNT.menu * count;
    });

    return discount;
  };

  #specialDayHandler(event) {
    return { event, discount: DISCOUNT_AMOUNT.special };
  }

  #giftHandler(event) {
    return { event, discount: DISCOUNT_AMOUNT.gift };
  }
}
