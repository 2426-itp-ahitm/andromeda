import { html, render } from 'lit-html';
import { Component } from '../types';

interface Command {
    text: string;
    category: string;
    enabled: boolean;
}

export class PersonalCommands implements Component {
    container: HTMLElement | null = null;
    private selectedType: string = 'personalized';
    private searchQuery: string = '';
    private selectedCommands: Set<string> = new Set();

    private commands = {
        personalized: [
            { text: 'Delete folder "Downloads"', category: 'file', enabled: true },
            { text: 'Create new folder "Projects"', category: 'file', enabled: true },
            { text: 'Start application "Visual Studio Code"', category: 'app', enabled: true },
            { text: 'Set system volume to 50%', category: 'system', enabled: true },
            { text: 'Open website "github.com"', category: 'web', enabled: true },
            { text: 'Take screenshot of current window', category: 'system', enabled: true }
        ],
        default: [
            { text: 'Open file explorer', category: 'file', enabled: true },
            { text: 'Close all windows', category: 'app', enabled: true },
            { text: 'Mute system volume', category: 'system', enabled: true },
            { text: 'Open browser', category: 'web', enabled: true },
            { text: 'Show desktop', category: 'system', enabled: true }
        ]
    };

    connectedCallback(): void {
        this.container = document.createElement('div');
        this.render();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Dropdown listener
        const dropdown = this.container?.querySelector('.category-select select');
        dropdown?.addEventListener('change', (e) => {
            this.selectedType = (e.target as HTMLSelectElement).value;
            this.selectedCommands.clear();
            this.render();
            this.setupEventListeners();
        });

        // Search listener
        const searchInput = this.container?.querySelector('.search-bar input') as HTMLInputElement;
        searchInput?.addEventListener('input', (e) => {
            this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
            this.render();
            this.setupEventListeners();
        });

        // Bulk action listeners
        const bulkEnableBtn = this.container?.querySelector('.bulk-enable');
        const bulkDisableBtn = this.container?.querySelector('.bulk-disable');

        bulkEnableBtn?.addEventListener('click', () => {
            this.toggleBulkCommands(true);
        });

        bulkDisableBtn?.addEventListener('click', () => {
            this.toggleBulkCommands(false);
        });

        // Command item listeners
        const commandItems = this.container?.querySelectorAll('.command-item');
        commandItems?.forEach((item) => {
            const checkbox = item.querySelector('.command-checkbox') as HTMLInputElement;
            const toggleButton = item.querySelector('.toggle-button');
            const commandText = item.querySelector('p')?.textContent || '';

            checkbox?.addEventListener('change', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (checkbox.checked) {
                    this.selectedCommands.add(commandText);
                } else {
                    this.selectedCommands.delete(commandText);
                }
                this.render();
            });

            toggleButton?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCommand(commandText);
            });
        });
    }

    private toggleCommand(commandText: string): void {
        const currentCommands = this.commands[this.selectedType as keyof typeof this.commands];
        const command = currentCommands.find(cmd => cmd.text === commandText);
        if (command) {
            command.enabled = !command.enabled;
            this.render();
        }
    }

    private toggleBulkCommands(enabled: boolean): void {
        const currentCommands = this.commands[this.selectedType as keyof typeof this.commands];
        currentCommands.forEach(cmd => {
            if (this.selectedCommands.has(cmd.text)) {
                cmd.enabled = enabled;
            }
        });
        this.render();
    }

    private getFilteredCommands(): Command[] {
        const currentCommands = this.commands[this.selectedType as keyof typeof this.commands];
        return currentCommands.filter(command => 
            command.text.toLowerCase().includes(this.searchQuery)
        );
    }

    render(): void {
        if (!this.container) return;

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
                    <button class="bulk-enable">Enable Selected</button>
                    <button class="bulk-disable">Disable Selected</button>
                </div>

                <div class="command-list">
                    ${filteredCommands.map(command => html`
                        <div class="command-item">
                            <input 
                                type="checkbox" 
                                class="command-checkbox"
                                ?checked=${this.selectedCommands.has(command.text)}
                            >
                            <p>${command.text}</p>
                            <button 
                                class="toggle-button ${command.enabled ? 'enabled' : 'disabled'}"
                                type="button"
                            >
                                ${command.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>
                    `)}
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 