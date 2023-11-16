import BenefitCalculator from './domain/BenefitCalculator';
import EventPlannerController from './controller/EventPlannerController';

class App {
  async run() {
    await new EventPlannerController(new BenefitCalculator()).start();
  }
}

export default App;
