import Menu from './Menu.js';

export default class Order {
  #menu;

  #count;

  constructor(menu, count) {
    this.#menu = menu;
    this.#count = count;
  }

  getTotalMenuAmount() {
    return Menu.getMenuAmount(this.#menu) * this.#count;
  }

  getOrderInfo() {
    return [this.#menu, this.#count];
  }
}
