export interface Model {
    name: string;
    size: string;
    status: 'active' | 'inactive' | 'downloading';
    language: string;
} 