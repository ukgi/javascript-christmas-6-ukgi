import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );
    return input;
  },

  async readOrder() {
    const hasHyphenPattern = /-/;
    const input = await Console.readLineAsync(
      '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
    );
    if (!input.split(',').every((order) => hasHyphenPattern.test(order))) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    return input.split(',').map((order) => order.split('-'));
  },
};

export default InputView;
