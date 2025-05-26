// Backend command interface
export interface Command {
    // Backend properties
    id: string;
    type: string;
    prompt: string;
    code: string;
    lastUsed?: Date;
}

// Frontend command interface
export interface FrontendCommand {
    text: string;
    type: string;
    enabled: boolean;
} 