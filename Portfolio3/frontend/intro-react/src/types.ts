// types.ts
export interface Goal {
    id: number;
    description: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    goals: { id: number; description: string }[];
}
