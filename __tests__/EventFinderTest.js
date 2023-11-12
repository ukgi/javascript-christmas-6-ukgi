import EventFinder from '../src/EventFinder';

describe('이벤트 리스트 반환 테스트', () => {
  test('날짜를 전달하면 해당하는 이벤트 반환', () => {
    const date = 4;

    expect(EventFinder.getEventByDate(date)).toEqual(['크리스마스 디데이 할인', '평일 할인']);
  });
});
