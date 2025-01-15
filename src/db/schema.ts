import { decimal, pgTable, serial, text } from "drizzle-orm/pg-core";

export const businessesTable = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: decimal("latitude").notNull(),
  longitude: decimal("longitude").notNull(),
  type: text("type").notNull(),
});

export type BusinessSelect = typeof businessesTable.$inferSelect;
export type BusinessInsert = typeof businessesTable.$inferInsert;
