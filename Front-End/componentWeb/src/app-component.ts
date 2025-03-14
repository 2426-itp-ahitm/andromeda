import { html, render } from "lit-html";
import "../src/sites/GlobalComponents/navComponent/nav-component";
import "../src/sites/GlobalComponents/mainViewerComponent/main-viewer-component";
import { router } from "./../../componentWeb/src/router/router"; // Import the router
import "../src/sites/DashboardComponents/dashboardComponent/dashboard-component"; // Import the new components
import "../src/sites/TechSettingsComponents/techSettingsComponent/tech-settings-component";
import "../src/sites/CustomCommandsComponents/customCommandsComponent/custom-command-component";
import "../src/sites/PersonalCommandsComponents/personalCommandsComponent/personal-command-component";

class AppComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    private render() {
        render(
            html`
                <nav-component></nav-component>
                <main-viewer-component>
                   <dashboard-component></dashboard-component>
                </main-viewer-component>
            `,
            this
        );
        router.render(); // Render initial route
    }

}

customElements.define("app-component", AppComponent);
