// src/entities/Country.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'country_code_two' })
  country_code_two: string;

  @Column({ name: 'country_code_three' })
  country_code_three: string;

  @Column({ name: 'mobile_code' })
  mobile_code: number;

  @Column({ name: 'continent_id' })
  continent_id: number;
}
