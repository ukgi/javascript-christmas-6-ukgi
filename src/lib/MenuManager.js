import { MENU } from '../constants/menu';

export default class MenuManager {
  static #menu = MENU;

  static getOnlyMenuTitle() {
    const menuTitles = [];

    Object.keys(this.#menu).forEach((category) => {
      const menuItems = this.#menu[category];
      Object.keys(menuItems).forEach((menuItem) => {
        menuTitles.push(menuItem);
      });
    });

    return menuTitles;
  }

  static getMenuByCategory(category) {
    return Object.entries(this.#menu[category]).map(([menu]) => menu);
  }

  static getMenuAmount(menu) {
    let amount = 0;
    Object.values(this.#menu).forEach((currentMenu) => {
      if (currentMenu[menu]) {
        amount = currentMenu[menu];
      }
    });
    return amount;
  }

  static getCategoryByMenu(menu) {
    let category = '';
    Object.entries(this.#menu).forEach(([currentCategory, menuList]) => {
      if (menuList[menu]) {
        category = currentCategory;
      }
    });
    return category;
  }
}
