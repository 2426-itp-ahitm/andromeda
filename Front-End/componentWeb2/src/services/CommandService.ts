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
            name: 'Delete folder "Downloads"',
            category: 'personalized',
            code: 'rm -rf ~/Downloads',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            name: 'Create new folder "Projects"',
            category: 'personalized',
            code: 'mkdir ~/Projects',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '3',
            name: 'Start application "Visual Studio Code"',
            category: 'personalized',
            code: 'code .',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '4',
            name: 'Set system volume to 50%',
            category: 'personalized',
            code: 'amixer -D pulse sset Master 50%',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '5',
            name: 'Open website "github.com"',
            category: 'personalized',
            code: 'xdg-open https://github.com',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '6',
            name: 'Take screenshot of current window',
            category: 'personalized',
            code: 'import -window root screenshot.png',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '7',
            name: 'Open file explorer',
            category: 'default',
            code: 'xdg-open .',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '8',
            name: 'Close all windows',
            category: 'default',
            code: 'wmctrl -c :ACTIVE:',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '9',
            name: 'Mute system volume',
            category: 'default',
            code: 'amixer -D pulse sset Master mute',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '10',
            name: 'Open browser',
            category: 'default',
            code: 'xdg-open https://www.google.com',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '11',
            name: 'Show desktop',
            category: 'default',
            code: 'wmctrl -k on',
            lastUsed: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    private constructor() {}

    public static getInstance(): CommandService {
        if (!CommandService.instance) {
            CommandService.instance = new CommandService();
        }
        return CommandService.instance;
    }

    // GET /api/commands
    public async getCommands(): Promise<Command[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.commands);
            }, 500);
        });
    }
} 