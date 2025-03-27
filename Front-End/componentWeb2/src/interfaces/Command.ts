// Backend command interface
export interface Command {
    // Backend properties
    id: string;
    name: string;
    code: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    lastUsed?: Date;
}

// Frontend command interface
export interface FrontendCommand {
    text: string;
    category: string;
    enabled: boolean;
} 