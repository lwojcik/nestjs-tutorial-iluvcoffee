import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// mock implementation
// class MockCoffeesService {}

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// Factory providers

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    /* ... do something ... */
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
      inject: [CoffeeBrandsFactory],
    },
  ],
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: async (): Promise<string[]> => {
  //       // const coffeeBrands = await connection.query('SELECT * ...);
  //       const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
  //       console.log('Async factory!');
  //       return coffeeBrands;
  //     },
  //   },
  // ],
  exports: [CoffeesService],
  // Factory provider:
  // providers: [
  //   CoffeesService,
  //   CoffeeBrandsFactory,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: () => ['buddy brew', 'nescafe'],
  //     inject: [CoffeeBrandsFactory],
  //   },
  // ],
  // normal:
  // providers: [CoffeesService],
  // class-based provider token:
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: ConfigService,
  //     useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
  //   }
  // ]
  // non-class-based provider token:
  // providers: [
  //   CoffeesService,
  //   { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  // ],
  // Custom mock provider:
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useClass: MockCoffeesService(),
  //   },
  // ],
})
export class CoffeesModule {}
