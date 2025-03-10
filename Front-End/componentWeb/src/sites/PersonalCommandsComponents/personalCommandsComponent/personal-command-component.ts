import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("personal-command-component")
export class PersonalCommandComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<p>personal command is working</p>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "personal-command-component": PersonalCommandComponent;
    }
}
