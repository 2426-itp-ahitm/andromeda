import { html, render } from 'lit-html';
import { Component } from '../types';

export class TechSettings implements Component {
  container: HTMLElement | null = null;
  private selectedModel: string = 'Vosk1';
  private searchQuery: string = '';
  private models = [
    { name: 'Vosk1', size: '1.5TB', status: 'active' },
    { name: 'Vosk2', size: '800GB', status: 'inactive' },
    { name: 'Vosk3', size: '500GB', status: 'inactive' },
    { name: 'Vosk4', size: '2TB', status: 'inactive' },
    { name: 'Vosk5', size: '1.2TB', status: 'inactive' },
    { name: 'Vosk6', size: '1.8TB', status: 'inactive' }
  ];

  connectedCallback(): void {
    this.container = document.createElement('div');
    this.render();
    this.setupSearchListener();
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
  }

  private handleModelDownload(modelName: string): void {
    console.log(`Downloading model: ${modelName}`);
  }

  render(): void {
    if (!this.container) return;

    const filteredModels = this.models.filter(model => 
      model.name.toLowerCase().includes(this.searchQuery)
    );

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
        </div>

        <div class="model-grid">
          ${filteredModels.map(model => html`
            <div class="model-card">
              <div class="model-info">
                <div class="model-name">${model.name}</div>
                <div class="model-details">
                  <div class="model-size">Size: ${model.size}</div>
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