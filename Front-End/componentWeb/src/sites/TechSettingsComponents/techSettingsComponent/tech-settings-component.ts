import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"
import "./../modelInsallComponent/model-install-component";
import "./../languageSelectComponent/language-select-component";
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
        return html`
        <link rel="stylesheet" href="/techSettings/techSettings.css">
        <link rel="stylesheet" href="/styles/style.css">
        <language-select-component style="color: black;"></language-select-component>
        <model-install-component style="color: black;"></model-install-component>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "tech-settings-component": TechSettingsComponent;
    }
}
