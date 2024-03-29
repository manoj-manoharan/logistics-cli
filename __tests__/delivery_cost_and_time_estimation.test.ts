import { Container } from '../src/lib/Container/Container.js';
import { Dispatcher } from '../src/lib/Dispatcher/Dispatcher.js';
import { IDispatchItem } from '../src/lib/Dispatcher/IDispatcher.js';
import { Fleet } from '../src/lib/Fleet/Fleet.js';
import { IFleet } from '../src/lib/Fleet/IFleet.js';

describe('Delivery cost and time estimation', () => {
  let fleet: IFleet;

  beforeEach(() => {
    // Defining fleet
    fleet = new Fleet({
      baseDeliveryCost: 100,
      unitDistanceDeliveryCost: 5,
      unitWeightDeliveryCost: 10,
      vehicles: [
        {
          maxSpeed: 70,
          maxWeightCapacity: 200,
        },
        {
          maxSpeed: 70,
          maxWeightCapacity: 200,
        },
      ],
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
        estimatedDeliveryTimeInHours: 0.07,
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
        estimatedDeliveryTimeInHours: 0.07,
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
        estimatedDeliveryTimeInHours: 1.42,
      },
    ];

    // Initializing
    const dispatcher = new Dispatcher({ fleet });
    // Adding to dispatch batch
    expect(
      await dispatcher.addToDispatch(input).then(() =>
        dispatcher.getPreparedItemsForDispatching({
          withTimeEstimation: true,
        }),
      ),
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
        estimatedDeliveryTimeInHours: 3.98,
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
        estimatedDeliveryTimeInHours: 1.78,
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
        estimatedDeliveryTimeInHours: 1.42,
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
        estimatedDeliveryTimeInHours: 0.85,
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
        estimatedDeliveryTimeInHours: 4.18,
      },
    ];

    // Initializing
    const dispatcher = new Dispatcher({ fleet });
    // Adding to dispatch batch
    expect(
      await dispatcher.addToDispatch(input).then(() =>
        dispatcher.getPreparedItemsForDispatching({
          withTimeEstimation: true,
        }),
      ),
    ).toStrictEqual(expectedOutput);
  });

  it('calculate discount: scenario 3', async () => {
    fleet = new Fleet({
      baseDeliveryCost: 100,
      unitDistanceDeliveryCost: 5,
      unitWeightDeliveryCost: 10,
      vehicles: [
        {
          maxSpeed: 50,
          maxWeightCapacity: 100,
        },
      ],
    });

    const input = [
      {
        container: new Container({
          containerId: 'PKG1',
          dimension: {
            weight: 70,
          },
          route: {
            distance: 50,
          },
        }),
        discountCode: 'OFR001',
      },
      {
        container: new Container({
          containerId: 'PKG2',
          dimension: {
            weight: 150,
          },
          route: {
            distance: 100,
          },
        }),
        discountCode: 'OFR002',
      },
      {
        container: new Container({
          containerId: 'PKG3',
          dimension: {
            weight: 80,
          },
          route: {
            distance: 200,
          },
        }),
        discountCode: 'OFR003',
      },
    ];

    const expectedOutput: Array<IDispatchItem> = [
      {
        ...input[0],
        linePrice: 1050,
        totalPrice: 945,
        discountPrice: 105,
        estimatedDeliveryTimeInHours: 9,
      },
      {
        ...input[1],
        linePrice: 2100,
        totalPrice: 1953,
        discountPrice: 147,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        ...input[2],
        linePrice: 1900,
        totalPrice: 1805,
        discountPrice: 95,
        estimatedDeliveryTimeInHours: 4,
      },
    ];

    // Initializing
    const dispatcher = new Dispatcher({ fleet });
    // Adding to dispatch batch
    expect(
      await dispatcher.addToDispatch(input).then(() =>
        dispatcher.getPreparedItemsForDispatching({
          withTimeEstimation: true,
        }),
      ),
    ).toStrictEqual(expectedOutput);
  });

  it('calculate discount: scenario 4', async () => {
    fleet = new Fleet({
      baseDeliveryCost: 100,
      unitDistanceDeliveryCost: 5,
      unitWeightDeliveryCost: 10,
      vehicles: [
        {
          maxSpeed: 50,
          maxWeightCapacity: 50,
        },
      ],
    });

    const input = [
      {
        container: new Container({
          containerId: 'PKG1',
          dimension: {
            weight: 70,
          },
          route: {
            distance: 50,
          },
        }),
        discountCode: 'OFR001',
      },
      {
        container: new Container({
          containerId: 'PKG2',
          dimension: {
            weight: 150,
          },
          route: {
            distance: 100,
          },
        }),
        discountCode: 'OFR002',
      },
      {
        container: new Container({
          containerId: 'PKG3',
          dimension: {
            weight: 80,
          },
          route: {
            distance: 200,
          },
        }),
        discountCode: 'OFR003',
      },
    ];

    const expectedOutput: Array<IDispatchItem> = [
      {
        ...input[0],
        linePrice: 1050,
        totalPrice: 945,
        discountPrice: 105,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        ...input[1],
        linePrice: 2100,
        totalPrice: 1953,
        discountPrice: 147,
        estimatedDeliveryTimeInHours: -1,
      },
      {
        ...input[2],
        linePrice: 1900,
        totalPrice: 1805,
        discountPrice: 95,
        estimatedDeliveryTimeInHours: -1,
      },
    ];

    // Initializing
    const dispatcher = new Dispatcher({ fleet });
    // Adding to dispatch batch
    expect(
      await dispatcher.addToDispatch(input).then(() =>
        dispatcher.getPreparedItemsForDispatching({
          withTimeEstimation: true,
        }),
      ),
    ).toStrictEqual(expectedOutput);
  });
});
