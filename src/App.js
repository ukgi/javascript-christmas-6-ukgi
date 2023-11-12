import EventPlannerController from './EventPlannerController';

class App {
  async run() {
    await new EventPlannerController().start();
  }
}

export default App;
