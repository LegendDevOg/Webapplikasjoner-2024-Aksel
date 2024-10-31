import { useState } from 'react';
import { Project } from '../types';
import  ProjectForm  from '../components/ProjectForm'
import  ProjectList  from '../components/ProjectList'

const ProjectPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const handleAddProject = (newProject: Omit<Project, 'id'>) => {
        const projectWithId = { ...newProject, id: Date.now() };
        setProjects([...projects, projectWithId]);
    };

    return (
        <div className="App">
            <header>
                <h1>Prosjektoversikt</h1>
            </header>
            <div className="container">
                <div id="project-list">
                    <ProjectList />
                </div>
                <div id="new-project-form">
                <ProjectForm onSubmit={handleAddProject} />
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
