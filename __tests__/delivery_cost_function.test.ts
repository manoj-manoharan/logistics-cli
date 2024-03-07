import { Cart } from '../src/lib/Transaction/index.js';

describe('Conditional discount function', () => {
  it('calculate discount: scenario 1', async () => {
    const config = {
      baseCost: 100,
      unitDistanceCost: 5,
      unitWeightCost: 10,
    };

    const cart = new Cart({
      totalDistance: 5,
      totalWeight: 5,
      discountCode: 'OFR001',
      ...config,
    });

    expect(await cart.getTotalPrice()).toStrictEqual(175);
    expect(await cart.getDiscountedAmount()).toStrictEqual(0);
  });

  it('calculate discount: scenario 2', async () => {
    const config = {
      baseCost: 100,
      unitDistanceCost: 5,
      unitWeightCost: 10,
    };

    const cart = new Cart({
      totalDistance: 5,
      totalWeight: 15,
      discountCode: 'OFR002',
      ...config,
    });

    expect(await cart.getTotalPrice()).toStrictEqual(275);
    expect(await cart.getDiscountedAmount()).toStrictEqual(0);
  });

  it('calculate discount: scenario 3', async () => {
    const config = {
      baseCost: 100,
      unitDistanceCost: 5,
      unitWeightCost: 10,
    };

    const cart = new Cart({
      totalDistance: 100,
      totalWeight: 10,
      discountCode: 'OFR003',
      ...config,
    });

    expect(await cart.getTotalPrice()).toStrictEqual(665);
    expect(await cart.getDiscountedAmount()).toStrictEqual(35);
  });

  it('calculate discount: non round amount', async () => {
    const config = {
      baseCost: 100,
      unitDistanceCost: 5,
      unitWeightCost: 10,
    };

    const cart = new Cart({
      totalDistance: 1,
      totalWeight: 70,
      discountCode: 'OFR001',
      ...config,
    });

    expect(await cart.getTotalPrice()).toStrictEqual(724.5);
    expect(await cart.getDiscountedAmount()).toStrictEqual(80.5);
  });

  it('calculate discount: negative discount', async () => {
    const config = {
      baseCost: 100,
      unitDistanceCost: 5,
      unitWeightCost: 10,
    };

    const cart = new Cart({
      totalDistance: 10,
      totalWeight: 1,
      discountCode: 'OFR200PERCENT',
      ...config,
    });

    expect(await cart.getTotalPrice()).toStrictEqual(0);
    expect(await cart.getDiscountedAmount()).toStrictEqual(160);
  });
});
