import { html, render } from 'lit-html';

class GeneralSettings extends HTMLElement {
    private settings: { key: string; value: string | number }[] = [
        { key: 'Application Name', value: 'Andromeda' },
        { key: 'Max Users', value: 100 },
        { key: 'Theme', value: 'Light' }
    ];
    private searchQuery: string = '';
    private isModalOpen: boolean = false;
    private hasUnsavedChanges: boolean = false;

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.render();
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        document.addEventListener('click', this.handleNavigationAttempt.bind(this));
    }

    disconnectedCallback(): void {
        window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        document.removeEventListener('click', this.handleNavigationAttempt.bind(this));
    }

    private handleBeforeUnload(event: BeforeUnloadEvent): void {
        if (this.hasUnsavedChanges) {
            event.preventDefault();
            event.returnValue = '';
        }
    }

    private handleNavigationAttempt(event: Event): void {
        const target = event.target as HTMLElement;
        if (this.hasUnsavedChanges && target.closest('.menu-item')) {
            event.preventDefault();
            const page = target.closest('.menu-item')?.getAttribute('data-page');
            this.showUnsavedChangesPopup(page ?? undefined);
        }
    }

    private showUnsavedChangesPopup(targetPage?: string): void {
        this.isModalOpen = true;
        render(html`
            <div class="modal-overlay"></div>
            <div class="modal">
                <h2>Unsaved Changes</h2>
                <p>You have unsaved changes. Do you want to save them before leaving?</p>
                <div class="modal-actions">
                    <button @click=${() => this.resolveUnsavedChanges(false, targetPage)}>Disregard</button>
                    <button @click=${() => this.resolveUnsavedChanges(true, targetPage)}>Save</button>
                </div>
            </div>
        `, this);
    }

    private resolveUnsavedChanges(save: boolean, targetPage?: string): void {
        if (save) this.saveSettings();
        this.hasUnsavedChanges = false;
        this.isModalOpen = false;
        this.render();
        if (targetPage) {
            const sidebar = document.querySelector('app-sidebar') as any;
            sidebar.navigateToPage(targetPage); // Ensure the sidebar navigation is triggered
        }
    }

    private navigateToPage(page: string): void {
        const sidebar = document.querySelector('app-sidebar');
        if (sidebar) {
            sidebar.setAttribute('current-page', page);
        }
    }

    private updateSearchQuery(event: Event): void {
        this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
        this.render();
    }

    private addSetting(key: string, value: string | number): void {
        if (key.trim() && value !== undefined) {
            this.settings.push({ key, value });
            this.hasUnsavedChanges = true;
        }
        this.isModalOpen = false;
        this.render();
    }

    private updateSetting(index: number, value: string | number): void {
        this.settings[index].value = value;
        this.hasUnsavedChanges = true;
        this.render();
    }

    private saveSettings(): void {
        console.log('Settings saved:', this.settings);
        this.hasUnsavedChanges = false;
        this.render();
    }

    private getFilteredSettings(): { key: string; value: string | number }[] {
        return this.settings.filter(setting =>
            setting.key.toLowerCase().includes(this.searchQuery)
        );
    }

    private render(): void {
        const filteredSettings = this.getFilteredSettings();
        render(html`
            <div class="general-settings">
                <h1>General Settings</h1>
                <div class="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search settings..." 
                        .value=${this.searchQuery} 
                        @input=${this.updateSearchQuery.bind(this)}
                    >
                </div>
                <div class="settings-list">
                    ${filteredSettings.map((setting, index) => html`
                        <div class="setting-item">
                            <span class="setting-key">${setting.key}</span>
                            <input
                                class="setting-value"
                                type="text"
                                .value=${String(setting.value)}
                                @input=${(e: Event) => this.updateSetting(index, (e.target as HTMLInputElement).value)}
                            />
                        </div>
                    `)}
                </div>
                <button @click=${() => { this.isModalOpen = true; this.render(); }}>Add Setting</button>
                ${this.hasUnsavedChanges ? html`
                    <button @click=${this.saveSettings.bind(this)}>Save Settings</button>
                ` : ''}
            </div>
        `, this);
    }
}

customElements.define('app-general-settings', GeneralSettings);
