import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/Api';
import { Project } from '../interfaces/types';

export const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects().then((data) => setProjects(data));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Project List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p><strong>Status:</strong> {project.status}</p>
                        <p><strong>Tasks:</strong> {project.tasks}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};