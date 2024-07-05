# Airport-nodejs

Airport Entity: Represents the Airport table with columns such as icao_code, iata_code, name, type, latitude_deg, longitude_deg, elevation_ft. It has a Many-to-One relationship with City.
City Entity: Represents the City table with columns like name, country_id, is_active, lat, long. It has a Many-to-One relationship with Country.
Country Entity: Represents the Country table with columns such as name, country_code_two, country_code_three, mobile_code, continent_id.
