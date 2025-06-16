import { Command } from '../interfaces/Command';

/**
 * Service for managing personal commands
 * API Endpoints:
 * GET    /api/commands              - Get all commands
 */
export class CommandService {
    private static instance: CommandService;
    private basicURL : string = 'http://localhost:9001/api/api';
    private constructor() {}

    public static getInstance(): CommandService {
        if (!CommandService.instance) {
            CommandService.instance = new CommandService();
        }
        return CommandService.instance;
    }

    // GET /api/commands
    public async getCommands(): Promise<Command[]> {
        try {
            const response = await fetch(this.basicURL + '/andromeda/command/getDefaultCommands');
            if (!response.ok) {
                throw new Error('Failed to fetch commands');
            }
            const data = await response.json();

            const response2 = await fetch(this.basicURL + '/andromeda/command/getCommandsByUser/1');
            if (!response2.ok) {
                throw new Error('Failed to fetch commands');
            }
            const data2 = await response2.json();

            const combinedData = [...data, ...data2];
            console.log('Combined commands:', combinedData);
            return combinedData as Command[];
        } catch (error) {
            console.error('Network error:', error);
            throw new Error('Network error: Could not fetch commands. Is the backend running and the URL correct?');
        }
    }
} 