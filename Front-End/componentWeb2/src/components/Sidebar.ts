import { html, render } from 'lit-html';

class Sidebar extends HTMLElement {
  private currentPage: string = 'dashboard';

  static get observedAttributes() {
    return ['current-page'];
  }

  connectedCallback(): void {
    this.render();
    this.setupNavigationListeners();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === 'current-page' && oldValue !== newValue) {
      this.currentPage = newValue;
      this.render();
    }
  }

  private setupNavigationListeners(): void {
    this.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        if (page && page !== this.currentPage) {
          this.dispatchNavigationEvent(page);
        }
      });
    });
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
    const template = html`
      <div class="sidebar">
        <div class="sidebar-header">
          <img src="/assets/logo2.png" alt="Andromeda Logo" class="logo">
          <h1>Andromeda</h1>
        </div>
        <nav class="sidebar-nav">
          <div class="menu-item ${this.currentPage === 'dashboard' ? 'active' : ''}" data-page="dashboard">
            <span>📊</span>
            Dashboard
          </div>
          <div class="menu-item ${this.currentPage === 'tech-settings' ? 'active' : ''}" data-page="tech-settings">
            <span>⚙️</span>
            Tech Settings
          </div>
          <div class="menu-item ${this.currentPage === 'personal-commands' ? 'active' : ''}" data-page="personal-commands">
            <span>🎯</span>
            Personal Commands
          </div>
          <div class="menu-item ${this.currentPage === 'custom-commands' ? 'active' : ''}" data-page="custom-commands">
            <span>💻</span>
            Custom Commands
          </div>
        </nav>
      </div>
    `;

    render(template, this);
  }
}

customElements.define('app-sidebar', Sidebar);