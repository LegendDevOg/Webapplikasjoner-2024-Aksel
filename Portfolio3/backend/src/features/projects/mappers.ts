import type { DbProject, Project, DbGoal, Goal } from "./types";

// Convert database project to app project
export const fromDbProject = (data: DbProject): Project => {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      goals: data.goals ? data.goals.map(fromDbGoal) : [], // Map goals if included
    };
  };

// Convert app project to database project
export const toDbProject = (data: Project): DbProject => {
  return {
    ...data,
    startDate: data.startDate,
    endDate: data.endDate,
    goals: data.goals ? data.goals.map(toDbGoal) : undefined, // Map goals if included
  };
};

// Convert database goal to app goal
export const fromDbGoal = (data: DbGoal): Goal => ({
  id: data.id,
  projectId: data.projectId,
  description: data.description,
});

// Convert app goal to database goal
export const toDbGoal = (data: Goal): DbGoal => ({
  ...data,
});
