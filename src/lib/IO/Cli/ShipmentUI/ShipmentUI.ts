import * as readline from 'readline';
import { IContainer } from '../../../Container/IContainer.js';
import { Container } from '../../../Container/Container.js';
import { Fleet } from '../../../Fleet/Fleet.js';
import { Dispatcher } from '../../../Dispatcher/Dispatcher.js';
import isString from '../../../../util/isString.js';

export class ShipmentUI {
  baseCost: number;
  noOfPackages: number;
  parcels: Array<{
    container: IContainer;
    discountCode: string;
  }> = [];
  rl: readline.Interface;
  fleet: Fleet;
  dispatcher: Dispatcher;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.fleet = new Fleet({
      baseDeliveryCost: 100,
      unitDistanceDeliveryCost: 5,
      unitWeightDeliveryCost: 10,
      vehicles: [],
    });

    this.dispatcher = new Dispatcher({ fleet: this.fleet });
  }

  first(): void {
    this.rl.question('Enter base cost and number of parcels: ', (input) => {
      const [baseCostStr, numberOfPackagesStr] = input.split(' ');

      if (isString(baseCostStr) && isString(numberOfPackagesStr)) {
        this.baseCost = Number(baseCostStr);
        this.noOfPackages = Number(numberOfPackagesStr);
        this.second();
      } else {
        console.log();
        console.error(
          '**Please enter the correct inputs for base cost and number of parcels**',
        );
        console.log();
        this.first();
      }
    });
  }

  second(): void {
    this.rl.question(
      `Enter parcel ${
        this.parcels.length + 1
      } details (pkgID weight distance offerCode): `,
      (input) => {
        try {
          const [containerId, weightStr, distanceStr, offerCode] =
            input.split(' ');
          const weight = Number(weightStr);
          const distance = Number(distanceStr);

          this.parcels.push({
            container: new Container({
              containerId,
              dimension: {
                weight,
              },
              route: {
                distance,
              },
            }),
            discountCode: offerCode || '',
          });

          if (this.parcels.length === this.noOfPackages) {
            this.third();
          } else {
            this.second();
          }
        } catch (e) {
          console.log();
          console.error(
            '**Please check the inputs for pkgID, weight, distance & discountCode**',
          );
          console.log();
          this.second();
        }
      },
    );
  }

  third(): void {
    throw new Error('Not implemented.');
  }
}
