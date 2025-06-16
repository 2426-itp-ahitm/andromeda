import { html, render } from 'lit-html';
import { CommandService } from '../services/CommandService';
import { Command, FrontendCommand } from '../interfaces/Command';

export class PersonalCommands extends HTMLElement {
    container: HTMLElement | null = null;
    private commandService: CommandService;
    private selectedType: 'personalized' | 'default' = 'personalized';
    private searchQuery: string = '';

    private commands: { personalized: FrontendCommand[], default: FrontendCommand[] } = {
        personalized: [],
        default: []
    };

    constructor() {
        super();
        this.commandService = CommandService.getInstance();
    }

    connectedCallback(): void {
        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.loadCommands();
        this.render();
        this.setupEventListeners();
    }

    private async loadCommands(): Promise<void> {
        const allCommands = await this.commandService.getCommands();
        console.log('Loaded commands:', allCommands);
        this.commands = {
            personalized: allCommands.filter(cmd => cmd.type === 1).map(cmd => ({
                text: cmd.prompt,
                enabled: true,
                type: cmd.type
            })),
            default: allCommands.filter(cmd => cmd.type === 0).map(cmd => ({
                text: cmd.prompt,
                enabled: true,
                type: cmd.type
            }))
        };
    }

    private setupEventListeners(): void {
        const dropdown = this.querySelector('.category-select select');
        dropdown?.addEventListener('change', (e) => {
            this.selectedType = (e.target as HTMLSelectElement).value as 'personalized' | 'default';
            this.render();
            this.setupEventListeners();
        });

        const searchInput = this.querySelector('.search-bar input') as HTMLInputElement;
        searchInput?.addEventListener('input', (e) => {
            this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
            this.render();
            this.setupEventListeners();
        });

        const bulkEnableBtn = this.querySelector('.bulk-enable');
        const bulkDisableBtn = this.querySelector('.bulk-disable');

        bulkEnableBtn?.addEventListener('click', () => this.toggleBulkCommands(true));
        bulkDisableBtn?.addEventListener('click', () => this.toggleBulkCommands(false));

        const commandItems = this.querySelectorAll('.command-item');
        commandItems?.forEach((item) => {
            const toggleButton = item.querySelector('.toggle-button');
            const commandText = item.querySelector('p')?.textContent || '';

            toggleButton?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCommand(commandText);
            });
        });
    }

    private toggleCommand(commandText: string): void {
        const currentCommands = this.commands[this.selectedType];
        const command = currentCommands.find(cmd => cmd.text === commandText);
        if (command) {
            command.enabled = !command.enabled;
            this.render();
        }
    }

    private toggleBulkCommands(enabled: boolean): void {
        const currentCommands = this.commands[this.selectedType];
        currentCommands.forEach(cmd => {
            cmd.enabled = enabled;
        });
        this.render();
    }

    private getFilteredCommands(): FrontendCommand[] {
        return this.commands[this.selectedType].filter(command => 
            command.text.toLowerCase().includes(this.searchQuery)
        );
    }

    render(): void {
        const filteredCommands = this.getFilteredCommands();

        const template = html`
            <div class="personal-commands">
                <div class="commands-header">
                    <h2>Personal Commands</h2>
                    <div class="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search commands..."
                            .value=${this.searchQuery}
                        >
                        <button>
                            <span>🔍</span>
                            Search
                        </button>
                    </div>
                </div>

                <div class="category-select">
                    <select>
                        <option value="personalized" ?selected=${this.selectedType === 'personalized'}>Personalized Commands</option>
                        <option value="default" ?selected=${this.selectedType === 'default'}>Default Commands</option>
                    </select>
                </div>

                <div class="bulk-actions">
                    <button class="bulk-enable">Enable All</button>
                    <button class="bulk-disable">Disable All</button>
                </div>

                <div class="command-list">
                    ${filteredCommands.map(command => html`
                        <div class="command-item">
                            <p>${command.text}</p>
                            <button class="toggle-button ${command.enabled ? 'enabled' : 'disabled'}"
                                type="button">${command.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>
                    `)}
                </div>
            </div>
        `;

        render(template, this);
    }
}

customElements.define('app-personal-commands', PersonalCommands);
