import EventFinder from './EventFinder.js';
import MenuManager from './lib/MenuManager.js';

export default class BenefitCalculator {
  calculateTotalBenefit(date, menu, amount) {
    if (amount >= 10_000) {
      const totalBenefit = this.#getTotalBenefit(date, menu, amount);
      const totalDiscount = this.#getTotalDiscount(totalBenefit);
      return { totalBenefit, totalDiscount };
    }
    return { totalBenefit: [], totalDiscount: 0 };
  }

  #getTotalBenefit(date, menu, amount) {
    const totalBenefit = [];
    const event = EventFinder.getEvent(date, amount);
    const benefitByDate = this.#calculateBenefitByDate(date, menu, event);
    benefitByDate.forEach((benefit) => {
      totalBenefit.push(benefit);
    });
    return totalBenefit;
  }

  #getTotalDiscount(totalBenefit) {
    let totalDiscount = 0;
    totalBenefit.forEach(([, amount]) => {
      totalDiscount += amount;
    });
    return totalDiscount;
  }

  #calculateBenefitByDate(date, menu, event) {
    const discount = [];
    event.forEach((eventName) => {
      if (eventName === '크리스마스 디데이 할인')
        discount.push(this.#christmasDdayHandler(eventName, date));
      if (eventName === '평일 할인') discount.push(this.#menuEventHandler(eventName, menu));
      if (eventName === '주말 할인') discount.push(this.#menuEventHandler(eventName, menu));
      if (eventName === '특별 할인') discount.push(this.#specialDayHandler(eventName));
      if (eventName === '증정 이벤트') discount.push(this.#giftHandler(eventName));
    });

    return discount.filter(([, discountAmount]) => discountAmount > 0);
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
