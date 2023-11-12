import EventFinder from './EventFinder.js';
import EventHandlerManager from './EventHandlerManager.js';
import MenuManager from './lib/MenuManager.js';

export default class BenefitCalculator {
  // 총 혜택내역을 계산해서 반환하는 외부인터페이스
  calculateTotalBenefit(date, menu) {
    const amount = this.#getTotalAmount(menu);
    if (amount >= 10_000) {
      const totalBenefit = this.#getTotalBenefit(date, menu, amount);
      const totalDiscount = this.#getTotalDiscount(totalBenefit);
      return { totalBenefit, totalDiscount };
    }
    return { totalBenefit: [], totalDiscount: 0 };
  }

  #getTotalBenefit(date, menu, amount) {
    const totalBenefit = [];
    if (amount >= 120_000) totalBenefit.push(['증정 이벤트', 25_000]);
    const event = EventFinder.getEventByDate(date);
    const benefitByDate = EventHandlerManager.getBenefitByDate(date, menu, event);
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

  #getTotalAmount(menu) {
    let amount = 0;
    menu.forEach(([menuName, count]) => {
      amount += MenuManager.getMenuAmount(menuName) * count;
    });
    return amount;
  }
}
