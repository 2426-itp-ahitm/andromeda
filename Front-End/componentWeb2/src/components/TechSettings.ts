import { html, render } from 'lit-html';
import { Component } from '../types';

interface Model {
    name: string;
    size: string;
    status: 'active' | 'inactive';
    language: string;
}

export class TechSettings implements Component {
    container: HTMLElement | null = null;
    private selectedModel: string = 'Vosk1';
    private searchQuery: string = '';
    private selectedLanguage: string = 'all';
    private models: Model[] = [
        { name: 'Vosk1', size: '1.5TB', status: 'active', language: 'English' },
        { name: 'Vosk2', size: '800GB', status: 'inactive', language: 'German' },
        { name: 'Vosk3', size: '500GB', status: 'inactive', language: 'French' },
        { name: 'Vosk4', size: '2TB', status: 'inactive', language: 'Spanish' },
        { name: 'Vosk5', size: '1.2TB', status: 'inactive', language: 'Italian' },
        { name: 'Vosk6', size: '1.8TB', status: 'inactive', language: 'English' }
    ];

    private languages: string[] = ['all', ...new Set(this.models.map(m => m.language))];

    connectedCallback(): void {
        this.container = document.createElement('div');
        this.render();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Search listener
        const searchInput = this.container?.querySelector('.search-bar input') as HTMLInputElement;
        searchInput?.addEventListener('input', (e) => {
            this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
            this.render();
            this.setupEventListeners();
        });

        // Language filter listener
        const languageSelect = this.container?.querySelector('.language-filter select') as HTMLSelectElement;
        languageSelect?.addEventListener('change', (e) => {
            this.selectedLanguage = (e.target as HTMLSelectElement).value;
            this.render();
            this.setupEventListeners();
        });
    }

    private handleModelToggle(modelName: string): void {
        this.models = this.models.map(model => ({
            ...model,
            status: model.name === modelName ? 
                (model.status === 'active' ? 'inactive' : 'active') : 
                'inactive'
        }));
        if (this.models.find(m => m.name === modelName)?.status === 'active') {
            this.selectedModel = modelName;
        }
        this.render();
        this.setupEventListeners();
    }

    private handleModelDownload(modelName: string): void {
        console.log(`Downloading model: ${modelName}`);
    }

    private getFilteredModels(): Model[] {
        return this.models.filter(model => {
            const matchesSearch = model.name.toLowerCase().includes(this.searchQuery);
            const matchesLanguage = this.selectedLanguage === 'all' || model.language === this.selectedLanguage;
            return matchesSearch && matchesLanguage;
        });
    }

    render(): void {
        if (!this.container) return;

        const filteredModels = this.getFilteredModels();

        const template = html`
            <div class="tech-settings">
                <div class="tech-settings-header">
                    <h1>Tech Settings</h1>
                    <div class="current-model">
                        <label>Currently Active Model:</label>
                        <div class="model-display">
                            <span class="model-name">${this.selectedModel}</span>
                            <span class="model-status active">Active</span>
                        </div>
                    </div>
                    <div class="filters">
                        <div class="search-bar">
                            <input 
                                type="text" 
                                placeholder="Search models..."
                                .value=${this.searchQuery}
                            >
                            <button>
                                <span>🔍</span>
                                Search
                            </button>
                        </div>
                        <div class="language-filter">
                            <select>
                                ${this.languages.map(lang => html`
                                    <option value=${lang} ?selected=${this.selectedLanguage === lang}>
                                        ${lang.charAt(0).toUpperCase() + lang.slice(1)}
                                    </option>
                                `)}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="model-grid">
                    ${filteredModels.map(model => html`
                        <div class="model-card">
                            <div class="model-info">
                                <div class="model-name">${model.name}</div>
                                <div class="model-details">
                                    <div class="model-size">Size: ${model.size}</div>
                                    <div class="model-language">Language: ${model.language}</div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${model.status === 'active' ? '100%' : '0%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="model-actions">
                                <button 
                                    class="model-action ${model.status === 'active' ? 'on' : 'off'}"
                                    @click=${() => this.handleModelToggle(model.name)}
                                >
                                    ${model.status === 'active' ? 'Active' : 'Inactive'}
                                </button>
                                <button 
                                    class="model-action download"
                                    @click=${() => this.handleModelDownload(model.name)}
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 