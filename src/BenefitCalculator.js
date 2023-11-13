import EventFinder from './EventFinder.js';
import MenuManager from './lib/MenuManager.js';

export default class BenefitCalculator {
  calculateTotalBenefit(date, menu, amount) {
    if (amount >= 10_000) {
      const event = EventFinder.getEvent(date, amount);
      const totalBenefit = this.#calculateBenefit(date, menu, event);
      const totalDiscount = this.#getTotalDiscount(totalBenefit);
      return { totalBenefit, totalDiscount };
    }
    return { totalBenefit: [], totalDiscount: 0 };
  }

  #getTotalDiscount(totalBenefit) {
    let totalDiscount = 0;
    totalBenefit.forEach(([, amount]) => {
      totalDiscount += amount;
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

    return benefit.filter(([, discountAmount]) => discountAmount > 0);
  }

  #christmasDdayHandler(eventName, date) {
    return [eventName, 1000 + 100 * date - 100];
  }

  #menuEventHandler(eventName, menu) {
    let discount = 0;
    if (eventName === '평일 할인') {
      menu.forEach(([menuName, count]) => {
        if (MenuManager.getCategoryByMenu(menuName) === '디저트') discount += 2023 * count;
      });
    }
    if (eventName === '주말 할인') {
      menu.forEach(([menuName, count]) => {
        if (MenuManager.getCategoryByMenu(menuName) === '메인') discount += 2023 * count;
      });
    }
    return [eventName, discount];
  }

  #specialDayHandler(eventName) {
    return [eventName, 1000];
  }

  #giftHandler(eventName) {
    return [eventName, 25_000];
  }
}
