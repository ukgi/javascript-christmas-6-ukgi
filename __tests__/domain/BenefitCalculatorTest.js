import { EVENTS } from '../../src/constants/benefit';
import { NO_BENEFIT, NO_DISCOUNT } from '../../src/constants/conditions';
import BenefitCalculator from '../../src/domain/BenefitCalculator';

describe('혜택 내역 테스트', () => {
  let benefitCalculator;
  let order;
  let totalAmount;
  beforeEach(() => {
    benefitCalculator = new BenefitCalculator();
    order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    totalAmount = 110_000;
  });

  test('크리스마스 디데이 할인 + 평일 할인', () => {
    const date = 4;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: [
        { event: EVENTS.christmasDday, discount: 1300 },
        { event: EVENTS.weekday, discount: 2023 },
      ],
      totalDiscount: 3323,
    });
  });

  test('크리스마스 디데이 할인 + 평일 할인 + 특별 할인', () => {
    const date = 25;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: [
        { event: EVENTS.christmasDday, discount: 3400 },
        { event: EVENTS.weekday, discount: 2023 },
        { event: EVENTS.special, discount: 1000 },
      ],
      totalDiscount: 6423,
    });
  });

  test('크리스마스 디데이 할인 + 주말 할인', () => {
    const date = 1;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: [
        { event: EVENTS.christmasDday, discount: 1000 },
        { event: EVENTS.weekend, discount: 2023 },
      ],
      totalDiscount: 3023,
    });
  });

  test('평일 할인', () => {
    const date = 26;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: [{ event: EVENTS.weekday, discount: 2023 }],
      totalDiscount: 2023,
    });
  });

  test('평일 할인 + 특별 할인', () => {
    const date = 31;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: [
        { event: EVENTS.weekday, discount: 2023 },
        { event: EVENTS.special, discount: 1000 },
      ],
      totalDiscount: 3023,
    });
  });

  test('주말 할인', () => {
    const date = 29;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: [{ event: EVENTS.weekend, discount: 2023 }],
      totalDiscount: 2023,
    });
  });
});

describe('혜택이 적용되지 않는 케이스 테스트', () => {
  let benefitCalculator;
  let order;
  let totalAmount;
  beforeEach(() => {
    benefitCalculator = new BenefitCalculator();
    order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    totalAmount = 110_000;
  });

  test('총 주문금액이 10,000원 미만이면 혜택 적용하지 않음', () => {
    const date = 28;
    order = [['타파스', 1]];
    totalAmount = 5500;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: NO_BENEFIT,
      totalDiscount: NO_DISCOUNT,
    });
  });

  test('평일이지만 디저트메뉴가 없음', () => {
    const date = 28;
    order = [
      ['타파스', 1],
      ['시저샐러드', 1],
    ];
    totalAmount = 13_500;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: NO_BENEFIT,
      totalDiscount: NO_DISCOUNT,
    });
  });

  test('주말이지만 메인메뉴가 없음', () => {
    const date = 29;
    order = [
      ['타파스', 1],
      ['시저샐러드', 1],
    ];
    totalAmount = 13_500;

    expect(benefitCalculator.getBenefitSummary(date, order, totalAmount)).toEqual({
      totalBenefit: NO_BENEFIT,
      totalDiscount: NO_DISCOUNT,
    });
  });
});