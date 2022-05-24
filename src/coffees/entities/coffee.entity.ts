import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    () => Flavor,
    (flavor) => flavor.coffees, // what is "coffee" within the Flavor Entity
    {
      cascade: true, // ['insert']
    },
  )
  flavors: Flavor[];
}
