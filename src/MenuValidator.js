import MenuManager from './lib/MenuManager.js';

export default class MenuValidator {
  static validate(menuString) {
    if (!this.#isValidMenuFormat(menuString)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    const menuList = menuString.split(',').map((order) => order.split('-'));
    const menuCountList = menuList.map(([, count]) => Number(count));
    const menuNameList = menuList.map(([name]) => name.replace(/\s/g, ''));
    this.#validateCountList(menuCountList);
    this.#validateNameList(menuNameList);

    return menuList.map(([name, count]) => [name.replace(/\s/g, ''), Number(count)]);
  }

  static #validateNameList(nameList) {
    if (!this.#isAvailable(nameList) || this.#isDuplicate(nameList)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    if (this.#isOnlyOrderBeverage(nameList)) {
      throw new Error('[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.');
    }
  }

  static #validateCountList(countList) {
    if (!this.#isValidOrderQuantity(countList)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }

    if (this.#isExceedOrderLimit(countList)) {
      throw new Error('[ERROR] 한번에 주문할 수 있는 갯수는 최대 20개입니다. 다시 입력해 주세요.');
    }
  }

  static #isValidMenuFormat(menuString) {
    const hasHyphenPattern = /-/;
    return menuString.split(',').every((order) => hasHyphenPattern.test(order));
  }

  static #isAvailable(nameList) {
    const allMenuTitle = MenuManager.getOnlyMenuTitle();
    return nameList.every((orderMenu) => allMenuTitle.includes(orderMenu));
  }

  static #isDuplicate(nameList) {
    return nameList.length !== new Set(nameList).size;
  }

  static #isOnlyOrderBeverage(nameList) {
    const beverages = MenuManager.getMenuByCategory('음료');
    return nameList.every((menu) => beverages.includes(menu));
  }

  static #isValidOrderQuantity(countList) {
    return countList.every((count) => count >= 1);
  }

  static #isExceedOrderLimit(countList) {
    return countList.reduce((acc, cur) => (acc += cur), 0) > 20;
  }
}
