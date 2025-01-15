# Geo Business API

[![Build Status](https://github.com/AidanFogarty/geo-business-api/actions/workflows/ci.yml/badge.svg)](https://github.com/AidanFogarty/geo-business-api/actions/workflows/ci.yml)
![Node Version](https://img.shields.io/badge/node-v22-blue)

## Introduction

A simple API built with Node.js, TypeScript, Express, Drizzle, and Postgres.

## Installation

To run the API locally, you need to have the following installed:

- Node.js v22
- Docker & Docker Compose

1. Start the Postgres container

```bash
docker-compose up -d
```

Example output:

```bash
docker-compose up -d
[+] Running 1/0
 ✔ Container geo-business-api-postgres-1  Running0.0s
```

2. Install the dependencies

```bash
npm install
```

3. Run the API. The API is configured with auto-reload, so any changes you make to the code will be reflected in the API.

```bash
npm run dev
```

Example output:

```bash
geo-business-api > npm run dev

> geo-business-api@1.0.0 dev
> nodemon -r tsconfig-paths/register src/index.ts

[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node -r tsconfig-paths/register src/index.ts`
```

## Usage

### 1. Get all businesses near a point sorted by distance

```bash
curl -s "localhost:3000/discovery?lat=-40.7128&long=-74.0060" | jq -S
```

<details>
  <summary>Example Output</summary>

```json
[
  {
    "distance_km": 9054.11,
    "id": 26,
    "latitude": "40.7128",
    "longitude": "-74.006",
    "name": "Business 1",
    "type": "Cafe"
  },
  {
    "distance_km": 9285.61,
    "id": 30,
    "latitude": "41.8781",
    "longitude": "-87.6298",
    "name": "Business 5",
    "type": "Cafe"
  },
  {
    "distance_km": 9467.23,
    "id": 27,
    "latitude": "34.0522",
    "longitude": "-118.2437",
    "name": "Business 2",
    "type": "Restaurant"
  },
  {
    "distance_km": 12446.76,
    "id": 29,
    "latitude": "48.8566",
    "longitude": "2.3522",
    "name": "Business 4",
    "type": "Restaurant"
  },
  {
    "distance_km": 12487.62,
    "id": 28,
    "latitude": "51.5074",
    "longitude": "-0.1278",
    "name": "Business 3",
    "type": "Cafe"
  }
]
```

</details>

### 3. Get the top 3 businesses near a point sorted by distance

```bash
curl -s "localhost:3000/discovery?lat=-40.7128&long=-74.0060&limit=3" | jq -S
```

<details>
  <summary>Example Output</summary>

```json
[
  {
    "distance_km": 9054.11,
    "id": 26,
    "latitude": "40.7128",
    "longitude": "-74.006",
    "name": "Business 1",
    "type": "Cafe"
  },
  {
    "distance_km": 9285.61,
    "id": 30,
    "latitude": "41.8781",
    "longitude": "-87.6298",
    "name": "Business 5",
    "type": "Cafe"
  },
  {
    "distance_km": 9467.23,
    "id": 27,
    "latitude": "34.0522",
    "longitude": "-118.2437",
    "name": "Business 2",
    "type": "Restaurant"
  }
]
```

</details>

### 3. Get the top 3 businesses near a point which are Cafes

```bash
curl -s "localhost:3000/discovery?lat=-40.7128&long=-74.0060&type=Cafe&limit=3" | jq -S
```

<details>
  <summary>Example Output</summary>

```json
[
  {
    "distance_km": 9054.11,
    "id": 26,
    "latitude": "40.7128",
    "longitude": "-74.006",
    "name": "Business 1",
    "type": "Cafe"
  },
  {
    "distance_km": 9285.61,
    "id": 30,
    "latitude": "41.8781",
    "longitude": "-87.6298",
    "name": "Business 5",
    "type": "Cafe"
  },
  {
    "distance_km": 12487.62,
    "id": 28,
    "latitude": "51.5074",
    "longitude": "-0.1278",
    "name": "Business 3",
    "type": "Cafe"
  }
]
```

</details>
