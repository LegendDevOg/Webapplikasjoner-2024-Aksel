export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    goals?: Goal[];
  }
  
  export type Result<T> = {
    success: boolean;
    data?: T;
    error?: string;
    code?: string;
  };

  export interface DbProject {
    id: number;
    name: string;
    description: string;
    startDate: string;  // stored as string in DB
    endDate: string;    // stored as string in DB
    status: string;
    goals?: Goal[];
  }
  
  export interface Goal {
    id: string;
    projectId: string;
    description: string;
  }
  
  export interface DbGoal {
    id: string;
    projectId: string;
    description: string;
  }