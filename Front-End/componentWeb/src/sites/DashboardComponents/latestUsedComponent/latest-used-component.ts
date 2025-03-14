import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("latest-used-component")
export class LatestUsedComponent extends LitElement {
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
            <h2>Latest Used</h2>
            <p><strong>Today</strong></p>
            <p>Delete the folder 'Documents/Old Files'</p>
            <p>Create a new folder named 'Projects' on the desktop</p>
            <p><strong>Yesterday</strong></p>
            <p>Start Google Chrome</p>
            <p><strong>The previous 7 days</strong></p>
            <p>Terminate the process named 'Spotify'</p>
            <p>Shut down the PC</p>
            <p>Increase the volume to 80%</p>
            <p><strong>The previous 30 days</strong></p>
            <p>Show my current IP address</p>
    
        
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "latest-used-component": LatestUsedComponent;
    }
}
