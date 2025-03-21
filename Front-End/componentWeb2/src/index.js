import { html, render } from 'lit-html';
import './styles.css';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TechSettings } from './components/TechSettings';
import { CustomCommands } from './components/CustomCommands';
import { PersonalCommands } from './components/PersonalCommands';

class App {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.components = {
            dashboard: new Dashboard(),
            'tech-settings': new TechSettings(),
            'custom-commands': new CustomCommands(),
            'personal-commands': new PersonalCommands()
        };
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path === '/dashboard') return 'dashboard';
        if (path === '/tech-settings') return 'tech-settings';
        if (path === '/custom-commands') return 'custom-commands';
        if (path === '/personal-commands') return 'personal-commands';
        return 'dashboard';
    }

    init() {
        // Handle navigation
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();

        // Handle link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                window.history.pushState({}, '', href);
                this.handleRoute();
            }
        });
    }

    handleRoute() {
        this.currentPage = this.getCurrentPage();
        this.render();
    }

    render() {
        const app = document.getElementById('app');
        const sidebar = new Sidebar(this.currentPage);

        const template = html`
            ${sidebar.render()}
            <div id="content-container"></div>
        `;

        render(template, app);
        
        // Initialize current component
        const contentContainer = document.getElementById('content-container');
        if (contentContainer) {
            const currentComponent = this.components[this.currentPage];
            if (currentComponent) {
                currentComponent.connectedCallback(contentContainer);
            }
        }
    }
}

// Initialize the application
new App(); 