import estimateDeliveryCostAndTime from '../src/lib/estimateDeliveryTime.js';

describe('Delivery time estimation', () => {
  it('scenario 1', async () => {
    //
    const input = {
      baseDeliveryCost: 100,
      noOfPackages: 5,
      noOfVehicles: 2,
      max_speed: 70,
      max_weight_limit: 200,
      packages: [
        { id: 'PKG1', weight: 50, distance: 30, discountCode: 'OFR001' },
        { id: 'PKG2', weight: 75, distance: 125, discountCode: 'OFFR0008' },
        { id: 'PKG3', weight: 175, distance: 100, discountCode: 'OFFR003' },
        { id: 'PKG4', weight: 110, distance: 60, discountCode: 'OFFR002' },
        { id: 'PKG5', weight: 155, distance: 95, discountCode: '' },
      ],
    };

    //
    const expectedOutput = [
      { id: 'PKG1', discount: 0, totalCost: 750, estimatedTimeInHours: 3.98 },
      { id: 'PKG2', discount: 0, totalCost: 1475, estimatedTimeInHours: 1.78 },
      { id: 'PKG3', discount: 0, totalCost: 2350, estimatedTimeInHours: 1.42 },
      {
        id: 'PKG4',
        discount: 105,
        totalCost: 1395,
        estimatedTimeInHours: 0.85,
      },
      { id: 'PKG5', discount: 0, totalCost: 2125, estimatedTimeInHours: 4.19 },
    ];

    //
    expect(await estimateDeliveryCostAndTime(input)).toStrictEqual(
      expectedOutput,
    );
  });
});
