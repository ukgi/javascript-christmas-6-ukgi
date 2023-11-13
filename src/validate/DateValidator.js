export default class DateValidator {
  static validate(dateString) {
    if (Number.isNaN(Number(dateString)) || !this.#isValidDayOfMonth(dateString)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    return Number(dateString);
  }

  static #isValidDayOfMonth(dateString) {
    return Number(dateString) >= 1 && Number(dateString) <= 31;
  }
}
