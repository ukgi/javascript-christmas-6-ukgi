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
};

export default OutputView;
