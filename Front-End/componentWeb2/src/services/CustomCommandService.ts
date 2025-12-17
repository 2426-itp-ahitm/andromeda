import { Command, CommandCreationPayload } from '../interfaces/Command';

export class CustomCommandService {
    private baseUrl = 'http://localhost:9001/api/api/andromeda/command';
    private personalCommandType = 1; // Personal commands have type 1

    async saveCustomCommand(voiceCommand: string, pythonCode: string): Promise<Command> {
        if (!voiceCommand.trim()) {
            throw new Error('Voice command cannot be empty');
        }
        
        if (!pythonCode.trim()) {
            throw new Error('Python code cannot be empty');
        }

        const payload: CommandCreationPayload = {

            type: this.personalCommandType, // Set to 1 for personal commands
            prompt: voiceCommand,
            code: pythonCode,
            userId: 1 // Assuming user ID is 1 for this example
        };

        try {
            const response = await fetch(`${this.baseUrl}/addCommand`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to save command: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving custom command:', error);
            throw error;
        }
    }

    async getPersonalCommands(): Promise<Command[]> {
        try {
            const response = await fetch(`${this.baseUrl}?type=${this.personalCommandType}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch personal commands: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching personal commands:', error);
            throw error;
        }
    }

    async updateCustomCommand(id: string, voiceCommand: string, pythonCode: string): Promise<Command> {
        if (!voiceCommand.trim()) {
            throw new Error('Voice command cannot be empty');
        }
        
        if (!pythonCode.trim()) {
            throw new Error('Python code cannot be empty');
        }

        const payload: CommandCreationPayload = {
            type: this.personalCommandType,
            prompt: voiceCommand,
            code: pythonCode
            , userId: 1 // Assuming user ID is 1 for this example
        };

        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to update command: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating custom command:', error);
            throw error;
        }
    }


    async deleteCustomCommand(id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete command: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting custom command:', error);
            throw error;
        }
    }


    async toggleCommandStatus(id: string, enabled: boolean): Promise<Command> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ enabled })
            });

            if (!response.ok) {
                throw new Error(`Failed to toggle command status: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error toggling command status:', error);
            throw error;
        }
    }
    
    private generateId(): string {
        return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

export const customCommandService = new CustomCommandService();
