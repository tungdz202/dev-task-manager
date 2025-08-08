import { DeveloperDev, ProjectPrj, TaskDev, TaskPrj, DeveloperSuggestion } from '../interfaces/types';

const fakeApi: {
    developers: DeveloperDev[];
    projects: ProjectPrj[];
    tasks: TaskDev[];
} = {
    developers: [
        {
            id: 1,
            name: "Nguyen Van A",
            email: "a.nguyen@example.com",
            skills: ["FE", "React"],
            performance: 85,
            tasks: [
                {
                    id: 1,
                    title: "Implement Login",
                    description: "Develop login page with React",
                    assignedTo: "Nguyen Van A",
                    assigner: "Le Van C",
                    projects: ["E-commerce Platform"],
                    kind: "Feature",
                    startDate: "2025-08-01",
                    dueDate: "2025-08-15",
                    status: "In Progress",
                    progress: 70,
                    skills: ["FE", "React"],
                    deadline: "2025-08-15"
                }
            ]
        },
        {
            id: 2,
            name: "Tran Thi B",
            email: "b.tran@example.com",
            skills: ["BE", "Node"],
            performance: 90,
            tasks: [
                {
                    id: 2,
                    title: "Database Optimization",
                    description: "Optimize SQL queries for performance",
                    assignedTo: "Tran Thi B",
                    assigner: "Nguyen Van A",
                    projects: ["CRM System"],
                    kind: "Maintenance",
                    startDate: "2025-08-05",
                    dueDate: "2025-08-20",
                    status: "Todo",
                    progress: 20,
                    skills: ["BE", "SQL"],
                    deadline: "2025-08-20"
                }
            ]
        },
        {
            id: 3,
            name: "Le Van C",
            email: "c.le@example.com",
            skills: ["FE", "Vue"],
            performance: 80,
            tasks: []
        }
    ],
    projects: [
        {
            id: 1,
            name: "E-commerce Platform",
            description: "Build an online shopping platform",
            startDate: "2025-07-01",
            dueDate: "2025-12-31",
            status: "In Progress",
            progress: 60,
            tasks: [
                {
                    id: 1,
                    title: "Implement Login",
                    description: "Develop login page with React",
                    assignedTo: "Nguyen Van A",
                    assigner: "Le Van C",
                    projects: ["E-commerce Platform"],
                    kind: "Feature",
                    startDate: "2025-08-01",
                    dueDate: "2025-08-15",
                    status: "In Progress",
                    progress: 70,
                    skills: ["FE", "React"],
                    deadline: "2025-08-15"
                }
            ]
        },
        {
            id: 2,
            name: "CRM System",
            description: "Develop a customer relationship management system",
            startDate: "2025-08-01",
            dueDate: "2026-03-31",
            status: "Planning",
            progress: 10,
            tasks: [
                {
                    id: 2,
                    title: "Database Optimization",
                    description: "Optimize SQL queries for performance",
                    assignedTo: "Tran Thi B",
                    assigner: "Nguyen Van A",
                    projects: ["CRM System"],
                    kind: "Maintenance",
                    startDate: "2025-08-05",
                    dueDate: "2025-08-20",
                    status: "Todo",
                    progress: 20,
                    skills: ["BE", "SQL"],
                    deadline: "2025-08-20"
                }
            ]
        },
        {
            id: 3,
            name: "New Project",
            description: "New project without tasks",
            startDate: "2025-09-01",
            dueDate: "2026-06-30",
            status: "Planning",
            progress: 0,
            tasks: []
        }
    ],
    tasks: [
        {
            id: 1,
            title: "Implement Login",
            description: "Develop login page with React",
            assignedTo: "Nguyen Van A",
            assigner: "Le Van C",
            projects: ["E-commerce Platform"],
            kind: "Feature",
            startDate: "2025-08-01",
            dueDate: "2025-08-15",
            status: "In Progress",
            progress: 70,
            skills: ["FE", "React"],
            deadline: "2025-08-15"
        },
        {
            id: 2,
            title: "Database Optimization",
            description: "Optimize SQL queries for performance",
            assignedTo: "Tran Thi B",
            assigner: "Nguyen Van A",
            projects: ["CRM System"],
            kind: "Maintenance",
            startDate: "2025-08-05",
            dueDate: "2025-08-20",
            status: "Todo",
            progress: 20,
            skills: ["BE", "SQL"],
            deadline: "2025-08-20"
        }
    ]
};

export const getDevelopers = (): Promise<DeveloperDev[]> => Promise.resolve(fakeApi.developers);
export const getProjects = (): Promise<ProjectPrj[]> => Promise.resolve(fakeApi.projects);
export const getTasks = (): Promise<TaskDev[]> => Promise.resolve(fakeApi.tasks);
export const updateTaskStatus = (id: number, status: string): Promise<TaskDev> => {
    const task = fakeApi.tasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        fakeApi.developers.forEach((dev) => {
            dev.tasks = dev.tasks.map((t) => (t.id === id ? { ...t, status } : t));
        });
        fakeApi.projects.forEach((proj) => {
            proj.tasks = proj.tasks.map((t) => (t.id === id ? { ...t, status } : t));
        });
        return Promise.resolve(task);
    }
    return Promise.reject(new Error('Task not found'));
};

export const suggestDevelopersForProject = (projectId: number, progress: number): Promise<DeveloperSuggestion[]> => {
    const suggestions: DeveloperSuggestion[] = fakeApi.developers
        .filter((dev) => {
            if (progress === 0) return true;
            return dev.performance >= 80 && dev.tasks.length < 2;
        })
        .map((dev) => ({
            name: dev.name,
            skills: dev.skills,
            reason: progress === 0
                ? `Phù hợp với dự án mới nhờ kỹ năng ${dev.skills.join(', ')}.`
                : `Hiệu suất cao (${dev.performance}%) và ít task (${dev.tasks.length}).`
        }));
    return Promise.resolve(suggestions);
};

export const suggestDevelopersForTask = (taskId: number): Promise<DeveloperSuggestion[]> => {
    const task = fakeApi.tasks.find((t) => t.id === taskId);
    if (!task) return Promise.reject(new Error('Task not found'));
    const suggestions: DeveloperSuggestion[] = fakeApi.developers
        .filter((dev) => dev.skills.some((skill) => task.skills.includes(skill)))
        .map((dev) => ({
            name: dev.name,
            skills: dev.skills,
            reason: `Kỹ năng ${dev.skills.join(', ')} phù hợp với task ${task.title}.`
        }));
    return Promise.resolve(suggestions);
};

export const assignTaskToDeveloper = (taskId: number, developerName: string): Promise<TaskDev> => {
    const task = fakeApi.tasks.find((t) => t.id === taskId);
    if (!task) return Promise.reject(new Error('Task not found'));
    const developer = fakeApi.developers.find((d) => d.name === developerName);
    if (!developer) return Promise.reject(new Error('Developer not found'));

    task.assignedTo = developerName;
    fakeApi.developers.forEach((dev) => {
        if (dev.name === developerName) {
            if (!dev.tasks.some((t) => t.id === taskId)) {
                dev.tasks.push({ ...task });
            }
        } else {
            dev.tasks = dev.tasks.filter((t) => t.id !== taskId);
        }
    });
    fakeApi.projects.forEach((proj) => {
        proj.tasks = proj.tasks.map((t) => (t.id === taskId ? { ...t, assignedTo: developerName } : t));
    });
    return Promise.resolve(task);
};