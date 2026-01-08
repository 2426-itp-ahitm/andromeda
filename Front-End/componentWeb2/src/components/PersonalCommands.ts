import { html, render } from 'lit-html';
import { CommandService } from '../services/CommandService';
import { Command, FrontendCommand } from '../interfaces/Command';

export class PersonalCommands extends HTMLElement {
    container: HTMLElement | null = null;
    private commandService: CommandService;
    private selectedType: 'personalized' | 'default' = 'personalized';
    private searchQuery: string = '';
    private selectedCommand: FrontendCommand | null = null;

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
                id: cmd.id,
                text: cmd.prompt,
                code: cmd.code,
                enabled: cmd.enabled ?? true,
                type: cmd.type,
                lastUsed: cmd.lastUsed
            })),
            default: allCommands.filter(cmd => cmd.type === 0).map(cmd => ({
                id: cmd.id,
                text: cmd.prompt,
                code: cmd.code,
                enabled: cmd.enabled ?? true,
                type: cmd.type,
                lastUsed: cmd.lastUsed
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

        // Add click listeners for command cards to show popup
        const commandCards = this.querySelectorAll('.command-card');
        commandCards?.forEach((card) => {
            const commandText = card.querySelector('.command-text');
            const toggleButton = card.querySelector('.command-action');
            const cmdid = commandText?.id || '';

            commandText?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showCommandPopup(cmdid);
            });

            toggleButton?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCommand(cmdid);
            });
        });

        // Close popup listeners
        const modal = this.querySelector('.modal-overlay');
        const closeBtn = this.querySelector('.modal-close');
        const copyBtn = this.querySelector('.copy-code-btn');
        const editBtn = this.querySelector('.edit-command-btn');

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePopup();
            }
        });

        closeBtn?.addEventListener('click', () => this.closePopup());
        
        copyBtn?.addEventListener('click', () => this.copyCodeToClipboard());
        
        editBtn?.addEventListener('click', () => this.editCommand());
    }

    private showCommandPopup(cmdid: string): void {
        const currentCommands = this.commands[this.selectedType];
        const command = currentCommands.find(cmd => cmd.id == cmdid);
        
        if (command) {
            this.selectedCommand = command;
            this.render();
            this.setupEventListeners();
        }
    }

    private closePopup(): void {
        this.selectedCommand = null;
        this.render();
        this.setupEventListeners();
    }

    private async copyCodeToClipboard(): Promise<void> {
        if (this.selectedCommand?.code) {
            try {
                await navigator.clipboard.writeText(this.selectedCommand.code);
                const copyBtn = this.querySelector('.copy-code-btn');
                if (copyBtn) {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        }
    }

    private editCommand(): void {
        if (this.selectedCommand && this.selectedCommand.type === 1) {
            // Store the command data to be edited
            const editData = {
                id: this.selectedCommand.id,
                voiceCommand: this.selectedCommand.text,
                code: this.selectedCommand.code || ''
            };
            
            // Store in sessionStorage so CustomCommands can retrieve it
            sessionStorage.setItem('editCommand', JSON.stringify(editData));
            
            // Dispatch navigation event to switch to custom-commands page
            const event = new CustomEvent('pageChange', {
                detail: { page: 'custom-commands' },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(event);
        }
    }

    private toggleCommand(cmdid: string): void {
        const currentCommands = this.commands[this.selectedType];
        const command = currentCommands.find(cmd => cmd.id == cmdid);
        console.log(`Toggling command with id: ${cmdid}`, command);
        if (command) {
            command.enabled = !command.enabled;
            console.log(`Toggled command "${command.text}" to ${command.enabled}`);
            this.render();
            this.setupEventListeners();
        }
    }

    private toggleBulkCommands(enabled: boolean): void {
        const currentCommands = this.commands[this.selectedType];
        currentCommands.forEach(cmd => {
            cmd.enabled = enabled;
        });
        this.render();
        this.setupEventListeners();
    }

    private getFilteredCommands(): FrontendCommand[] {
        return this.commands[this.selectedType].filter(command => 
            command.text.toLowerCase().includes(this.searchQuery)
        );
    }

    private truncate(text: string, max: number = 50): string {
        if (text.length > max) {
            return text.slice(0, max - 3) + '...';
        }
        return text;
    }

    render(): void {
        const filteredCommands = this.getFilteredCommands();
        const enabledCount = filteredCommands.filter(cmd => cmd.enabled).length;
        const totalCount = filteredCommands.length;

        const template = html`
            <div class="personal-commands">
                <div class="commands-header">
                    <h1>Personal Commands</h1>
                    <div class="current-status">
                        <label>Currently Enabled:</label>
                        <div class="status-display">
                            <span class="status-count">${enabledCount} / ${totalCount}</span>
                            <span class="status-label">Commands Active</span>
                        </div>
                    </div>
                    <div class="filters">
                        <div class="search-bar">
                            <input 
                                type="text" 
                                placeholder="Search commands..."
                                .value=${this.searchQuery}
                            >
                        </div>
                        <div class="category-select">
                            <select>
                                <option value="personalized" ?selected=${this.selectedType === 'personalized'}>
                                    ${this.selectedType === 'personalized' ? 'Personalized' : 'Personalized'}
                                </option>
                                <option value="default" ?selected=${this.selectedType === 'default'}>
                                    ${this.selectedType === 'default' ? 'Default' : 'Default'}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bulk-actions">
                    <button class="bulk-enable">Enable All</button>
                    <button class="bulk-disable">Disable All</button>
                </div>

                <div class="command-grid">
                    ${filteredCommands.map(command => html`
                        <div class="command-card">
                            <div class="command-info">
                                <div 
                                    class="command-text"
                                    title=${command.text} 
                                    id=${command.id}
                                    style="cursor: pointer;">
                                    ${this.truncate(command.text)}
                                </div>
                                <div class="command-details">
                                    <div class="command-type">Type: ${command.type === 1 ? 'Personalized' : 'Default'}</div>
                                    <div class="status-indicator">
                                        <div class="status-dot ${command.enabled ? 'enabled' : 'disabled'}"></div>
                                        Status: ${command.enabled ? 'Enabled' : 'Disabled'}
                                    </div>
                                </div>
                            </div>
                            <div class="command-actions">
                                <button 
                                    class="command-action ${command.enabled ? 'on' : 'off'}"
                                    type="button">
                                    ${command.enabled ? 'Disable' : 'Enable'}
                                </button>
                            </div>
                        </div>
                    `)}
                </div>

                ${this.selectedCommand ? html`
                    <div class="modal-overlay">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2>Command Details</h2>
                                <button class="modal-close">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="command-prompt">
                                    <h3>Prompt:</h3>
                                    <p>${this.selectedCommand.text}</p>
                                </div>
                                <div class="command-code">
                                    <div class="code-header">
                                        <h3>Code:</h3>
                                        <button class="copy-code-btn">Copy Code</button>
                                    </div>
                                    <pre><code>${this.selectedCommand.code || 'No code available'}</code></pre>
                                </div>
                                ${this.selectedCommand.type === 1 ? html`
                                    <div class="modal-actions">
                                        <button class="edit-command-btn">Edit Command</button>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>

        `;

        render(template, this);
    }
}

customElements.define('app-personal-commands', PersonalCommands);