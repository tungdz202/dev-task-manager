export interface Developer {
    id: number;
    name: string;
    skills: string[];
    tasks: number;
    performance: number;
}

export interface Project {
    id: number;
    name: string;
    status: string;
    tasks: number;
}

export interface Task {
    id: number;
    title: string;
    assignedTo: string;
    status: string;
    skills: string[];
    deadline: string;
}