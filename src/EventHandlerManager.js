import MenuManager from './lib/MenuManager';

export default class EventHandlerManager {
  static getBenefitByDate(date, menu, event) {
    const discount = [];
    event.forEach((eventName) => {
      if (eventName === '크리스마스 디데이 할인') discount.push(this.#christmasDdayHandler(date));
      if (eventName === '평일 할인') discount.push(this.#menuEventHandler(eventName, menu));
      if (eventName === '주말 할인') discount.push(this.#menuEventHandler(eventName, menu));
      if (eventName === '특별 할인') discount.push(this.#specialDayHandler());
    });
    return discount.filter(([, discountAmount]) => discountAmount > 0);
  }

  static #christmasDdayHandler(date) {
    return ['크리스마스 디데이 할인', 1000 + 100 * date - 100];
  }

  static #menuEventHandler(eventName, menu) {
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

  static #specialDayHandler() {
    return ['특별 할인', 1000];
  }
}
