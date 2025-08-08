import React, { useEffect, useState } from 'react';
import { getDevelopers } from '../services/Api';
import { DeveloperDev } from '../interfaces/types';

export const Dashboard: React.FC = () => {
    const [developers, setDevelopers] = useState<DeveloperDev[]>([]);

    useEffect(() => {
        getDevelopers().then((data) => setDevelopers(data));
    }, []);

    return (
        <div>
            <h2 className="h2 mb-4">Workload Dashboard</h2>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">Developer</th>
                    <th scope="col">Tasks Assigned</th>
                </tr>
                </thead>
                <tbody>
                {developers.map((dev) => (
                    <tr key={dev.id}>
                        <td>{dev.name}</td>
                        <td>{dev.tasks.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};