import { html, render } from "lit-html"
import "./sites/GlobalComponents/navComponent/nav-component"
class AppComponent extends HTMLElement {
    connectedCallback() {
        render(this.content(), this)
    }
    content() {
        return html`
                <nav-component></nav-component>
            `
    }
}
customElements.define("app-component", AppComponent)

