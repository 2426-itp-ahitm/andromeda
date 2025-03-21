import { html, render } from 'lit-html';
import { Dashboard } from './components/Dashboard';
import { TechSettings } from './components/TechSettings';
import { CustomCommands } from './components/CustomCommands';
import { PersonalCommands } from './components/PersonalCommands';
import { Sidebar } from './components/Sidebar';
import './styles.css';

interface Components {
  [key: string]: any;
}

export class App {
  private container: HTMLElement | null = null;
  private sidebar: Sidebar;
  private components: Components;

  constructor() {
    this.container = document.getElementById('app');
    if (!this.container) {
      throw new Error('App container not found');
    }
    
    // Initialize sidebar
    this.sidebar = new Sidebar();
    this.sidebar.connectedCallback();

    // Initialize components
    this.components = {
      dashboard: new Dashboard(),
      techSettings: new TechSettings(),
      customCommands: new CustomCommands(),
      personalCommands: new PersonalCommands()
    };

    // Call connectedCallback for each component
    Object.values(this.components).forEach(component => {
      component.connectedCallback();
    });

    this.init();
  }

  private getCurrentPage(): string {
    const path = window.location.pathname;
    switch (path) {
      case '/':
      case '/dashboard':
        return 'dashboard';
      case '/tech-settings':
        return 'techSettings';
      case '/custom-commands':
        return 'customCommands';
      case '/personal-commands':
        return 'personalCommands';
      default:
        return 'dashboard';
    }
  }

  private init(): void {
    window.addEventListener('popstate', () => this.render());
    this.container?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          window.history.pushState({}, '', href);
          this.render();
        }
      }
    });
    this.render();
  }

  private render(): void {
    if (!this.container) return;

    const currentPage = this.getCurrentPage();
    const currentComponent = this.components[currentPage];
    this.sidebar.setCurrentPage(currentPage);

    const template = html`
      <div class="app">
        ${this.sidebar.container}
        <div class="content">
          ${currentComponent.container}
        </div>
      </div>
    `;

    render(template, this.container);
  }
}

new App(); 