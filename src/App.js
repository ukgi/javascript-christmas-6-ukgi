import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';

class App {
  async run() {
    const date = await this.#getDate();
  }

  async #getDate() {
    try {
      const answer = await InputView.readDate();
      return answer;
    } catch (error) {
      Console.print(error.message);
      return this.#getDate();
    }
  }
}

export default App;
