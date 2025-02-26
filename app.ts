// src/app.ts
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { Airport } from './entities/Airport';

const app = express();
const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {
  app.get('/airport', async (req, res) => {
    const { iata_code } = req.query;

    try {
      const airport = await connection.getRepository(Airport)
        .createQueryBuilder('airport')
        .leftJoinAndSelect('airport.city', 'city')
        .leftJoinAndSelect('city.country', 'country')
        .where('airport.iata_code = :iata_code', { iata_code })
        .getOne();

      if (!airport) {
        return res.status(404).json({ error: 'Airport not found' });
      }

      // Format the response
      const response = {
        airport: {
          id: airport.id,
          icao_code: airport.icao_code,
          iata_code: airport.iata_code,
          name: airport.name,
          type: airport.type,
          latitude_deg: airport.latitude_deg,
          longitude_deg: airport.longitude_deg,
          elevation_ft: airport.elevation_ft,
          address: {
            city: {
              id: airport.city.id,
              name: airport.city.name,
              country_id: airport.city.country ? airport.city.country.id : null,
              is_active: airport.city.is_active,
              lat: airport.city.lat,
              long: airport.city.long
            },
            country: airport.city.country ? {
              id: airport.city.country.id,
              name: airport.city.country.name,
              country_code_two: airport.city.country.country_code_two,
              country_code_three: airport.city.country.country_code_three,
              mobile_code: airport.city.country.mobile_code,
              continent_id: airport.city.country.continent_id
            } : null
          }
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Database connection error:', error);
});
