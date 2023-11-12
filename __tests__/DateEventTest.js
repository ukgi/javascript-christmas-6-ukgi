import DateEvent from '../src/DateEvent';

describe('방문날짜 이벤트 테스트', () => {
  test('크리스마스 디데이 할인 + 평일 할인', () => {
    const date = 4;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([
      ['크리스마스 디데이 할인', 1300],
      ['평일 할인', 2023],
    ]);
  });

  test('크리스마스 디데이 할인 + 평일 할인 + 특별 할인', () => {
    const date = 25;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([
      ['크리스마스 디데이 할인', 3400],
      ['평일 할인', 2023],
      ['특별 할인', 1000],
    ]);
  });

  test('크리스마스 디데이 할인 + 주말 할인', () => {
    const date = 1;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([
      ['크리스마스 디데이 할인', 1000],
      ['주말 할인', 2023],
    ]);
  });

  test('평일 할인', () => {
    const date = 26;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([['평일 할인', 2023]]);
  });

  test('평일 할인 + 특별 할인', () => {
    const date = 31;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([
      ['평일 할인', 2023],
      ['특별 할인', 1000],
    ]);
  });

  test('주말 할인', () => {
    const date = 29;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([['주말 할인', 2023]]);
  });

  test('할인이 적용되지 않으면 빈 배열을 반환', () => {
    const date = 29;
    const order = [
      ['타파스', 1],
      ['시저샐러드', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getBenefit()).toEqual([]);
  });
});

describe('총 할인혜택 금액 테스트', () => {
  test('혜택이 있는 경우 총 혜택금액을 반환합니다.', () => {
    const date = 4;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);

    expect(dateEvent.getTotalDiscount()).toBe(3323);
  });
});
