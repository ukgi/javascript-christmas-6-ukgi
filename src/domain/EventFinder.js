import { EVENTS } from '../constants/benefit.js';
import { DAYS, EVENT_DATE, THRESHOLD_AMOUNT } from '../constants/conditions.js';

export default class EventFinder {
  static getEvent(date, totalAmount) {
    const event = [];
    if (totalAmount < THRESHOLD_AMOUNT.benefit) return event;

    if (this.#isChristmasDday(date)) event.push(EVENTS.christmasDday);
    if (this.#isWeekday(date)) event.push(EVENTS.weekday);
    else event.push(EVENTS.weekend);
    if (this.#isSpecialDay(date)) event.push(EVENTS.special);
    if (totalAmount >= THRESHOLD_AMOUNT.gift) event.push(EVENTS.gift);

    return event;
  }

  static #isChristmasDday(date) {
    return date >= EVENT_DATE.christmasStart && date <= EVENT_DATE.christmasEnd;
  }

  static #isWeekday(date) {
    const visiteDate = new Date(`2023-12-${date}`);
    const dayOfWeek = DAYS.weekdays[visiteDate.getDay()];

    return !DAYS.weekend.includes(dayOfWeek);
  }

  static #isSpecialDay(date) {
    const specialDay = EVENT_DATE.specialDays;

    return specialDay.includes(date);
  }
}
