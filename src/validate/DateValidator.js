import { VISITE_DATE } from '../constants/constants';
import { ERROR_MESSAGE } from '../constants/message';

export default class DateValidator {
  static validate(dateString) {
    if (Number.isNaN(Number(dateString)) || !this.#isValidDayOfMonth(dateString)) {
      throw new Error(ERROR_MESSAGE.notValidDate);
    }

    return Number(dateString);
  }

  static #isValidDayOfMonth(dateString) {
    return Number(dateString) >= VISITE_DATE.minDay && Number(dateString) <= VISITE_DATE.maxDay;
  }
}
