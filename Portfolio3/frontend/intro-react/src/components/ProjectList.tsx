import React, { useEffect, useState } from 'react';


interface Goal {
    id: number;
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
    goal: Goal;

}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/projects');
                
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
                
                const result = await response.json();

                if (Array.isArray(result.data)) {
                    setProjects(result.data);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error) {
                setError('Failed to fetch projects');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);


    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h2>Alle Prosjekter</h2>
            {projects.length > 0 ? (

            projects.map((project) => (
            <div key={project.id} className="project-item">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p><strong>Startdato:</strong> {project.startDate}</p>
                <p><strong>Sluttdato:</strong> {project.endDate}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <h4>Mål:</h4>
        <ul className="project-goals">
            {project.goals.map(goal => (
                <li key={goal.id}>{goal.description}</li>
            ))}
        </ul>
    </div>
    ))
    ) : (
    <p>No projects available</p>
    )}
    
    </div>
    );
};

export default ProjectList;
