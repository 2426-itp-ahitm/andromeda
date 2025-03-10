import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"
@customElement("nav-component")
export class NavComponent extends LitElement {
    static styles = css`
        
    `;

    render() {
        return html`
    <link rel="stylesheet" href="/styles/style.css">
    <div class="sidebar">
        <div style="text-align: center;">
            <img width="100vw" height="100vw" src="images/logo2.png" alt="logo">
        </div>
        <div id="currPage" class="menu-item"><a href="Dashboard.html">Dashboard</a></div>
        <div class="menu-item"><a href="techSettings.html">Tech Settings</a></div>
        <div class="menu-item"><a href="customCommands.html">Custom Commands</a></div>
        <div class="menu-item"><a href="PersonalCommands.html">Personal Commands</a></div>
    </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "nav-component": NavComponent;
    }
}
