import EventFinder from './EventFinder.js';
import MenuManager from '../lib/MenuManager.js';

export default class BenefitCalculator {
  getBenefitSummary(date, menu, amount) {
    if (amount >= 10_000) {
      const event = EventFinder.getEvent(date, amount);
      const totalBenefit = this.#calculateBenefit(date, menu, event);
      const totalDiscount = this.#calculateTotalDiscount(totalBenefit);
      return { totalBenefit, totalDiscount };
    }
    return { totalBenefit: [], totalDiscount: 0 };
  }

  #calculateTotalDiscount(totalBenefit) {
    let totalDiscount = 0;
    totalBenefit.forEach(({ discount }) => {
      totalDiscount += discount;
    });

    return totalDiscount;
  }

  #calculateBenefit(date, menu, event) {
    const benefit = [];
    event.forEach((eventName) => {
      if (eventName === '크리스마스 디데이 할인')
        benefit.push(this.#christmasDdayHandler(eventName, date));
      if (eventName === '평일 할인') benefit.push(this.#menuEventHandler(eventName, menu));
      if (eventName === '주말 할인') benefit.push(this.#menuEventHandler(eventName, menu));
      if (eventName === '특별 할인') benefit.push(this.#specialDayHandler(eventName));
      if (eventName === '증정 이벤트') benefit.push(this.#giftHandler(eventName));
    });

    return benefit.filter(({ discount }) => discount > 0);
  }

  #christmasDdayHandler(event, date) {
    return { event, discount: 1000 + 100 * date - 100 };
  }

  #menuEventHandler(event, menu) {
    let discount = 0;
    if (event === '평일 할인') {
      menu.forEach(([menuName, count]) => {
        if (MenuManager.getCategoryByMenu(menuName) === '디저트') discount += 2023 * count;
      });
    }
    if (event === '주말 할인') {
      menu.forEach(([menuName, count]) => {
        if (MenuManager.getCategoryByMenu(menuName) === '메인') discount += 2023 * count;
      });
    }
    return { event, discount };
  }

  #specialDayHandler(event) {
    return { event, discount: 1000 };
  }

  #giftHandler(event) {
    return { event, discount: 25_000 };
  }
}
