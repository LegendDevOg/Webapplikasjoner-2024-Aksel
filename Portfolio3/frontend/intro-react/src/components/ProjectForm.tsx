import React, { useState, FormEvent } from 'react';
import { Project } from '../types';

interface ProjectFormProps {
    onSubmit: (project: Omit<Project, 'id'>) => void;
    initialData?: Omit<Project, 'id'>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [startDate, setStartDate] = useState(initialData?.startDate || '');
    const [endDate, setEndDate] = useState(initialData?.endDate || '');
    const [status, setStatus] = useState(initialData?.status || '');

    const [goals, setGoals] = useState<{ id: number; description: string }[]>(initialData?.goals || []);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, startDate, endDate, status, goals }),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            onSubmit({
                name,
                description,
                startDate,
                endDate,
                status,
                goals,
            });

            setName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setStatus('');
            setGoals([]);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            <button type="submit">Add Project</button>
        </form>
    );
};

export default ProjectForm;
