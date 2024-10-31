import type { DB } from "../../db/db";
import type { Project, DbProject, Goal, DbGoal } from "./types";
import { fromDbProject, toDbProject, fromDbGoal, toDbGoal } from "./mappers";
import type { Result } from "./types";
import { ResultHandler } from "../../lib/result";

export const createProjectRepository = (db: DB) => {
  

  const exist = async (id: number): Promise<boolean> => {
    const query = db.prepare("SELECT COUNT(*) as count FROM projects WHERE id = ?");
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };


  const getById = async (id: number): Promise<Result<Project | undefined>> => {
    try {
      const exists = await exist(id);
      if (!exists) return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as DbProject;
      return ResultHandler.success(fromDbProject(data));
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as DbProject[];
      return ResultHandler.success(data.map(fromDbProject));
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };


  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const project = toDbProject(data);
      const query = db.prepare(`
        INSERT INTO projects (id, name, description, startDate, endDate, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      query.run(project.id, project.name, project.description, project.startDate, project.endDate, project.status);
      return ResultHandler.success(String(project.id));
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  const update = async (data: Project): Promise<Result<Partial<Project>>> => {
    try {
      const exists = await exist(data.id);
      if (!exists) return ResultHandler.failure("Project not found", "NOT_FOUND");

      const project = toDbProject(data);
      const query = db.prepare(`
        UPDATE projects SET name = ?, description = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?
      `);
      query.run(project.name, project.description, project.startDate, project.endDate, project.status, project.id);
      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  
  const addGoal = async (projectId: number, goal: Goal): Promise<Result<string>> => {
    try {
      const goalData = toDbGoal(goal);
      const query = db.prepare("INSERT INTO goals (id, projectId, description) VALUES (?, ?, ?)");
      query.run(goalData.id, projectId, goalData.description);
      return ResultHandler.success(goalData.id);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  const listGoals = async (projectId: string): Promise<Result<Goal[]>> => {
    try {
      const query = db.prepare("SELECT * FROM goals WHERE projectId = ?");
      const data = query.all(projectId) as DbGoal[];
      return ResultHandler.success(data.map(fromDbGoal));
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, update,  addGoal, listGoals };
};

// Type for project repository
export type ProjectRepository = ReturnType<typeof createProjectRepository>;