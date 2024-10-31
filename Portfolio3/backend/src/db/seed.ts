import { DB } from "./db";
import fs from 'fs';

export interface Goal {
    id: number;
    projectId: number;
    description: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  goals: Goal[];
}

export const seedDatabase = async (db: DB) => {
    const file = await fs.promises.readFile("data.json", "utf-8");

    const { projects, goals } = JSON.parse(file) as {
      projects: Project[];
      goals: Goal[];
    };
  
    const insertProject = db.prepare(`
      INSERT INTO projects (id, name, description, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertGoal = db.prepare(`
        INSERT INTO goals (id, projectId, description) VALUES (?, ?, ?)
      `);
    
    db.transaction(() => {
      for (const project of projects) {
        insertProject.run(project.id, project.name, project.description, project.startDate, project.endDate, project.status);
      }

      for (const goal of goals) {
        insertGoal.run(goal.id, goal.projectId, goal.description);
      }
  
    });
  };