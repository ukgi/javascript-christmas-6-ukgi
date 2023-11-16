import { EVENTS } from '../../src/constants/benefit';
import { NO_BENEFIT, NO_DISCOUNT } from '../../src/constants/constants';
import BenefitCalculator from '../../src/domain/BenefitCalculator';

describe('혜택 내역 테스트', () => {
  let benefitCalculator;
  let order;
  beforeEach(() => {
    benefitCalculator = new BenefitCalculator();
    order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
  });

  test('크리스마스 디데이 할인 + 평일 할인', () => {
    const date = 4;
    const event = [EVENTS.christmasDday, EVENTS.weekday];
    const expectedSummary = {
      totalBenefit: [
        { event: EVENTS.christmasDday, discount: 1300 },
        { event: EVENTS.weekday, discount: 2023 },
      ],
      totalDiscount: 3323,
    };

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('크리스마스 디데이 할인 + 평일 할인 + 특별 할인', () => {
    const date = 25;
    const event = [EVENTS.christmasDday, EVENTS.weekday, EVENTS.special];
    const expectedSummary = {
      totalBenefit: [
        { event: EVENTS.christmasDday, discount: 3400 },
        { event: EVENTS.weekday, discount: 2023 },
        { event: EVENTS.special, discount: 1000 },
      ],
      totalDiscount: 6423,
    };

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('크리스마스 디데이 할인 + 주말 할인', () => {
    const date = 1;
    const event = [EVENTS.christmasDday, EVENTS.weekend];
    const expectedSummary = {
      totalBenefit: [
        { event: EVENTS.christmasDday, discount: 1000 },
        { event: EVENTS.weekend, discount: 2023 },
      ],
      totalDiscount: 3023,
    };

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('평일 할인', () => {
    const date = 26;
    const event = [EVENTS.weekday];
    const expectedSummary = {
      totalBenefit: [{ event: EVENTS.weekday, discount: 2023 }],
      totalDiscount: 2023,
    };

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('평일 할인 + 특별 할인', () => {
    const date = 31;
    const event = [EVENTS.weekday, EVENTS.special];
    const expectedSummary = {
      totalBenefit: [
        { event: EVENTS.weekday, discount: 2023 },
        { event: EVENTS.special, discount: 1000 },
      ],
      totalDiscount: 3023,
    };

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('주말 할인', () => {
    const date = 29;
    const event = [EVENTS.weekend];
    const expectedSummary = {
      totalBenefit: [{ event: EVENTS.weekend, discount: 2023 }],
      totalDiscount: 2023,
    };

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });
});

describe('혜택이 적용되지 않는 케이스 테스트', () => {
  let benefitCalculator;
  let expectedSummary;
  beforeEach(() => {
    benefitCalculator = new BenefitCalculator();
    expectedSummary = {
      totalBenefit: NO_BENEFIT,
      totalDiscount: NO_DISCOUNT,
    };
  });

  test('혜택받을 수 있는 이벤트가 존재하지 않음', () => {
    const date = 28;
    const order = [['타파스', 1]];
    const event = [];

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('평일이지만 디저트메뉴가 없음', () => {
    const date = 28;
    const order = [
      ['타파스', 1],
      ['시저샐러드', 1],
    ];
    const event = ['평일 할인'];

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });

  test('주말이지만 메인메뉴가 없음', () => {
    const date = 29;
    const order = [
      ['타파스', 1],
      ['시저샐러드', 1],
    ];
    const event = ['주말 할인'];

    const resultFn = () => benefitCalculator.getBenefitSummary(date, order, event);

    expect(resultFn()).toEqual(expectedSummary);
  });
});
