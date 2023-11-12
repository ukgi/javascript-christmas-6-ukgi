import EventPlannerController from './EventPlannerController.js';

class App {
  async run() {
    await new EventPlannerController().start();
  }
}

export default App;
