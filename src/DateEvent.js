import MenuManager from './lib/MenuManager.js';

export default class DateEvent {
  #date;

  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
  }

  calculateTotalBenefit() {
    const amount = this.#getTotalAmount();
    if (amount >= 10_000) {
      const totalBenefit = this.#calculateBenefit(amount);
      const totalDiscount = this.#calculateDiscount(totalBenefit);
      return { totalBenefit, totalDiscount };
    }
    return { totalBenefit: [], totalDiscount: 0 };
  }

  #calculateDiscount(totalBenefit) {
    let totalDiscount = 0;
    totalBenefit.forEach(([, amount]) => {
      totalDiscount += amount;
    });
    return totalDiscount;
  }

  #calculateBenefit(amount) {
    const totalBenefit = [];
    if (amount >= 120_000) {
      totalBenefit.push(['증정 이벤트', 25_000]);
    }
    const event = this.#getEventByDate();
    const benefitByDate = this.#getBenefitDetails(event);
    benefitByDate.forEach((benefit) => {
      totalBenefit.push(benefit);
    });
    return totalBenefit;
  }

  #getTotalAmount() {
    let amount = 0;
    this.#order.forEach(([menuName, count]) => {
      amount += MenuManager.getMenuAmount(menuName) * count;
    });
    return amount;
  }

  #getBenefitDetails(event) {
    const discount = [];
    event.forEach((eventName) => {
      if (eventName === '크리스마스 디데이 할인') discount.push(this.#christmasDdayHandler());
      if (eventName === '평일 할인') discount.push(this.#weekdayHandler());
      if (eventName === '주말 할인') discount.push(this.#weekendHandler());
      if (eventName === '특별 할인') discount.push(this.#specialHandler());
    });
    return discount.filter(([, discountAmount]) => discountAmount > 0);
  }

  #christmasDdayHandler() {
    return ['크리스마스 디데이 할인', 1000 + 100 * this.#date - 100];
  }

  #weekdayHandler() {
    let discount = 0;
    this.#order.forEach(([menu, count]) => {
      if (MenuManager.getCategoryByMenu(menu) === '디저트') {
        discount += 2023 * count;
      }
    });
    return ['평일 할인', discount];
  }

  #weekendHandler() {
    let discount = 0;
    this.#order.forEach(([menu, count]) => {
      if (MenuManager.getCategoryByMenu(menu) === '메인') {
        discount += 2023 * count;
      }
    });
    return ['주말 할인', discount];
  }

  #specialHandler() {
    return ['특별 할인', 1000];
  }

  #getEventByDate() {
    const event = [];
    if (this.#isChristmasDday()) {
      event.push('크리스마스 디데이 할인');
    }
    if (this.#isWeekday()) {
      event.push('평일 할인');
    } else {
      event.push('주말 할인');
    }
    if (this.#isSpecialDay()) {
      event.push('특별 할인');
    }
    return event;
  }

  #isChristmasDday() {
    return this.#date >= 1 && this.#date <= 25;
  }

  #isWeekday() {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(`2023-12-${this.#date}`);
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek !== '금' && dayOfWeek !== '토';
  }

  #isSpecialDay() {
    const specialDay = [3, 10, 17, 24, 25, 31];
    return specialDay.includes(this.#date);
  }
}
