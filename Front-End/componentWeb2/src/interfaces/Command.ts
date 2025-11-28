// Backend command interface
export interface Command {
    // Backend properties
    id: string;
    type: number; // 0 for default, 1 for personalized
    prompt: string;
    code: string;
    lastUsed?: Date;
    enabled?: boolean;
}

// Frontend command interface
export interface FrontendCommand {
    id: string;
    text: string;
    type: number; // 0 for default, 1 for personalized
    code?: string;
    enabled: boolean;
    lastUsed?: Date;
} 
export interface CommandCreationPayload {
    type: number; // 0 for default, 1 for personalized
    prompt: string;
    code: string;
}