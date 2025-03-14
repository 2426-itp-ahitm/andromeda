import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("microphone-component")
export class MicrophoneComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
        <link rel="stylesheet" href="/dashboard/dashboard.css">
        <link rel="stylesheet" href="/styles/style.css">
            <h2>Microphone status</h2>
            <div class="dropdown" onclick="toggleDropdown()">
                <span>Microphone</span>
                <span>THC-GamingSensoricMicro</span>
                <span class="icon">&#9660;</span>
                <div class="dropdown-content">
                    <a href="#">THC-GamingSensoricMicro</a>
                    <a href="#">USB-Microphone</a>
                    <a href="#">Bluetooth-Microphone</a>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "microphone-component": MicrophoneComponent;
    }
}
