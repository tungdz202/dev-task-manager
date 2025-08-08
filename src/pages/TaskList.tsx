import React, { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus, suggestDevelopersForTask, assignTaskToDeveloper } from '../services/Api';
import { TaskDev, DeveloperSuggestion } from '../interfaces/types';
import { formatDate } from '../utils/formatDate';

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskDev[]>([]);
    const [search, setSearch] = useState<string>('');
    const [suggestions, setSuggestions] = useState<DeveloperSuggestion[]>([]);
    const [modalTitle, setModalTitle] = useState<string>('');

    useEffect(() => {
        getTasks().then((data) => setTasks(data));
    }, []);

    const handleUpdateStatus = (id: number, status: string) => {
        updateTaskStatus(id, status).then((updatedTask) => {
            setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
        });
    };

    const handleSuggestDevelopers = (taskId: number, taskTitle: string) => {
        suggestDevelopersForTask(taskId)
            .then((data) => {
                setSuggestions(data);
                setModalTitle(`Gợi ý phân công cho task ${taskTitle}`);
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

    const handleAssignDeveloper = (taskId: number, developerName: string) => {
        assignTaskToDeveloper(taskId, developerName)
            .then((updatedTask) => {
                setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
                const modalElement = document.getElementById('suggestionModal');
                if (modalElement) {
                    const modal = new window.bootstrap.Modal(modalElement);
                    modal.hide();
                }
            })
            .catch((error) => {
                console.error('Error assigning developer:', error);
            });
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2 className="h2 mb-4">Task List</h2>
            <input
                type="text"
                placeholder="Search tasks..."
                className="form-control mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Kind</th>
                    <th scope="col">Assigner</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Projects</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredTasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.kind}</td>
                        <td>{task.assigner}</td>
                        <td>{task.assignedTo || 'Unassigned'}</td>
                        <td>{task.projects.join(', ')}</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{formatDate(task.dueDate)}</td>
                        <td>
                            <select
                                className="form-select form-select-sm"
                                value={task.status}
                                onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                            >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </td>
                        <td>
                            <button
                                className="btn btn-sm btn-info"
                                onClick={() => handleSuggestDevelopers(task.id, task.title)}
                            >
                                Gợi ý Dev
                            </button>
                        </td>
                    </tr>
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
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{suggestion.name}</strong> - Skills: {suggestion.skills.join(', ')}<br />
                                                Reason: {suggestion.reason}
                                            </div>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleAssignDeveloper(tasks.find((t) => t.title === modalTitle.split('task ')[1])?.id || 0, suggestion.name)}
                                            >
                                                Phân công
                                            </button>
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