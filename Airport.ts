// src/entities/Airport.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './City';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icao_code: string;

  @Column()
  iata_code: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude_deg: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude_deg: number;

  @Column()
  elevation_ft: number;

  @ManyToOne(() => City, { eager: true }) // Eager loading for automatic join
  @JoinColumn({ name: 'city_id' })
  city: City;
}
