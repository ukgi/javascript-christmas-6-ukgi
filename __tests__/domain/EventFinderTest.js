import { EVENTS } from '../../src/constants/benefit';
import EventFinder from '../../src/domain/EventFinder';

describe('이벤트 리스트 반환 테스트', () => {
  test.each([
    {
      date: 4,
      totalAmount: 10_000,
      event: [EVENTS.christmasDday, EVENTS.weekday],
    },
    {
      date: 25,
      totalAmount: 10_000,
      event: [EVENTS.christmasDday, EVENTS.weekday, EVENTS.special],
    },
    {
      date: 1,
      totalAmount: 10_000,
      event: [EVENTS.christmasDday, EVENTS.weekend],
    },
    {
      date: 26,
      totalAmount: 10_000,
      event: [EVENTS.weekday],
    },
    {
      date: 31,
      totalAmount: 10_000,
      event: [EVENTS.weekday, EVENTS.special],
    },
    {
      date: 29,
      totalAmount: 10_000,
      event: [EVENTS.weekend],
    },
  ])('날짜를 전달하면 해당하는 이벤트 반환', ({ date, totalAmount, event }) => {
    expect(EventFinder.getEvent(date, totalAmount)).toEqual(event);
  });

  test('총 주문금액이 120,000원 이상이면 증정 이벤트 당첨', () => {
    const date = 29;
    const totalAmount = 120_000;
    expect(EventFinder.getEvent(date, totalAmount)).toEqual([EVENTS.weekend, EVENTS.gift]);
  });

  test('총 주문금액이 120,000원 미만이면 증정 이벤트 미당첨', () => {
    const date = 29;
    const totalAmount = 110_000;
    expect(EventFinder.getEvent(date, totalAmount)).toEqual([EVENTS.weekend]);
  });
});
