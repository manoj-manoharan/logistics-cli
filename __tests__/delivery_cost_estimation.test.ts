import { Dispatcher } from '../src/lib/Dispatcher/Dispatcher.js';
import { Fleet } from '../src/lib/Fleet/Fleet.js';
import { IFleet } from '../src/lib/Fleet/IFleet.js';

describe('Conditional discount function', () => {
  let fleet: IFleet;

  beforeAll(() => {
    // Defining fleet
    fleet = new Fleet({
      baseDeliveryCost: 100,
      unitDistanceDeliveryCost: 10,
      unitWeightDeliveryCost: 5,
      vehicles: [],
    });
  });

  it('calculate discount: scenario 1', async () => {
    const dispatcher = new Dispatcher({ fleet });
  });
});
