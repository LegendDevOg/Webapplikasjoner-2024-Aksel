import React, { useState } from 'react';
import { Project, Goal } from '../types';

interface ProjectFormProps {
    onAddProject: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goals, setGoals] = useState<Goal[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProject: Project = {
            id: Date.now(), name, description, startDate, endDate, status: 'active', goals,
            goal: Goal[]
        };
        onAddProject(newProject);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            {/* Goal input and addition */}
            <button type="submit">Add Project</button>
        </form>
    );
};

export default ProjectForm;