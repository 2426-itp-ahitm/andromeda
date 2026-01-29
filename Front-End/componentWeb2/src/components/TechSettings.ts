import { html, render } from 'lit-html';
import { ModelService } from '../services/ModelService';
import { Model } from '../interfaces/Model';


class TechSettings extends HTMLElement {
    private selectedModel: string = 'Vosk1';
    private searchQuery: string = '';
    private selectedLanguage: string = 'all';
    private models: Model[] = [];
    private downloadingModels: Map<string, number> = new Map();
    private downloadingModelName: Map<string, string> = new Map();

    private languages: string[] = ['all', ...new Set(this.models.map(m => m.language))];

    private modelService: ModelService;

    constructor() {
        super();
        this.modelService = ModelService.getInstance();
    }

    connectedCallback(): void {
        this.initialize();
    }

    private async initialize() {
        await this.loadModels();
        this.render();
        this.setupEventListeners();
    }

    private async loadModels() {
        const allModels = await this.modelService.getModels();
        this.models = allModels;
        this.languages = ['all', ...new Set(this.models.map(m => m.language))];
    }

    private setupEventListeners(): void {
        // Search listener
        const searchInput = this.querySelector('.search-bar input') as HTMLInputElement;
        searchInput?.addEventListener('input', (e) => {
            this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
            this.render();
            this.setupEventListeners();
        });

        // Language filter listener
        const languageSelect = this.querySelector('.language-filter select') as HTMLSelectElement;
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
            (model.status === 'not downloaded' ? 'not downloaded' : 'inactive')
        }));
        if (this.models.find(m => m.name === modelName)?.status === 'active') {
            this.selectedModel = modelName;
            fetch('http://localhost:65323/set_selected_module', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: modelName }),
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
        }
        this.render();
        this.setupEventListeners();
    }

    private async handleModelDownload(modelLink: string, modelName: string): Promise<void> {
        console.log(`Downloading model from ${modelLink}`);
        
        try {
            // Set initial progress immediately
            this.downloadingModels.set(modelLink, 0);
            this.downloadingModelName.set(modelLink, modelName);
            this.render();
            this.setupEventListeners();

            // Start simulating progress updates
            const progressInterval = setInterval(() => {
                const currentProgress = this.downloadingModels.get(modelLink) || 0;
                if (currentProgress < 90) {
                    this.downloadingModels.set(modelLink, currentProgress + Math.random() * 30);
                    this.render();
                    this.setupEventListeners();
                }
            }, 500);

            const response = await fetch('http://localhost:65323/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: modelLink }),
            });

            if (!response.ok) {
                throw new Error(`Download failed: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Complete the download
            clearInterval(progressInterval);
            this.downloadingModels.set(modelLink, 100);
            this.render();
            this.setupEventListeners();

            console.log(data);

            // Wait a moment then clear the progress bar and reinitialize
            setTimeout(async () => {
                this.downloadingModels.delete(modelLink);
                this.downloadingModelName.delete(modelLink);
                await this.initialize();
            }, 500);

        } catch (err) {
            console.error(err);
            // Clear progress bar on error
            this.downloadingModels.delete(modelLink);
            this.downloadingModelName.delete(modelLink);
            this.render();
            this.setupEventListeners();
        }
    }

    private getFilteredModels(): Model[] {
        return this.models.filter(model => {
            const matchesSearch = model.name.toLowerCase().includes(this.searchQuery);
            const matchesLanguage = this.selectedLanguage === 'all' || model.language === this.selectedLanguage;
            return matchesSearch && matchesLanguage;
        });
    }

    private render(): void {
        const filteredModels = this.getFilteredModels();

        const truncate = (text: string, max: number = 21) => {
            if (text.length > max) {
            return text.slice(0, max - 3) + '...';
            }
            return text;
        };

        const template = html`
            <div class="tech-settings"></div>
            <div class="tech-settings-header">
                <h1>Tech Settings</h1>
                <div class="current-model">
                <label>Currently Active Model:</label>
                <div class="model-display">
                    <span 
                    class="model-name"
                    title=${filteredModels.find(m => m.status === 'active')?.name || ''}
                    >
                    ${truncate(filteredModels.find(m => m.status === 'active')?.name || '')}
                    </span>
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
                    <div 
                        class="model-name"
                        title=${model.name}
                        style="cursor: pointer;"
                    >
                        ${truncate(model.name)}
                    </div>
                    <div class="model-details">
                        <div class="model-size">Size: ${model.size}</div>
                        <div class="model-language">Language: ${model.language}</div>
                        ${this.downloadingModels.has(model.link) ? html`
                            <div class="download-progress">
                                <div class="progress-info">
                                    <span class="progress-label">Downloading...</span>
                                    <span class="progress-percent">${Math.round(this.downloadingModels.get(model.link) || 0)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${Math.round(this.downloadingModels.get(model.link) || 0)}%"></div>
                                </div>
                            </div>
                        ` : html``}
                    </div>
                    <div class="model-actions">
                    <button 
                        class="model-action ${model.status === 'active' ? 'on' : 'off'}"
                        @click=${() => this.handleModelToggle(model.name)}
                        style="display: ${model.status === 'not downloaded' ? 'none' : 'inline-block'}"
                    >
                        ${model.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                    <button 
                        class="model-action download"
                        @click=${(e: Event) => {
                            const btn = e.target as HTMLButtonElement;
                            btn.textContent = 'Downloading...';
                            btn.disabled = true;
                            this.handleModelDownload(model.link, model.name);
                        }}
                        style="display: ${model.status === 'not downloaded' && !this.downloadingModels.has(model.link) ? 'inline-block' : 'none'}"
                    >
                        Download
                    </button>
                    </div>
                </div>
                `)}
            </div>
            </div>
        `;

        render(template, this);
    }
}

customElements.define('app-tech-settings', TechSettings);