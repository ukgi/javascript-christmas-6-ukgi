import { ERROR_MESSAGE } from '../../src/constants/message';
import MenuValidator from '../../src/validate/MenuValidator';

describe('주문 메뉴 유효성 테스트', () => {
  test('메뉴형식에 맞게 올바르게 주문합니다.', () => {
    const order = '해산물파스타-1,레드와인-1,초코케이크-1';

    const resultFn = () => MenuValidator.validate(order);

    expect(() => {
      resultFn();
    }).not.toThrow();
  });

  test.each(['해산물파스타1', '해산물파스타->1', '해산물파스타 1'])(
    '메뉴 주문형식에 올바르지 않으면 예외처리',
    (order) => {
      const resultFn = () => MenuValidator.validate(order);

      expect(() => {
        resultFn();
      }).toThrow(ERROR_MESSAGE.notValidOrder);
    },
  );

  test('메뉴판에 없는 메뉴를 입력하면 예외처리', () => {
    const order = '김치찌개-1';

    const resultFn = () => MenuValidator.validate(order);

    expect(() => {
      resultFn();
    }).toThrow(ERROR_MESSAGE.notValidOrder);
  });

  test('중복된 메뉴를 주문하면 예외처리', () => {
    const order = '양송이수프-1,양송이수프-1';

    const resultFn = () => MenuValidator.validate(order);

    expect(() => {
      resultFn();
    }).toThrow(ERROR_MESSAGE.notValidOrder);
  });

  test('음료만 주문하면 예외처리', () => {
    const order = '제로콜라-1,레드와인-1';

    const resultFn = () => MenuValidator.validate(order);

    expect(() => {
      resultFn();
    }).toThrow(ERROR_MESSAGE.notOrderOnlyBeverage);
  });

  test.each(['abc', '', ' ', '0'])('주문갯수가 1 이상의 숫자가 아니면 예외처리', (count) => {
    const resultFn = () => MenuValidator.validate(`티본스테이크-${count}`);

    expect(() => {
      resultFn();
    }).toThrow(ERROR_MESSAGE.notValidOrder);
  });

  test('한번에 메뉴주문을 20개 초과했을 경우 예외처리', () => {
    const order = '티본스테이크-10,레드와인-11';

    const resultFn = () => MenuValidator.validate(order);

    expect(() => {
      resultFn();
    }).toThrow(ERROR_MESSAGE.maxOrderQuantity);
  });
});
