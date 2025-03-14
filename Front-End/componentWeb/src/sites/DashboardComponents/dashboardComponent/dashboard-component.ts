import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"
import "./../latestUsedComponent/latest-used-component";
import "./../infoComponent/info-component";
import "./../microphoneComponent/microphone-component";
@customElement("dashboard-component")
export class DashboardComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
        <link rel="stylesheet" href="./dashboard/dashboard.css">
        <link rel="stylesheet" href="/styles/style.css">
        <h1 style="color: black;">Welcome to Andromeda!</h1>

        <latest-used-component class="card"></latest-used-component>
        <microphone-component class="card"></microphone-component>
        <info-component class="card"></info-component>
        
        
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "dashboard-component": DashboardComponent;
    }
}
