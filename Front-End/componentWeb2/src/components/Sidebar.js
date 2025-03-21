import { html } from 'lit-html';

export class Sidebar {
    constructor(currentPage) {
        this.currentPage = currentPage;
    }

    render() {
        return html`
            <div class="sidebar">
                <div style="text-align: center;">
                    <img width="100" height="100" src="img/logo2.png" alt="logo">
                </div>
                <div class="menu-item" ?id="currPage"=${this.currentPage === 'dashboard'}>
                    <a href="/dashboard">Dashboard</a>
                </div>
                <div class="menu-item" ?id="currPage"=${this.currentPage === 'tech-settings'}>
                    <a href="/tech-settings">Tech Settings</a>
                </div>
                <div class="menu-item" ?id="currPage"=${this.currentPage === 'custom-commands'}>
                    <a href="/custom-commands">Custom Commands</a>
                </div>
                <div class="menu-item" ?id="currPage"=${this.currentPage === 'personal-commands'}>
                    <a href="/personal-commands">Personal Commands</a>
                </div>
            </div>
        `;
    }
} 