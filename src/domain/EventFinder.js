export default class EventFinder {
  static getEvent(date, totalAmount) {
    const event = [];
    if (this.#isChristmasDday(date)) event.push('크리스마스 디데이 할인');
    if (this.#isWeekday(date)) event.push('평일 할인');
    else event.push('주말 할인');
    if (this.#isSpecialDay(date)) event.push('특별 할인');
    if (totalAmount >= 120_000) event.push('증정 이벤트');

    return event;
  }

  static #isChristmasDday(date) {
    return date >= 1 && date <= 25;
  }

  static #isWeekday(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const visiteDate = new Date(`2023-12-${date}`);
    const dayOfWeek = days[visiteDate.getDay()];
    return dayOfWeek !== '금' && dayOfWeek !== '토';
  }

  static #isSpecialDay(date) {
    const specialDay = [3, 10, 17, 24, 25, 31];
    return specialDay.includes(date);
  }
}
