import OrderManager from './OrderManager';

class App {
  async run() {
    await new OrderManager().order();
  }
}

export default App;
