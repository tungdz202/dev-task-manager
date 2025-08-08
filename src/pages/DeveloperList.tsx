import React, { useEffect, useState } from 'react';
import { getDevelopers } from '../services/Api';
import { DeveloperDev, TaskDev } from '../interfaces/types';
import { formatDate } from '../utils/formatDate';

export const DeveloperList: React.FC = () => {
    const [developers, setDevelopers] = useState<DeveloperDev[]>([]);
    const [expandedDev, setExpandedDev] = useState<number | null>(null);

    useEffect(() => {
        getDevelopers().then((data) => setDevelopers(data));
    }, []);

    const toggleTasks = (devId: number) => {
        setExpandedDev(expandedDev === devId ? null : devId);
    };

    return (
        <div>
            <h2 className="h2 mb-4">Developer List</h2>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Skills</th>
                    <th scope="col">Performance</th>
                    <th scope="col">Tasks</th>
                </tr>
                </thead>
                <tbody>
                {developers.map((dev) => (
                    <React.Fragment key={dev.id}>
                        <tr>
                            <td>{dev.id}</td>
                            <td>{dev.name}</td>
                            <td>{dev.email}</td>
                            <td>{dev.skills.join(', ')}</td>
                            <td>{dev.performance}%</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => toggleTasks(dev.id)}
                                >
                                    {expandedDev === dev.id ? '−' : '+'}
                                </button>
                            </td>
                        </tr>
                        {expandedDev === dev.id && dev.tasks.length > 0 && (
                            <tr>
                                <td colSpan={6}>
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <th scope="col">Task ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Progress</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dev.tasks.map((task: TaskDev) => (
                                            <tr key={task.id}>
                                                <td>{task.id}</td>
                                                <td>{task.title}</td>
                                                <td>{formatDate(task.startDate)}</td>
                                                <td>{formatDate(task.dueDate)}</td>
                                                <td>{task.status}</td>
                                                <td>{task.progress}%</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                        {expandedDev === dev.id && dev.tasks.length === 0 && (
                            <tr>
                                <td colSpan={6}>No tasks assigned</td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};