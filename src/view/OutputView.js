import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printEventBenefitsOnScreen(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printMenu(orders) {
    Console.print('\n<주문 메뉴>');
    orders.forEach(([menu, count]) => Console.print(`${menu} ${count}개`));
  },

  printAmounts(amounts) {
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${this.convertToFormattedCurrency(amounts)}원`);
  },

  printGift(gift) {
    Console.print('\n<증정 메뉴>');
    if (gift) return Console.print(gift);
    return Console.print('없음');
  },

  printBenefit(benefit) {
    Console.print('\n<혜택 내역>');
    if (benefit.length > 0) {
      benefit.forEach(([benefitTitle, discount]) => {
        Console.print(`${benefitTitle}: ${this.convertToFormattedCurrency(-discount)}원`);
      });
    } else Console.print('없음');
  },

  printTotalDiscount(totalDiscount) {
    Console.print('\n<총혜택 금액>');
    Console.print(`${this.convertToFormattedCurrency(totalDiscount)}원`);
  },

  printAmountAfterBenefit(amount) {
    Console.print('\n<할인 후 예상 결제 금액>');
    Console.print(`${this.convertToFormattedCurrency(amount)}원`);
  },

  printBadge(badge) {
    Console.print('\n<12월 이벤트 배지>');
    Console.print(badge);
  },

  convertToFormattedCurrency(amount) {
    return new Intl.NumberFormat().format(amount);
  },
};

export default OutputView;
