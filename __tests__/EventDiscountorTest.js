import EventDiscountor from '../src/EventDiscountor';

describe('이벤트 혜택내역 반환 테스트', () => {
  test('이벤트에 따른 혜택내역을 반환합니다.', () => {
    const date = 4;
    const order = [
      ['해산물파스타', 1],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];
    const event = ['크리스마스 디데이 할인', '평일 할인'];

    expect(EventDiscountor.calculateBenefitByDate(date, order, event)).toEqual([
      ['크리스마스 디데이 할인', 1300],
      ['평일 할인', 2023],
    ]);
  });
});
