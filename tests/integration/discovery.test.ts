import assert from "node:assert";
import { before, describe, it } from "node:test";
import { Pool } from "pg";
import { app } from "src/app";

import request from "supertest";

describe("GET /discovery", () => {
  let pool: Pool;
  before(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
      await pool.query("SELECT 1");
    } catch (error) {
      throw new Error(
        "Database connection failed. Make sure docker-compose is running.\n" +
          "Run: docker-compose up -d && npm run seed" +
          "Error: " +
          error
      );
    }
  });

  describe("given no lat and long query params", () => {
    it("should return 400", async () => {
      const response = await request(app).get("/discovery");
      assert(response.status === 400);

      assert(
        response.body.error ===
          "Latitude (lat) and Longitude (long) are required parameters."
      );
    });
  });

  describe("given a valid lat and long query params", () => {
    it("should return 200", async () => {
      const response = await request(app).get("/discovery?lat=1&long=1");
      assert(response.status === 200);
    });

    it("should return at least 5 businesses", async () => {
      const response = await request(app).get("/discovery?lat=1&long=1");
      assert(response.body.length >= 5);
    });

    it("should return businesses with distance_km", async () => {
      const response = await request(app).get("/discovery?lat=1&long=1");
      assert(response.body.length > 0);
      for (const business of response.body) {
        assert(business.distance_km !== undefined);
      }
    });

    it("should return businesses sorted by distance", async () => {
      const response = await request(app).get("/discovery?lat=1&long=1");
      assert(response.status === 200);

      for (let i = 0; i < response.body.length - 1; i++) {
        assert(
          response.body[i].distance_km <= response.body[i + 1].distance_km
        );
      }
    });

    it("should adhere to the limit query param", async () => {
      const limit = 3;
      const response = await request(app).get(
        `/discovery?lat=1&long=1&limit=${limit}`
      );
      assert(response.body.length === limit);
    });

    it("should return error if limit is not a postive number", async () => {
      const response = await request(app).get(
        "/discovery?lat=1&long=1&limit=-1"
      );
      assert(response.status === 400);
      assert(response.body.error === "Limit must be a positive integer.");
    });

    it("should adhere to the type query param", async () => {
      const type = "Cafe";
      const response = await request(app).get(
        `/discovery?lat=1&long=1&type=${type}`
      );
      assert(response.body.length > 0);

      for (const business of response.body) {
        assert(business.type === type);
      }
    });
  });
});
