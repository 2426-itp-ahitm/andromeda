import { html, render } from "lit-html"
import "./sites/GlobalComponents/navComponent/nav-component"
import "./sites/GlobalComponents/mainViewerComponent/main-viewer-component"
class AppComponent extends HTMLElement {
    connectedCallback() {
        render(this.content(), this)
    }
    content() {
        return html`
                <nav-component></nav-component>
                <main-viewer-component><h1>asdasdad</h1></main-viewer-component>
            `
    }
}
customElements.define("app-component", AppComponent)

