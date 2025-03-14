import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("language-select-component")
export class LanguageSelectComponent extends LitElement {
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
        <h2>Language</h2>
        <select>
            <option>German</option>
            <option>Englisch</option>
        </select>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "language-select-component": LanguageSelectComponent;
    }
}
