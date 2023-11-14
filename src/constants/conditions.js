const INITIAL_ZERO = Object.freeze(0);
const NO_BENEFIT = Object.freeze([]);
const NO_DISCOUNT = Object.freeze(0);
const NO_RESULT_FOUND = '없음';

const THRESHOLD_AMOUNT = Object.freeze({
  benefit: 10_000,
  gift: 120_000,
  starBadge: 5000,
  treeBadge: 10_000,
  santaBadge: 20_000,
});

const EVENT_DATE = Object.freeze({
  christmasStart: 1,
  christmasEnd: 25,
  specialDays: [3, 10, 17, 24, 25, 31],
});

const DAYS = Object.freeze({
  weekdays: ['일', '월', '화', '수', '목', '금', '토'],
  weekend: ['금', '토'],
});

const VISITE_DATE = Object.freeze({
  minDay: 1,
  maxDay: 31,
});

export {
  INITIAL_ZERO,
  THRESHOLD_AMOUNT,
  EVENT_DATE,
  DAYS,
  NO_DISCOUNT,
  VISITE_DATE,
  NO_RESULT_FOUND,
  NO_BENEFIT,
};
