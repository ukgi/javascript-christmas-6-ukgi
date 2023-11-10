import DateEvent from '../../src/domain/DateEvent';

describe('방문날짜 이벤트 테스트', () => {
  test('크리스마스 디데이 + 평일 할인', () => {
    const date = 4;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);
    expect(dateEvent.getBenefit()).toEqual([
      ['크리스마스 디데이', 1300],
      ['평일 할인', 2023],
    ]);
  });

  test('크리스마스 디데이 + 평일 할인 + 특별한 날', () => {
    const date = 25;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);
    expect(dateEvent.getBenefit()).toEqual([
      ['크리스마스 디데이', 3400],
      ['평일 할인', 2023],
      ['특별한 날', 1000],
    ]);
  });

  test('크리스마스 디데이 + 주말 할인', () => {
    const date = 1;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);
    expect(dateEvent.getBenefit()).toEqual([
      ['크리스마스 디데이', 1000],
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

  test('평일 할인 + 특별한 날', () => {
    const date = 31;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const dateEvent = new DateEvent(date, order);
    expect(dateEvent.getBenefit()).toEqual([
      ['평일 할인', 2023],
      ['특별한 날', 1000],
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
});
