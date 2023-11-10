import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import AllOrderManager from './domain/AllOrderManager.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    const date = await this.#getDate();
    const { orders, amounts } = await this.#getOrderResult();
    OutputView.printMenu(orders);
    OutputView.printAmounts(amounts);
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

  async #getOrderResult() {
    try {
      const answer = await InputView.readOrder();
      const allOrderManager = new AllOrderManager(answer);
      return {
        orders: allOrderManager.getTotalOrderInfo(),
        amounts: allOrderManager.calculateTotalOrderAmount(),
      };
    } catch (error) {
      Console.print(error.message);
      return this.#getDate;
    }
  }
}

export default App;
