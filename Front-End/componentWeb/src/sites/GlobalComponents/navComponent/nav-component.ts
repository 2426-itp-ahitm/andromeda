import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("nav-component")
export class NavComponent extends LitElement {
    @property({ type: Function }) navigate!: (event: Event, path: string) => void;

    static styles = css`
        .menu-item a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
        }
    `;

    render() {
        return html`
            <link rel="stylesheet" href="/styles/style.css">
            <div class="sidebar">
                <div style="text-align: center;">
                    <img width="100vw" height="100vw" src="images/logo2.png" alt="logo">
                </div>
                <div class="menu-item">
                    <a href="/dashboard" @click="${(e: Event) => this.navigate(e, '/dashboard')}">Dashboard</a>
                </div>
                <div class="menu-item">
                    <a href="/tech-settings" @click="${(e: Event) => this.navigate(e, '/tech-settings')}">Tech Settings</a>
                </div>
                <div class="menu-item">
                    <a href="/custom-commands" @click="${(e: Event) => this.navigate(e, '/custom-commands')}">Custom Commands</a>
                </div>
                <div class="menu-item">
                    <a href="/personal-commands" @click="${(e: Event) => this.navigate(e, '/personal-commands')}">Personal Commands</a>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "nav-component": NavComponent;
    }
}
