import BenefitCalculator from './BenefitCalculator.js';
import EventPlannerController from './controller/EventPlannerController.js';

class App {
  async run() {
    await new EventPlannerController(new BenefitCalculator()).start();
  }
}

export default App;
