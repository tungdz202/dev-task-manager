export interface DeveloperDev {
    id: number;
    name: string;
    email: string;
    skills: string[];
    performance: number;
    tasks: TaskDev[];
}

export interface ProjectPrj {
    id: number;
    name: string;
    description: string;
    startDate: string;
    dueDate: string;
    status: string;
    progress: number;
    tasks: TaskPrj[];
}

export interface TaskDev {
    id: number;
    title: string;
    description: string;
    assignedTo: string;
    assigner: string;
    projects: string[];
    kind: string;
    startDate: string;
    dueDate: string;
    status: string;
    progress: number;
    skills: string[];
    deadline: string;
}

export interface TaskPrj {
    id: number;
    title: string;
    description: string;
    assignedTo: string;
    assigner: string;
    projects: string[];
    kind: string;
    startDate: string;
    dueDate: string;
    status: string;
    progress: number;
    skills: string[];
    deadline: string;
}

export interface DeveloperSuggestion {
    name: string;
    skills: string[];
    reason: string;
}