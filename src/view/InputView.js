import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants/message.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.date);
    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.order);
    return input;
  },
};

export default InputView;
