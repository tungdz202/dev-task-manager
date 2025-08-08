import React, { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus } from '../services/Api';
import { TaskCard } from '../components/TaskCard';
import { Task } from '../interfaces/types';

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        getTasks().then((data) => setTasks(data));
    }, []);

    const handleUpdateStatus = (id: number, status: string) => {
        updateTaskStatus(id, status).then((updatedTask) => {
            setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
        });
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
            <input
                type="text"
                placeholder="Search tasks..."
                className="w-full p-2 mb-4 border rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
                ))}
            </div>
        </div>
    );
};