import { html, render } from 'lit-html';
import { Component } from '../types';

export class PersonalCommands implements Component {
    container: HTMLElement | null = null;
    private selectedType: string = 'personalized';
    private searchQuery: string = '';

    private commands = {
        personalized: [
            { text: 'Delete folder "Downloads"', category: 'file' },
            { text: 'Create new folder "Projects"', category: 'file' },
            { text: 'Start application "Visual Studio Code"', category: 'app' },
            { text: 'Set system volume to 50%', category: 'system' },
            { text: 'Open website "github.com"', category: 'web' },
            { text: 'Take screenshot of current window', category: 'system' }
        ],
        default: [
            { text: 'Open file explorer', category: 'file' },
            { text: 'Close all windows', category: 'app' },
            { text: 'Mute system volume', category: 'system' },
            { text: 'Open browser', category: 'web' },
            { text: 'Show desktop', category: 'system' }
        ]
    };

    connectedCallback(): void {
        this.container = document.createElement('div');
        this.render();
        this.setupDropdownListener();
        this.setupSearchListener();
    }

    private setupDropdownListener(): void {
        const dropdown = this.container?.querySelector('.category-select select');
        if (dropdown) {
            dropdown.addEventListener('change', (e) => {
                this.selectedType = (e.target as HTMLSelectElement).value;
                this.render();
            });
        }
    }

    private setupSearchListener(): void {
        const searchInput = this.container?.querySelector('.search-bar input') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
                this.render();
            });
        }
    }

    private getFilteredCommands(): Array<{ text: string; category: string }> {
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

                <div class="command-list">
                    ${filteredCommands.map(command => html`
                        <p>${command.text}</p>
                    `)}
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 