import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constants/message.js';
import { NO_RESULT_FOUND } from '../constants/conditions.js';

const OutputView = {
  printPlannerStart() {
    Console.print(OUTPUT_MESSAGE.plannerStart);
  },

  printEventBenefitsOnScreen(date) {
    Console.print(`12월 ${date}일에 ${OUTPUT_MESSAGE.preview}`);
  },

  printMenu(orders) {
    Console.print(OUTPUT_MESSAGE.menu);
    orders.forEach(([menu, count]) => Console.print(`${menu} ${count}개`));
  },

  printAmounts(amounts) {
    Console.print(OUTPUT_MESSAGE.totalAmount);
    Console.print(`${this.convertToFormattedCurrency(amounts)}원`);
  },

  printGift(gift) {
    Console.print(OUTPUT_MESSAGE.gift);
    if (gift) return Console.print(gift);
    return Console.print(NO_RESULT_FOUND);
  },

  printBenefit(benefit) {
    Console.print(OUTPUT_MESSAGE.benefit);
    if (benefit.length > 0) {
      benefit.forEach(({ event, discount }) => {
        Console.print(`${event}: ${this.convertToFormattedCurrency(-discount)}원`);
      });
    } else Console.print(NO_RESULT_FOUND);
  },

  printTotalDiscount(totalDiscount) {
    Console.print(OUTPUT_MESSAGE.totalDiscount);
    Console.print(`${this.convertToFormattedCurrency(-totalDiscount)}원`);
  },

  printAmountAfterBenefit(amount) {
    Console.print(OUTPUT_MESSAGE.expectedAmountAfterDiscount);
    Console.print(`${this.convertToFormattedCurrency(amount)}원`);
  },

  printBadge(badge) {
    Console.print(OUTPUT_MESSAGE.eventBadge);
    Console.print(badge);
  },

  convertToFormattedCurrency(amount) {
    return new Intl.NumberFormat().format(amount);
  },
};

export default OutputView;
