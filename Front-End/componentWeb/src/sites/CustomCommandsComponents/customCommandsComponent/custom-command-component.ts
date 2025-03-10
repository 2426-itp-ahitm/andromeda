import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("custom-command-component")
export class CustomCommandComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<p>custom command is working</p>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "custom-command-component": CustomCommandComponent;
    }
}
