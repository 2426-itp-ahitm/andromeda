import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("tech-settings-component")
export class TechSettingsComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<p>tech settings is working</p>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "tech-settings-component": TechSettingsComponent;
    }
}
