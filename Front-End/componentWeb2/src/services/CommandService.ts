import { Command } from '../interfaces/Command';

/**
 * Service for managing personal commands
 * API Endpoints:
 * GET    /api/commands              - Get all commands
 */
export class CommandService {
    private static instance: CommandService;
    private commands: Command[] = [
        {
            id: '1',
            prompt: 'Delete folder "Downloads"',
            type: 'personalized',
            code: 'rm -rf ~/Downloads',
            lastUsed: new Date()
        },
        {
            id: '2',
            prompt: 'Create new folder "Projects"',
            type: 'personalized',
            code: 'mkdir ~/Projects',
            lastUsed: new Date()
        },
        {
            id: '3',
            prompt: 'Start application "Visual Studio Code"',
            type: 'personalized',
            code: 'code .',
            lastUsed: new Date()

        },
        {
            id: '4',
            prompt: 'Set system volume to 50%',
            type: 'personalized',
            code: 'amixer -D pulse sset Master 50%',
            lastUsed: new Date()

        },
        {
            id: '5',
            prompt: 'Open website "github.com"',
            type: 'personalized',
            code: 'xdg-open https://github.com',
            lastUsed: new Date()

        },
        {
            id: '6',
            prompt: 'Take screenshot of current window',
            type: 'personalized',
            code: 'import -window root screenshot.png',
            lastUsed: new Date()

        },
        {
            id: '7',
            prompt: 'Open file explorer',
            type: 'default',
            code: 'xdg-open .',
            lastUsed: new Date()
        },{
            id: '8',
            prompt: 'Close all windows',
            type: 'default',
            code: 'wmctrl -c :ACTIVE:',
            lastUsed: new Date()
        },
        {
            id: '9',
            prompt: 'Mute system volume',
            type: 'default',
            code: 'amixer -D pulse sset Master mute',
            lastUsed: new Date()
        },
        {
            id: '10',
            prompt: 'Open browser',
            type: 'default',
            code: 'xdg-open https://www.google.com',
            lastUsed: new Date()
        },
        {
            id: '11',
            prompt: 'Show desktop',
            type: 'default',
            code: 'wmctrl -k on',
            lastUsed: new Date()
        }
    ];
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
            return data as Command[];
        } catch (error) {
            console.error('Network error:', error);
            throw new Error('Network error: Could not fetch commands. Is the backend running and the URL correct?');
        }
    }
} 