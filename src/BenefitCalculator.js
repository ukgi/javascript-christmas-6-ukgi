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
    const event = this.#getEventByDate(date);
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

  #getEventByDate(date) {
    const event = [];
    if (this.#isChristmasDday(date)) event.push('크리스마스 디데이 할인');
    if (this.#isWeekday(date)) event.push('평일 할인');
    else event.push('주말 할인');
    if (this.#isSpecialDay(date)) event.push('특별 할인');

    return event;
  }

  #isChristmasDday(date) {
    return date >= 1 && date <= 25;
  }

  #isWeekday(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const visiteDate = new Date(`2023-12-${date}`);
    const dayOfWeek = days[visiteDate.getDay()];
    return dayOfWeek !== '금' && dayOfWeek !== '토';
  }

  #isSpecialDay(date) {
    const specialDay = [3, 10, 17, 24, 25, 31];
    return specialDay.includes(date);
  }
}
