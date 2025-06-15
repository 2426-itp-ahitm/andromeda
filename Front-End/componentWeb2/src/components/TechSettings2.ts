import { html, render } from 'lit-html';
import { ModelService } from '../services/ModelService';
import { Model } from '../interfaces/Model';

class TechSettings extends HTMLElement {
  private selectedModel: string = '';
  private searchQuery: string = '';
  private selectedLanguage: string = 'all';
  private models: Model[] = [];
  private selectedModels: Set<string> = new Set();

  private languages: string[] = [];
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
    this.setupListeners();
  }

  private async loadModels() {
    this.models = await this.modelService.getModels();
    this.languages = ['all', ...new Set(this.models.map(m => m.language))];
  }

  private setupListeners() {
    const searchInput = this.querySelector('#searchInput') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
      this.render();
    });

    const langSelect = this.querySelector('#languageSelect') as HTMLSelectElement;
    langSelect?.addEventListener('change', (e) => {
      this.selectedLanguage = (e.target as HTMLSelectElement).value;
      this.render();
    });
  }

  private handleToggle(modelName: string) {
    this.models = this.models.map(m => ({
      ...m,
      status: m.name === modelName ? (m.status === 'active' ? 'inactive' : 'active') : 'inactive'
    }));
    this.selectedModel = modelName;
    this.render();
  }

  private handleDownload(modelName: string) {
    console.log(`Downloading ${modelName}`);
  }

  private handleDelete(modelName: string) {
    this.models = this.models.filter(m => m.name !== modelName);
    this.render();
  }

  private handleLogs(modelName: string) {
    alert(`Logs for ${modelName}: [Simuliert]`);
  }

  private handleCheckboxToggle(modelName: string) {
    if (this.selectedModels.has(modelName)) {
      this.selectedModels.delete(modelName);
    } else {
      this.selectedModels.add(modelName);
    }
    this.render();
  }

  private getFilteredModels(): Model[] {
    return this.models.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(this.searchQuery);
      const matchesLang = this.selectedLanguage === 'all' || m.language === this.selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }

  private render() {
    const filtered = this.getFilteredModels();
    const template = html`
      <h1 class="settings-title">Tech Settings</h1>

      <div class="settings-filters">
      <input 
        type="text" 
        id="searchInput" 
        class="settings-search" 
        placeholder="Search models..." 
        .value=${this.searchQuery}
      >
      <select id="languageSelect" class="settings-select">
        ${this.languages.map(lang => html`
        <option value=${lang} ?selected=${lang === this.selectedLanguage}>
          ${lang}
        </option>
        `)}
      </select>
      </div>

      <table class="settings-table">
      <thead>
        <tr>
        <th></th>
        <th>Name</th>
        <th>Language</th>
        <th>Size</th>
        <th>Status</th>
        <th>⚙️</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(model => html`
        <tr>
          <td>
          <input 
            type="checkbox" 
            .checked=${this.selectedModels.has(model.name)} 
            @change=${() => this.handleCheckboxToggle(model.name)} 
          />
          </td>
          <td>${model.name}</td>
          <td>${model.language}</td>
          <td>${model.size}</td>
          <td class="status ${model.status}">
          ${model.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
          </td>
          <td class="actions">
          <span title="Toggle Active" @click=${() => this.handleToggle(model.name)}>🔁</span>
          <span title="Download" @click=${() => this.handleDownload(model.name)}>⬇️</span>
          <span title="Delete" @click=${() => this.handleDelete(model.name)}>🗑️</span>
          <span title="Show Logs" @click=${() => this.handleLogs(model.name)}>📄</span>
          </td>
        </tr>
        `)}
      </tbody>
      </table>
    `;

    render(template, this);
  }
}

customElements.define('app-tech-settings', TechSettings);
