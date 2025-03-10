import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

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
        return html`<p>dashboard is working</p>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "dashboard-component": DashboardComponent;
    }
}
