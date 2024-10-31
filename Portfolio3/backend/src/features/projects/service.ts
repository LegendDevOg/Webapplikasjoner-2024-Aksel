import type { Project, Goal } from "./types";
import { createProjectRepository, type ProjectRepository } from "./repository";
import { Result, ResultHandler } from "../../lib/result";
import { validateProject, validateGoal } from "../../utils/validator"; // Assuming you have validators
import db from "../../db/db"; // Replace with actual path to your db import

export const createProjectService = (repo: ProjectRepository) => {
  // Get project by ID
  const getProjectById = async (
    id: number
  ): Promise<Result<Project | undefined>> => {
    const project = await repo.getById(id);
    if (!project) {
      return ResultHandler.failure("Project not found", "NOT_FOUND");
    }
    return project;
  };

  // Create a new project
  const createProject = async (data: Project): Promise<Result<string>> => {
    if (!validateProject(data)) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return repo.create(data);
  };

  // List all projects
  const listProjects = async (): Promise<Result<Project[]>> => {
    const projects = await repo.list();
    return projects;
  };

  // Update an existing project
  const updateProject = async (
    data: Project
  ): Promise<Result<Partial<Project>>> => {
    const existingProject = await repo.getById(data.id);
    if (!existingProject) {
      return ResultHandler.failure("Project not found", "NOT_FOUND");
    }
    if (!validateProject(data)) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return repo.update(data);
  };


  // Add a goal to a project
  const addGoalToProject = async (
    projectId: number,
    goal: Goal
  ): Promise<Result<string>> => {
    const project = await repo.getById(projectId);
    if (!project) {
      return ResultHandler.failure("Project not found", "NOT_FOUND");
    }
    if (!validateGoal(goal)) {
      return ResultHandler.failure("Invalid goal data", "BAD_REQUEST");
    }
    return repo.addGoal(projectId, goal);
  };

  // List all goals for a project
  const listGoals = async (projectId: string): Promise<Result<Goal[]>> => {
    const goals = await repo.listGoals(projectId);
    return goals;
  };

  // Factory function returns all methods for project service
  return {
    getProjectById,
    createProject,
    listProjects,
    updateProject,
    addGoalToProject,
    listGoals,
  };
};

// Initialize service with repository and db
export const projectService = createProjectService(createProjectRepository(db));
export type ProjectService = ReturnType<typeof createProjectService>;
