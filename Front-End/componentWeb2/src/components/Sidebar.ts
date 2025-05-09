import { html, render } from 'lit-html';

class Sidebar extends HTMLElement {
    private currentPage: string = 'dashboard';

    static get observedAttributes() {
        return ['current-page'];
    }

    connectedCallback(): void {
        this.render();
        this.addEventListener('click', this.handleNavigation.bind(this));
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'current-page' && oldValue !== newValue) {
            this.currentPage = newValue;
            this.render();
        }
    }

    private handleNavigation(event: Event): void {
        const target = (event.target as HTMLElement).closest('.menu-item');
        if (target) {
            const page = target.getAttribute('data-page');
            if (page && page !== this.currentPage) {
                const generalSettings = document.querySelector('app-general-settings') as any;
                if (generalSettings?.hasUnsavedChanges) {
                    event.preventDefault();
                    generalSettings.showUnsavedChangesPopup(page);
                } else {
                    this.navigateToPage(page);
                }
            }
        }
    }

    private navigateToPage(page: string): void {
        this.currentPage = page;
        this.dispatchNavigationEvent(page);
        this.render();
    }

    private dispatchNavigationEvent(page: string): void {
        const event = new CustomEvent('pageChange', {
            detail: { page },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    private render(): void {
        render(html`
            <div class="sidebar">
            <div class="sidebar-header">
                <img src="/assets/logo2.png" alt="Andromeda Logo" class="logo">
                <h1>Andromeda</h1>
            </div>
            <nav class="sidebar-nav">
                <div class="menu-item ${this.currentPage === 'dashboard' ? 'active' : ''}" data-page="dashboard" style="${this.currentPage === 'dashboard' ? 'background-color: #57536d;' : ''}">
                <span>📊</span>
                Dashboard
                </div>
                <div class="menu-item ${this.currentPage === 'tech-settings' ? 'active' : ''}" data-page="tech-settings" style="${this.currentPage === 'tech-settings' ? 'background-color: #57536d;' : ''}">
                <span>⚙️</span>
                Tech Settings
                </div>
                <div class="menu-item ${this.currentPage === 'personal-commands' ? 'active' : ''}" data-page="personal-commands" style="${this.currentPage === 'personal-commands' ? 'background-color: #57536d;' : ''}">
                <span>🎯</span>
                Personal Commands
                </div>
                <div class="menu-item ${this.currentPage === 'custom-commands' ? 'active' : ''}" data-page="custom-commands" style="${this.currentPage === 'custom-commands' ? 'background-color: #57536d;' : ''}">
                <span>💻</span>
                Custom Commands
                </div>
                <div class="menu-item ${this.currentPage === 'general-settings' ? 'active' : ''}" data-page="general-settings" style="${this.currentPage === 'general-settings' ? 'background-color: #57536d;' : ''}">
                <span>⚙️</span>
                General Settings
                </div>
            </nav>
            </div>
        `, this);
    }
}

customElements.define('app-sidebar', Sidebar);