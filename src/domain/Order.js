import Menu from './Menu';

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
}
