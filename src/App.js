import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import AllOrderManager from './domain/AllOrderManager.js';
import OutputView from './OutputView.js';

class App {
  #amounts;

  async run() {
    const date = await this.#getDate();
    const { orders, amounts } = await this.#getOrderResult();
    this.#amounts = amounts;
    OutputView.printMenu(orders);
    OutputView.printAmounts(amounts);
    this.#printGiftWinner();
  }

  #printGiftWinner() {
    if (this.#amounts >= 120_000) {
      return OutputView.printGift('샴페인 1개');
    }
    OutputView.printGift('없음');
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
      return this.#getOrderResult();
    }
  }
}

export default App;
