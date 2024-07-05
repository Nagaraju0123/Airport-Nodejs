// src/entities/City.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './Country';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country_id: number;

  @Column()
  is_active: boolean;

  @Column('decimal', { precision: 8, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 9, scale: 6 })
  long: number;

  @ManyToOne(() => Country, { eager: true }) // Eager loading for automatic join
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
