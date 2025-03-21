import { html, render } from 'lit-html';
import { Component } from '../types';

export class Sidebar implements Component {
  container: HTMLElement | null = null;
  private currentPage: string = 'dashboard';

  connectedCallback(): void {
    this.container = document.createElement('div');
    this.render();
  }

  setCurrentPage(page: string): void {
    this.currentPage = page;
    this.render();
  }

  render(): void {
    if (!this.container) return;

    const template = html`
      <div class="sidebar">
        <div style="text-align: center;">
          <img width="100" height="100" src="assets/logo2.png" alt="logo">
        </div>
        <div class="menu-item" id=${this.currentPage === 'dashboard' ? 'currPage' : ''}>
          <a href="/dashboard">Dashboard</a>
        </div>
        <div class="menu-item" id=${this.currentPage === 'techSettings' ? 'currPage' : ''}>
          <a href="/tech-settings">Tech Settings</a>
        </div>
        <div class="menu-item" id=${this.currentPage === 'customCommands' ? 'currPage' : ''}>
          <a href="/custom-commands">Custom Commands</a>
        </div>
        <div class="menu-item" id=${this.currentPage === 'personalCommands' ? 'currPage' : ''}>
          <a href="/personal-commands">Personal Commands</a>
        </div>
      </div>
    `;

    render(template, this.container);
  }
} 