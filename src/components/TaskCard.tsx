import React from 'react';
import { Task } from '../interfaces/types';
import { formatDate } from '../utils/formatDate';

interface TaskCardProps {
    task: Task;
    onUpdateStatus: (id: number, status: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateStatus }) => {
    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p><strong>Skills:</strong> {task.skills.join(', ')}</p>
            <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <select
                className="mt-2 p-2 border rounded"
                value={task.status}
                onChange={(e) => onUpdateStatus(task.id, e.target.value)}
            >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
};