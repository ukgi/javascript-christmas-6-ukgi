import { ERROR_MESSAGE } from '../constants/message';
import MenuManager from '../lib/MenuManager';

export default class MenuValidator {
  static validate(menuString) {
    if (!this.#isValidMenuFormat(menuString)) {
      throw new Error(ERROR_MESSAGE.notValidOrder);
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
      throw new Error(ERROR_MESSAGE.notValidOrder);
    }
    if (this.#isOnlyOrderBeverage(nameList)) {
      throw new Error(ERROR_MESSAGE.notOrderOnlyBeverage);
    }
  }

  static #validateCountList(countList) {
    if (!this.#isValidOrderQuantity(countList)) {
      throw new Error(ERROR_MESSAGE.notValidOrder);
    }

    if (this.#isExceedOrderLimit(countList)) {
      throw new Error(ERROR_MESSAGE.maxOrderQuantity);
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
