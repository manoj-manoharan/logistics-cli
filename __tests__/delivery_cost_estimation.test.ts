import { Container } from '../src/lib/Container/Container.js';
import { Dispatcher } from '../src/lib/Dispatcher/Dispatcher.js';
import { IDispatchItem } from '../src/lib/Dispatcher/IDispatcher.js';
import { Fleet } from '../src/lib/Fleet/Fleet.js';
import { IFleet } from '../src/lib/Fleet/IFleet.js';

describe('Conditional discount function', () => {
  let fleet: IFleet;

  beforeAll(() => {
    // Defining fleet
    fleet = new Fleet({
      baseDeliveryCost: 100,
      unitDistanceDeliveryCost: 5,
      unitWeightDeliveryCost: 10,
      vehicles: [],
    });
  });

  it('calculate discount: scenario 1', async () => {
    const input = [
      {
        container: new Container({
          containerId: 'PKG1',
          dimension: {
            weight: 5,
          },
          route: {
            distance: 5,
          },
        }),
        discountCode: 'OFR001',
      },
      {
        container: new Container({
          containerId: 'PKG2',
          dimension: {
            weight: 15,
          },
          route: {
            distance: 5,
          },
        }),
        discountCode: 'OFR002',
      },
      {
        container: new Container({
          containerId: 'PKG3',
          dimension: {
            weight: 10,
          },
          route: {
            distance: 100,
          },
        }),
        discountCode: 'OFR003',
      },
    ];

    const expectedOutput: Array<IDispatchItem> = [
      {
        container: new Container({
          containerId: 'PKG1',
          dimension: {
            weight: 5,
          },
          route: {
            distance: 5,
          },
        }),
        discountCode: 'OFR001',
        linePrice: 175,
        totalPrice: 175,
        discountPrice: 0,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        container: new Container({
          containerId: 'PKG2',
          dimension: {
            weight: 15,
          },
          route: {
            distance: 5,
          },
        }),
        discountCode: 'OFR002',
        linePrice: 275,
        totalPrice: 275,
        discountPrice: 0,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        container: new Container({
          containerId: 'PKG3',
          dimension: {
            weight: 10,
          },
          route: {
            distance: 100,
          },
        }),
        discountCode: 'OFR003',
        linePrice: 700,
        totalPrice: 665,
        discountPrice: 35,
        estimatedDeliveryTimeInHours: -1,
      },
    ];

    // Initializing
    const dispatcher = new Dispatcher({ fleet });
    // Adding to dispatch batch
    expect(
      await dispatcher
        .addToDispatch(input)
        .then(() => dispatcher.getPreparedItemsForDispatching()),
    ).toStrictEqual(expectedOutput);
  });

  it('calculate discount: scenario 2', async () => {
    const input = [
      {
        container: new Container({
          containerId: 'PKG1',
          dimension: {
            weight: 50,
          },
          route: {
            distance: 30,
          },
        }),
        discountCode: 'OFR001',
      },
      {
        container: new Container({
          containerId: 'PKG2',
          dimension: {
            weight: 75,
          },
          route: {
            distance: 125,
          },
        }),
        discountCode: 'OFFR0008',
      },
      {
        container: new Container({
          containerId: 'PKG3',
          dimension: {
            weight: 175,
          },
          route: {
            distance: 100,
          },
        }),
        discountCode: 'OFFR003',
      },
      {
        container: new Container({
          containerId: 'PKG4',
          dimension: {
            weight: 110,
          },
          route: {
            distance: 60,
          },
        }),
        discountCode: 'OFR002',
      },
      {
        container: new Container({
          containerId: 'PKG5',
          dimension: {
            weight: 155,
          },
          route: {
            distance: 95,
          },
        }),
        discountCode: '',
      },
    ];

    const expectedOutput: Array<IDispatchItem> = [
      {
        container: new Container({
          containerId: 'PKG1',
          dimension: {
            weight: 50,
          },
          route: {
            distance: 30,
          },
        }),
        discountCode: 'OFR001',
        linePrice: 750,
        totalPrice: 750,
        discountPrice: 0,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        container: new Container({
          containerId: 'PKG2',
          dimension: {
            weight: 75,
          },
          route: {
            distance: 125,
          },
        }),
        discountCode: 'OFFR0008',
        linePrice: 1475,
        totalPrice: 1475,
        discountPrice: 0,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        container: new Container({
          containerId: 'PKG3',
          dimension: {
            weight: 175,
          },
          route: {
            distance: 100,
          },
        }),
        discountCode: 'OFFR003',
        linePrice: 2350,
        totalPrice: 2350,
        discountPrice: 0,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        container: new Container({
          containerId: 'PKG4',
          dimension: {
            weight: 110,
          },
          route: {
            distance: 60,
          },
        }),
        discountCode: 'OFR002',
        linePrice: 1500,
        totalPrice: 1395,
        discountPrice: 105,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        container: new Container({
          containerId: 'PKG5',
          dimension: {
            weight: 155,
          },
          route: {
            distance: 95,
          },
        }),
        discountCode: '',
        linePrice: 2125,
        totalPrice: 2125,
        discountPrice: 0,
        estimatedDeliveryTimeInHours: -1,
      },
    ];

    // Initializing
    const dispatcher = new Dispatcher({ fleet });
    // Adding to dispatch batch
    expect(
      await dispatcher
        .addToDispatch(input)
        .then(() => dispatcher.getPreparedItemsForDispatching()),
    ).toStrictEqual(expectedOutput);
  });
});
