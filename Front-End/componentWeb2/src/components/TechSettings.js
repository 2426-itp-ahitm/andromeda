import { html, render } from 'lit-html';

export class TechSettings {
    constructor() {
        this.container = null;
        this.selectedLanguage = 'German';
        this.models = [
            { name: 'Model1', size: '18 GB', progress: '80%', status: 'download' },
            { name: 'Model2', size: '25 GB', progress: '40%', status: 'on' },
            { name: 'Model3', size: '28 GB', progress: '60%', status: 'off' },
            { name: 'Model4', size: '32 GB', progress: '25%', status: 'download' },
            { name: 'Model5', size: '14 GB', progress: '10%', status: 'off' },
            { name: 'Model6', size: '8 GB', progress: '30%', status: 'on' },
            { name: 'Model7', size: '56 GB', progress: '85%', status: 'download' },
            { name: 'Model8', size: '39 GB', progress: '90%', status: 'download' }
        ];
    }

    connectedCallback(container) {
        this.container = container;
        this.render();
    }

    handleLanguageChange(e) {
        this.selectedLanguage = e.target.value;
        this.render();
    }

    render() {
        if (!this.container) return;

        const template = html`
            <div class="content">
                <h1>Language</h1>
                <select class="language-select" @change=${(e) => this.handleLanguageChange(e)}>
                    <option value="German" selected>German</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                </select>

                <h1>Install Models</h1>
                <select class="language-select">
                    <option value="" disabled selected>Select:</option>
                    <option value="all">All</option>
                    <option value="none">None</option>
                </select>

                <div class="model-grid">
                    ${this.models.map(model => html`
                        <div class="model-card">
                            <div class="model-info">
                                <div class="model-name">${model.name}</div>
                                <div class="model-size">${model.size}</div>
                            </div>
                            <div class="model-progress">${model.progress}</div>
                            <button class="model-action ${model.status}">
                                ${model.status === 'download' ? 'Download' : 
                                  model.status === 'on' ? 'ON' : 'OFF'}
                            </button>
                        </div>
                    `)}
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 