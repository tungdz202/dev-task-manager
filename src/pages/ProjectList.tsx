import React, { useEffect, useState } from 'react';
import { getProjects, suggestDevelopersForProject } from '../services/Api';
import { ProjectPrj, TaskPrj, DeveloperSuggestion } from '../interfaces/types';
import { formatDate } from '../utils/formatDate';

export const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<ProjectPrj[]>([]);
    const [expandedProj, setExpandedProj] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<DeveloperSuggestion[]>([]);
    const [modalTitle, setModalTitle] = useState<string>('');

    useEffect(() => {
        getProjects().then((data) => setProjects(data));
    }, []);

    const toggleTasks = (projId: number) => {
        setExpandedProj(expandedProj === projId ? null : projId);
    };

    const handleSuggestDevelopers = (projectId: number, progress: number, isNew: boolean) => {
        suggestDevelopersForProject(projectId, progress)
            .then((data) => {
                setSuggestions(data);
                setModalTitle(isNew ? `Gợi ý phân công cho dự án ${projectId}` : `Rà soát phân công cho dự án ${projectId}`);
                const modalElement = document.getElementById('suggestionModal');
                if (modalElement) {
                    const modal = new window.bootstrap.Modal(modalElement);
                    modal.show();
                } else {
                    console.error('Modal element not found');
                }
            })
            .catch((error) => {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
                setModalTitle('Lỗi khi lấy gợi ý');
                const modalElement = document.getElementById('suggestionModal');
                if (modalElement) {
                    const modal = new window.bootstrap.Modal(modalElement);
                    modal.show();
                }
            });
    };

    return (
        <div>
            <h2 className="h2 mb-4">Project List</h2>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Progress</th>
                    <th scope="col">Tasks</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((proj) => (
                    <React.Fragment key={proj.id}>
                        <tr>
                            <td>{proj.id}</td>
                            <td>{proj.name}</td>
                            <td>{proj.description}</td>
                            <td>{formatDate(proj.startDate)}</td>
                            <td>{formatDate(proj.dueDate)}</td>
                            <td>{proj.status}</td>
                            <td>{proj.progress}%</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => toggleTasks(proj.id)}
                                >
                                    {expandedProj === proj.id ? '−' : '+'}
                                </button>
                                {proj.tasks.length > 0 ? (
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => handleSuggestDevelopers(proj.id, proj.progress, false)}
                                    >
                                        Rà soát phân công
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleSuggestDevelopers(proj.id, proj.progress, true)}
                                    >
                                        Gợi ý phân công
                                    </button>
                                )}
                            </td>
                        </tr>
                        {expandedProj === proj.id && proj.tasks.length > 0 && (
                            <tr>
                                <td colSpan={8}>
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <th scope="col">Task ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Progress</th>
                                            <th scope="col">Assigned To</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {proj.tasks.map((task: TaskPrj) => (
                                            <tr key={task.id}>
                                                <td>{task.id}</td>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>{formatDate(task.startDate)}</td>
                                                <td>{formatDate(task.dueDate)}</td>
                                                <td>{task.status}</td>
                                                <td>{task.progress}%</td>
                                                <td>{task.assignedTo || 'Unassigned'}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                        {expandedProj === proj.id && proj.tasks.length === 0 && (
                            <tr>
                                <td colSpan={8}>No tasks assigned</td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>

            <div className="modal fade" id="suggestionModal" tabIndex={-1} aria-labelledby="suggestionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="suggestionModalLabel">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {suggestions.length > 0 ? (
                                <ul className="list-group">
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} className="list-group-item">
                                            <strong>{suggestion.name}</strong> - Skills: {suggestion.skills.join(', ')}<br />
                                            Reason: {suggestion.reason}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No suggestions available.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};