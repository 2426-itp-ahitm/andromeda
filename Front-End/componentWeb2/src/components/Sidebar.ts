import { html, render } from 'lit-html';
import { Component } from '../types';

export class Sidebar implements Component {
  container: HTMLElement | null = null;
  private currentPage: string = 'dashboard';
  private listenersAttached: boolean = false;

  connectedCallback(): void {
    this.container = document.createElement('div');
    this.render();
    if (!this.listenersAttached) {
      this.setupNavigationListeners();
      this.listenersAttached = true;
    }
  }

  setCurrentPage(page: string): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.render();
    }
  }

  private setupNavigationListeners(): void {
    const menuItems = this.container?.querySelectorAll('.menu-item');
    menuItems?.forEach(item => {
      item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        if (page && page !== this.currentPage) {
          this.currentPage = page;
          this.render();
          this.dispatchNavigationEvent(page);
        }
      });
    });
  }

  private dispatchNavigationEvent(page: string): void {
    const event = new CustomEvent('pageChange', { 
      detail: { page },
      bubbles: true 
    });
    this.container?.dispatchEvent(event);
  }

  render(): void {
    if (!this.container) return;

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

    render(template, this.container);
  }
} 