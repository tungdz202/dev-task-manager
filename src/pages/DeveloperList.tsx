import React, { useEffect, useState } from 'react';
import { getDevelopers } from '../services/Api';
import { Developer } from '../interfaces/types';

export const DeveloperList: React.FC = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);

    useEffect(() => {
        getDevelopers().then((data) => setDevelopers(data));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Developer List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {developers.map((dev) => (
                    <div key={dev.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{dev.name}</h3>
                        <p><strong>Skills:</strong> {dev.skills.join(', ')}</p>
                        <p><strong>Tasks:</strong> {dev.tasks}</p>
                        <p><strong>Performance:</strong> {dev.performance}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};