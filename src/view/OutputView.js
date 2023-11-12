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
    if (gift) {
      return Console.print(gift);
    }
    return Console.print('없음');
  },
  printBenefit(benefit) {
    Console.print('<혜택 내역>');
    if (benefit.length > 0) {
      benefit.forEach(([benefitTitle, discount]) => {
        Console.print(`${benefitTitle}: ${new Intl.NumberFormat().format(discount)}원`);
      });
    } else Console.print('없음');
  },
  printTotalDiscount(totalDiscount) {
    Console.print('<총혜택 금액>');
    Console.print(`${new Intl.NumberFormat().format(totalDiscount)}원`);
  },
  printAmountAfterBenefit(amount) {
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${new Intl.NumberFormat().format(amount)}원`);
  },
  printBadge(badge) {
    Console.print('<12월 이벤트 배지>');
    Console.print(badge);
  },
};

export default OutputView;
