// frontend/src/components/ProjectList.tsx
import React, { useEffect, useState } from 'react';
import { Project } from '../types';

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/projects')
            .then((response) => response.json())
            .then((result) => {
                console.log("Fetched data:", result.data); // Log to verify structure
                setProjects(result.data); // Access `data` property here
            })
            .catch((error) => console.error('Error fetching projects:', error));
    }, []);

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
