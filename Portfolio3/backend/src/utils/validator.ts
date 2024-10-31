import type { Project, Goal } from "../features/projects/types";

// Validate Project data
export const validateProject = (project: Project): boolean => {
  if (!project.name || typeof project.name !== "string") return false;
  if (!project.description || typeof project.description !== "string") return false;
  if (!project.startDate || !isValidDate(project.startDate)) return false;
  if (!project.endDate || !isValidDate(project.endDate)) return false;
  if (!project.status || typeof project.status !== "string") return false;
  return true;
};

// Validate Goal data
export const validateGoal = (goal: Goal): boolean => {
  if (!goal.description || typeof goal.description !== "string") return false;
  return true;
};

// Helper function to validate dates
const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};