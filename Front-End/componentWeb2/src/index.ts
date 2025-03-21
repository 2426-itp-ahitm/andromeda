import { html, render } from 'lit-html';
import { Dashboard } from './components/Dashboard';
import { TechSettings } from './components/TechSettings';
import { CustomCommands } from './components/CustomCommands';
import { PersonalCommands } from './components/PersonalCommands';
import { Sidebar } from './components/Sidebar';
import { Component } from './types';
import './styles.css';

interface Components {
  dashboard: Dashboard;
  techSettings: TechSettings;
  customCommands: CustomCommands;
  personalCommands: PersonalCommands;
}

class App {
  private container: HTMLElement | null = null;
  private sidebar: Sidebar;
  private components: Components;
  private currentPage: string = 'dashboard';
  private isNavigating: boolean = false;

  constructor() {
    this.container = document.getElementById('app');
    if (!this.container) {
      throw new Error('App container not found');
    }
    
    // Initialize sidebar
    this.sidebar = new Sidebar();
    this.components = {
      dashboard: new Dashboard(),
      techSettings: new TechSettings(),
      customCommands: new CustomCommands(),
      personalCommands: new PersonalCommands()
    };

    // Initialize components
    this.sidebar.connectedCallback();
    Object.values(this.components).forEach(component => {
      component.connectedCallback();
    });

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
    this.sidebar.setCurrentPage(page);
    this.render();
    this.isNavigating = false;
  }

  private getCurrentComponent(): Component {
    switch (this.currentPage) {
      case 'dashboard':
        return this.components.dashboard;
      case 'tech-settings':
        return this.components.techSettings;
      case 'custom-commands':
        return this.components.customCommands;
      case 'personal-commands':
        return this.components.personalCommands;
      default:
        return this.components.dashboard;
    }
  }

  private render(): void {
    if (!this.container) return;

    const currentComponent = this.getCurrentComponent();

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

// Start the application
new App(); 