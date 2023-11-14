const GIFT = '샴페인 1개';
const EVENTS = Object.freeze({
  christmasDday: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  weekend: '주말 할인',
  special: '특별 할인',
  gift: '증정 이벤트',
});

const DISCOUNT_AMOUNT = Object.freeze({
  special: 1000,
  gift: 25_000,
});

export { EVENTS, DISCOUNT_AMOUNT, GIFT };
