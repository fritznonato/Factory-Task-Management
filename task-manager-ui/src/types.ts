export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    assignedUserId: number;
};

// Add the User type
export type User = {
    id: number;
    name: string;
    role: string;
};