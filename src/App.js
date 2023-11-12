import OrderManager from './OrderManager.js';

class App {
  async run() {
    await new OrderManager().order();
  }
}

export default App;
