import { useState, useEffect } from 'react';
import { Project } from '../types';
import { getProjects } from '../service/api';
import { createProject } from '../service/api';

const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProjects();
                setProjects(response.data);
            } catch (err) {
                setError('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProjects();
    }, []);

    const addProject = async (newProject: Omit<Project, 'id'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createProject(newProject);
            setProjects((prevProjects) => [...prevProjects, response.data]);
        } catch (err) {
            setError('Failed to add project');
        } finally {
            setLoading(false);
        }
    };

    return {
        projects,
        loading,
        error,
        addProject,
    };
};

export default useProjects;
