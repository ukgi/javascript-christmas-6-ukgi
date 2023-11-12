import MenuValidator from '../../src/validate/MenuValidator';

describe('주문 메뉴 유효성 테스트', () => {
  test('메뉴형식에 맞게 올바르게 주문합니다.', () => {
    const orders = '해산물파스타-1,레드와인-1,초코케이크-1';

    expect(() => {
      MenuValidator.validate(orders);
    }).not.toThrow();
  });

  test('메뉴판에 없는 메뉴를 입력하면 예외처리', () => {
    const order = '김치찌개-1';

    expect(() => {
      MenuValidator.validate(order);
    }).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });

  test('중복된 메뉴를 주문하면 예외처리', () => {
    const order = '양송이수프-1,양송이수프-1';

    expect(() => {
      MenuValidator.validate(order);
    }).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });

  test('음료만 주문하면 예외처리', () => {
    const order = '제로콜라-1,레드와인-1';

    expect(() => {
      MenuValidator.validate(order);
    }).toThrow('[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.');
  });

  test.each(['abc', '', ' ', '0'])('주문갯수가 1 이상의 숫자가 아니면 예외처리', (count) => {
    expect(() => {
      MenuValidator.validate(`티본스테이크-${count}`);
    }).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });

  test('한번에 메뉴주문을 20개 초과했을 경우 예외처리', () => {
    const order = '티본스테이크-10,레드와인-11';

    expect(() => {
      MenuValidator.validate(order);
    }).toThrow('[ERROR] 한번에 주문할 수 있는 갯수는 최대 20개입니다. 다시 입력해 주세요.');
  });
});
