import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// mock implementation
// class MockCoffeesService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    }
  ]
  // non-class-based provider token:
  // providers: [
  //   CoffeesService,
  //   { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  // ],
  exports: [CoffeesService],
  // Custom mock provider:
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useClass: MockCoffeesService(),
  //   },
  // ],
})
export class CoffeesModule {}
