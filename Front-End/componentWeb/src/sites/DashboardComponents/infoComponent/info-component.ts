import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("info-component")
export class InfoComponent extends LitElement {
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
            <h2>Contact us by Problems</h2>
            <p><strong>E-Mail:</strong> andromeda@gmail.com</p>
            <p><strong>Telephone:</strong> +43 6603 210701</p>
            <p>Our Team member Gabriel Pabst is amused to help you!</p>
        
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "info-component": InfoComponent;
    }
}
