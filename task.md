# Technical Test

## Overview

This code test focuses on creating a TypeScript API endpoint using Node.js & Express.js that retrieves a list of businesses based on latitude and longitude coordinates. The API provides functionality to order the businesses by proximity, limit the number of results, and filter by business type.

Once you have completed the project, please provide the GitHub repository link where your project is hosted, and ensure that you include a README file explaining how to set up the project and call the API. Also, leave a TODO section outlining potential improvements or next steps you would pursue with more time. Feel free to reach out if you have any further questions. Good luck!

## Task 1: Business Discovery API

Create a TypeScript API endpoint using Node.js that retrieves a list of businesses based on latitude and longitude coordinates. The SQL commands to create your SQL table are below this test. The API endpoint should be /discovery and accept two parameters, lat and long, representing the latitude and longitude values respectively.

```
GET /discovery?lat=X&long=Y
```

The API should return a JSON response containing an ordered list of businesses. Each business should include the following information:

- name: The name of the business.
- latitude: The latitude coordinate of the business.
- longitude: The longitude coordinate of the business.
- distance: distance from the input lat long

The list of businesses should be ordered by their proximity to the provided coordinates, with the closest businesses appearing first.

## Task 2: Limiting Results

Extend the API to allow limiting the number of results returned. Add an optional parameter limit to the API endpoint. The limit parameter should represent the maximum number of business entries to include in the response.

```
GET /discovery?lat=X&long=Y&limit=Z
```

For example, if the limit parameter is set to 5, the API should return a maximum of 5 businesses in the response, ordered by proximity.

## Task 3: Filtering by Business Type

Expand the API to support filtering businesses by their type. Add an optional parameter type to the API endpoint. The type parameter should represent the desired business type, which can be one of the following values: Cafe or Restaurant.

```
GET /discovery?lat=X&long=Y&limit=Z&type=Coffee
```

When the type parameter is provided, the API should return only the businesses of the specified type and meet the limit criteria.

```
GET /discovery?lat=X&long=Y&limit=Z&type=Coffee
```

For example, a request to /discovery?lat=X&long=Y&limit=Z&type=Coffee should return a JSON response containing an ordered list of a maximum of Z cafes located closest to the provided coordinates.

## SQL Commands

```sql
-- Create table to store business data
CREATE TABLE businesses (
id SERIAL PRIMARY KEY,
name VARCHAR(255),
latitude DECIMAL(9, 6),
longitude DECIMAL(9, 6),
type VARCHAR(50)
);

-- Sample data insertion
INSERT INTO businesses (name, latitude, longitude, type)
VALUES
('Business 1', 40.7128, -74.0060, 'Cafe'),
('Business 2', 34.0522, -118.2437, 'Restaurant'),
('Business 3', 51.5074, -0.1278, 'Cafe'),
('Business 4', 48.8566, 2.3522, 'Restaurant'),
('Business 5', 41.8781, -87.6298, 'Cafe'),
('Business 6', 51.5074, -0.1278, 'Restaurant');
```
