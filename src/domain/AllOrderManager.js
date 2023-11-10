import Menu from './Menu.js';
import Order from './Order.js';

export default class AllOrderManager {
  #allOrders;

  constructor(order) {
    const orderMenuTitle = order.map(([title]) => title.replace(/\s/g, ''));
    const orderMenuCount = order.map(([, count]) => Number(count));
    this.#validate(orderMenuTitle, orderMenuCount);
    this.#allOrders = order.map(
      ([menu, count]) => new Order(menu.replace(/\s/g, ''), Number(count)),
    );
  }

  calculateTotalOrderAmount() {
    return this.#allOrders.reduce((acc, cur) => (acc += cur.getTotalMenuAmount()), 0);
  }

  getTotalOrderInfo() {
    return this.#allOrders.reduce((acc, cur) => {
      acc.push(cur.getOrderInfo());
      return acc;
    }, []);
  }

  #validate(orderMenuTitle, orderMenuCount) {
    if (
      !this.#isAvailable(orderMenuTitle) ||
      this.#isDuplicate(orderMenuTitle) ||
      !this.#isValidOrderQuantity(orderMenuCount)
    ) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    if (this.#isOnlyOrderBeverage(orderMenuTitle)) {
      throw new Error('[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.');
    }
    if (this.#isExceedOrderLimit(orderMenuCount)) {
      throw new Error('[ERROR] 한번에 주문할 수 있는 갯수는 최대 20개입니다. 다시 입력해 주세요.');
    }
  }

  #isAvailable(orderMenuTitle) {
    const allMenuTitle = Menu.getOnlyMenuTitle();
    return orderMenuTitle.every((orderMenu) => allMenuTitle.includes(orderMenu));
  }

  #isDuplicate(orderMenuTitle) {
    return orderMenuTitle.length !== new Set(orderMenuTitle).size;
  }

  #isOnlyOrderBeverage(orderMenuTitle) {
    const beverages = Menu.getMenuByCategory('음료');
    return orderMenuTitle.every((menu) => beverages.includes(menu));
  }

  #isValidOrderQuantity(orderMenuCount) {
    return orderMenuCount.every((count) => count >= 1);
  }

  #isExceedOrderLimit(orderMenuCount) {
    return orderMenuCount.reduce((acc, cur) => (acc += cur), 0) > 20;
  }
}
