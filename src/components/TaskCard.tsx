import React from 'react';
import { TaskDev } from '../interfaces/types';
import { formatDate } from '../utils/formatDate';

interface TaskCardProps {
    task: TaskDev;
    onUpdateStatus: (id: number, status: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateStatus }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text"><strong>Description:</strong> {task.description}</p>
                <p className="card-text"><strong>Assigned To:</strong> {task.assignedTo}</p>
                <p className="card-text"><strong>Skills:</strong> {task.skills.join(', ')}</p>
                <p className="card-text"><strong>Start Date:</strong> {formatDate(task.startDate)}</p>
                <p className="card-text"><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
                <p className="card-text"><strong>Status:</strong> {task.status}</p>
                <p className="card-text"><strong>Progress:</strong> {task.progress}%</p>
                <select
                    className="form-select mt-2"
                    value={task.status}
                    onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </div>
    );
};