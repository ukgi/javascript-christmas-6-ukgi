import EventBadgeFinder from '../../src/domain/EventBadgeFinder';

describe('뱃지 테스트', () => {
  test('총 혜택금액이 5000원 미만이면 뱃지 없음', () => {
    const totalDiscount = 4999;
    expect(EventBadgeFinder.findBadge(totalDiscount)).toBe('없음');
  });

  test.each([5000, 9999])(
    '총 혜택금액이 5000원이상 10,000원 미만이면 별 뱃지 수여',
    (totalDiscount) => {
      expect(EventBadgeFinder.findBadge(totalDiscount)).toBe('별');
    },
  );

  test.each([10_000, 19_999])(
    '총 혜택금액이 10,000원이상 20,000원 미만이면 트리 뱃지 수여',
    (totalDiscount) => {
      expect(EventBadgeFinder.findBadge(totalDiscount)).toBe('트리');
    },
  );

  test.each([20_000, 30_000])('총 혜택금액이 20_000원 이상이면 산타 뱃지 수여', (totalDiscount) => {
    expect(EventBadgeFinder.findBadge(totalDiscount)).toBe('산타');
  });
});
