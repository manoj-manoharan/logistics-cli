import { Batcher } from '../src/lib/Batcher/Batcher.js';
import { Container } from '../src/lib/Container/Container.js';

describe('Batcher grouping', () => {
  it('calculate discount: scenario 1', async () => {
    const input = [
      new Container({
        containerId: 'PKG1',
        dimension: {
          weight: 5,
        },
        route: {
          distance: 5,
        },
      }),
      new Container({
        containerId: 'PKG2',
        dimension: {
          weight: 15,
        },
        route: {
          distance: 5,
        },
      }),
      new Container({
        containerId: 'PKG3',
        dimension: {
          weight: 10,
        },
        route: {
          distance: 100,
        },
      }),
    ];

    const expectedOutput = new Map([
      [
        0,
        [
          new Container({
            containerId: 'PKG1',
            dimension: {
              weight: 5,
            },
            route: {
              distance: 5,
            },
          }),
          new Container({
            containerId: 'PKG2',
            dimension: {
              weight: 15,
            },
            route: {
              distance: 5,
            },
          }),
          new Container({
            containerId: 'PKG3',
            dimension: {
              weight: 10,
            },
            route: {
              distance: 100,
            },
          }),
        ],
      ],
    ]);

    // Adding to dispatch batch
    expect(
      new Batcher().getBatchContainersMap({
        containers: input,
        maxCapacity: 200,
      }),
    ).toStrictEqual(expectedOutput);
  });

  it('calculate discount: scenario 2', async () => {
    const input = [
      new Container({
        containerId: 'PKG1',
        dimension: {
          weight: 50,
        },
        route: {
          distance: 30,
        },
      }),
      new Container({
        containerId: 'PKG2',
        dimension: {
          weight: 75,
        },
        route: {
          distance: 125,
        },
      }),
      new Container({
        containerId: 'PKG3',
        dimension: {
          weight: 175,
        },
        route: {
          distance: 100,
        },
      }),
      new Container({
        containerId: 'PKG4',
        dimension: {
          weight: 110,
        },
        route: {
          distance: 60,
        },
      }),
      new Container({
        containerId: 'PKG5',
        dimension: {
          weight: 155,
        },
        route: {
          distance: 95,
        },
      }),
    ];

    const expectedOutput = new Map([
      [
        0,
        [
          new Container({
            containerId: 'PKG2',
            dimension: {
              weight: 75,
            },
            route: {
              distance: 125,
            },
          }),
          new Container({
            containerId: 'PKG4',
            dimension: {
              weight: 110,
            },
            route: {
              distance: 60,
            },
          }),
        ],
      ],
      [
        1,
        [
          new Container({
            containerId: 'PKG3',
            dimension: {
              weight: 175,
            },
            route: {
              distance: 100,
            },
          }),
        ],
      ],
      [
        2,
        [
          new Container({
            containerId: 'PKG5',
            dimension: {
              weight: 155,
            },
            route: {
              distance: 95,
            },
          }),
        ],
      ],
      [
        3,
        [
          new Container({
            containerId: 'PKG5',
            dimension: {
              weight: 155,
            },
            route: {
              distance: 95,
            },
          }),
        ],
      ],
      [
        4,
        [
          new Container({
            containerId: 'PKG1',
            dimension: {
              weight: 50,
            },
            route: {
              distance: 30,
            },
          }),
        ],
      ],
    ]);

    expect(
      new Batcher().getBatchContainersMap({
        containers: input,
        maxCapacity: 200,
      }),
    ).toStrictEqual(expectedOutput);
  });
});
