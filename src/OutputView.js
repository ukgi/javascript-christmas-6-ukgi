import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(orders) {
    Console.print('<주문 메뉴>');
    orders.forEach(([menu, count]) => {
      Console.print(`${menu} ${count}`);
    });
  },
  printAmounts(amounts) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${new Intl.NumberFormat().format(amounts)}원`);
  },
  printGift(gift) {
    Console.print('<증정 메뉴>');
    Console.print(gift);
  },
  printBenefit(benefit) {
    Console.print('<혜택 내역>');
    if (Array.isArray(benefit)) {
      benefit.forEach(([benefitTitle, discount]) => {
        Console.print(`${benefitTitle}: ${new Intl.NumberFormat().format(discount)}원`);
      });
    } else Console.print(benefit);
  },
  printTotalDiscount(totalDiscount) {
    Console.print('<총혜택 금액>');
    Console.print(`${new Intl.NumberFormat().format(totalDiscount)}원`);
  },
  printExpectedPaymentAfterBenefits(amount) {
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${new Intl.NumberFormat().format(amount)}원`);
  },
};

export default OutputView;
