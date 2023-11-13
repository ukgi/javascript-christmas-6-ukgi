import BenefitCalculator from '../src/BenefitCalculator';

describe('방문날짜 이벤트 테스트', () => {
  let benefitCalculator;
  beforeEach(() => {
    benefitCalculator = new BenefitCalculator();
  });

  test('크리스마스 디데이 할인 + 평일 할인', () => {
    const date = 4;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const totalAmount = 110_000;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [
        ['크리스마스 디데이 할인', 1300],
        ['평일 할인', 2023],
      ],
      totalDiscount: 3323,
    });
  });

  test('크리스마스 디데이 할인 + 평일 할인 + 특별 할인', () => {
    const date = 25;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const totalAmount = 110_000;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [
        ['크리스마스 디데이 할인', 3400],
        ['평일 할인', 2023],
        ['특별 할인', 1000],
      ],
      totalDiscount: 6423,
    });
  });

  test('크리스마스 디데이 할인 + 주말 할인', () => {
    const date = 1;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const totalAmount = 110_000;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [
        ['크리스마스 디데이 할인', 1000],
        ['주말 할인', 2023],
      ],
      totalDiscount: 3023,
    });
  });

  test('평일 할인', () => {
    const date = 26;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const totalAmount = 110_000;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [['평일 할인', 2023]],
      totalDiscount: 2023,
    });
  });

  test('평일 할인 + 특별 할인', () => {
    const date = 31;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const totalAmount = 110_000;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [
        ['평일 할인', 2023],
        ['특별 할인', 1000],
      ],
      totalDiscount: 3023,
    });
  });

  test('주말 할인', () => {
    const date = 29;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const totalAmount = 110_000;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [['주말 할인', 2023]],
      totalDiscount: 2023,
    });
  });

  test('할인이 적용되지 않으면 빈 배열과 할인금액 0을 반환', () => {
    const date = 29;
    const order = [
      ['타파스', 1],
      ['시저샐러드', 1],
    ];
    const totalAmount = 13_500;

    expect(benefitCalculator.calculateTotalBenefit(date, order, totalAmount)).toEqual({
      totalBenefit: [],
      totalDiscount: 0,
    });
  });
});
