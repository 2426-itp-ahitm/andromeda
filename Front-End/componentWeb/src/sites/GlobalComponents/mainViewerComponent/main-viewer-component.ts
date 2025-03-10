import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("main-viewer-component")
export class MainViewerComponent extends LitElement {
    static styles = [
        css``
    ];

    render() {
        return html`
        <link rel="stylesheet" href="/styles/style.css">
        <div class="content"><slot></slot></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "main-viewer-component": MainViewerComponent;
    }
}
