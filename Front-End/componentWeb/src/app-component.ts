import { html, render } from "lit-html"

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(this.content(), this)
    }
    content() {
        return html`
                <p>AppComponent</p>
            `
    }
}
customElements.define("app-component", AppComponent)

