import Menu from './Menu.js';

export default class DateEvent {
  #date;

  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
  }

  getBenefit() {
    const event = this.#getEventByDate();
    return this.#getEventDiscount(event);
  }

  #getEventDiscount(event) {
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
      if (Menu.getCategoryByMenu(menu) === '디저트') {
        discount += 2023 * count;
      }
    });
    return ['평일 할인', discount];
  }

  #weekendHandler() {
    let discount = 0;
    this.#order.forEach(([menu, count]) => {
      if (Menu.getCategoryByMenu(menu) === '메인') {
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
