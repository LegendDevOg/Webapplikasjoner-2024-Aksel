import { createTables } from "./tables";
import { seedDatabase } from "./seed";
import db, { type DB } from "./db";

export const setupDatabase = () => {
  createTables();
  seedDatabase(db);
  console.log("Database setup complete.");
};
