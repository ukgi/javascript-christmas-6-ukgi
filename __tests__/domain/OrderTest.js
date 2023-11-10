import Order from '../../src/domain/Order';

describe('개별 주문 메뉴 테스트', () => {
  test('갯수에 맞게 메뉴의 주문금액을 반환합니다.', () => {
    const menu = '양송이수프';
    const count = 3;
    const order = new Order(menu, count);

    expect(order.getTotalMenuAmount()).toBe(18_000);
  });
});
