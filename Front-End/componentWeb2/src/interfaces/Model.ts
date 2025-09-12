export interface Model {
    id: number
    name: string;
    size: string;
    status: 'active' | 'inactive' | 'downloading';
    language: string;
    percision: number;
    link: string
} 