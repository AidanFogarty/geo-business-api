import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./db";
import { businessesTable } from "@db/schema";
import { haversineDistance } from "@utils/distance";
import { eq } from "drizzle-orm";

dotenv.config();

const DEFAULT_LIMIT = 10;

export const app: Express = express();

app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
  return;
});

app.get("/discovery", async (req: Request, res: Response) => {
  const { lat, long, limit, type } = req.query;
  if (!lat || !long) {
    res.status(400).json({
      error: "Latitude (lat) and Longitude (long) are required parameters.",
    });
    return;
  }

  const limitValue = parseInt(limit as string) || DEFAULT_LIMIT;
  if (isNaN(limitValue) || limitValue < 1) {
    res.status(400).json({
      error: "Limit must be a positive integer.",
    });
    return;
  }

  const businesses = await db
    .select()
    .from(businessesTable)
    .where(type ? eq(businessesTable.type, type as string) : undefined);

  const userLocation = {
    lat: parseFloat(lat as string),
    long: parseFloat(long as string),
  };

  const businessesWithDistance = businesses.map((business) => {
    const distance = haversineDistance(userLocation, {
      lat: parseFloat(business.latitude),
      long: parseFloat(business.longitude),
    });

    return {
      ...business,
      distance_km: distance,
    };
  });

  const sortedBusinesses = businessesWithDistance
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, limitValue);

  res.json(sortedBusinesses);
  return;
});
