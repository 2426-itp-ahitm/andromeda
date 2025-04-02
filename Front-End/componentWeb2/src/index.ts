import { html, render } from 'lit-html';
import './components/Dashboard';
import './components/TechSettings';
import './components/CustomCommands';
import './components/PersonalCommands';
import './components/GeneralSettings';
import './components/Sidebar';
import './styles.css';

class App {
  private container: HTMLElement | null = null;
  private currentPage: string = 'dashboard';
  private isNavigating: boolean = false;

  constructor() {
    this.container = document.getElementById('app');
    if (!this.container) {
      throw new Error('App container not found');
    }

    // Set up event listeners
    document.addEventListener('pageChange', (e: Event) => {
      const customEvent = e as CustomEvent;
      this.handlePageChange(customEvent.detail.page);
    });

    this.render();
  }

  private handlePageChange(page: string): void {
    if (this.isNavigating || page === this.currentPage) return;

    this.isNavigating = true;
    this.currentPage = page;
    this.render();
    this.isNavigating = false;
  }

  private render(): void {
    if (!this.container) return;

    const template = html`
      <div class="app">
        <app-sidebar current-page=${this.currentPage}></app-sidebar>
        <div class="content">
          ${this.getCurrentComponent()}
        </div>
      </div>
    `;

    render(template, this.container);
  }

  private getCurrentComponent(): HTMLElement {
    switch (this.currentPage) {
      case 'dashboard':
        return document.createElement('app-dashboard'); // Ensure this matches the component name
      case 'tech-settings':
        return document.createElement('app-tech-settings');
      case 'custom-commands':
        return document.createElement('app-custom-commands');
      case 'personal-commands':
        return document.createElement('app-personal-commands');
      case 'general-settings':
        return document.createElement('app-general-settings');
      default:
        return document.createElement('app-dashboard'); // Fallback to dashboard
    }
  }
}

// Start the application
new App();