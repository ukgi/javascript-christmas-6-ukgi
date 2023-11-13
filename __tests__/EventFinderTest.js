import EventFinder from '../src/EventFinder';

describe('이벤트 리스트 반환 테스트', () => {
  test.each([
    {
      date: 4,
      event: ['크리스마스 디데이 할인', '평일 할인'],
    },
    {
      date: 25,
      event: ['크리스마스 디데이 할인', '평일 할인', '특별 할인'],
    },
    {
      date: 1,
      event: ['크리스마스 디데이 할인', '주말 할인'],
    },
    {
      date: 26,
      event: ['평일 할인'],
    },
    {
      date: 31,
      event: ['평일 할인', '특별 할인'],
    },
    {
      date: 29,
      event: ['주말 할인'],
    },
  ])('날짜를 전달하면 해당하는 이벤트 반환', ({ date, event }) => {
    expect(EventFinder.getEventByDate(date)).toEqual(event);
  });
});
