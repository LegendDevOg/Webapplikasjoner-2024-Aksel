
import { API_BASE_URL } from '../../../../backend/src/config/index';

import { Project } from '../types'; 

export const getProjects = async (): Promise<{ data: Project[] }> => {
    const response = await fetch('http://localhost:3000/projects');
    const data = await response.json();
    return { data }; 
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<{ data: Project }> => {
    const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });
    const data = await response.json();
    return { data }; 
};

export async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}