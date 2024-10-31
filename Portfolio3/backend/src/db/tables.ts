import { db } from "./db";

export const createTables = () => {
  const createProjectsTable = `
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      startDate TEXT,
      endDate TEXT,
      status TEXT
    );`;

  const createGoalsTable = `
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY,
      projectId INTEGER,
      description TEXT,
      FOREIGN KEY (projectId) REFERENCES projects(id)
    );`;

  db.exec(createProjectsTable);
  db.exec(createGoalsTable);
};