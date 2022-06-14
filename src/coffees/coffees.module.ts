import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// mock implementation
class MockCoffeesService {}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  // Custom mock provider:
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useClass: MockCoffeesService(),
  //   },
  // ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
