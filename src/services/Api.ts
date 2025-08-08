import { Developer, Project, Task } from '../interfaces/types';

const fakeApi: {
    developers: Developer[];
    projects: Project[];
    tasks: Task[];
} = {
    developers: [
        { id: 1, name: "Nguyen Van A", skills: ["FE", "React"], tasks: 5, performance: 85 },
        { id: 2, name: "Tran Thi B", skills: ["BE", "Node"], tasks: 3, performance: 90 },
        { id: 3, name: "Le Van C", skills: ["FE", "Vue"], tasks: 4, performance: 80 }
    ],
    projects: [
        { id: 1, name: "E-commerce Platform", status: "In Progress", tasks: 15 },
        { id: 2, name: "CRM System", status: "Planning", tasks: 8 }
    ],
    tasks: [
        { id: 1, title: "Implement Login", assignedTo: "Nguyen Van A", status: "In Progress", skills: ["FE", "React"], deadline: "2025-08-15" },
        { id: 2, title: "Database Optimization", assignedTo: "Tran Thi B", status: "Todo", skills: ["BE", "SQL"], deadline: "2025-08-20" }
    ]
};

export const getDevelopers = (): Promise<Developer[]> => Promise.resolve(fakeApi.developers);
export const getProjects = (): Promise<Project[]> => Promise.resolve(fakeApi.projects);
export const getTasks = (): Promise<Task[]> => Promise.resolve(fakeApi.tasks);
export const updateTaskStatus = (id: number, status: string): Promise<Task> => {
    const task = fakeApi.tasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        return Promise.resolve(task);
    }
    return Promise.reject(new Error('Task not found'));
};