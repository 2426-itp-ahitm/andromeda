type Routes = { [key: string]: () => string };

class Router {
    private routes: Routes;
    private appElement: HTMLElement | null;

    constructor(routes: Routes, appId: string) {
        this.routes = routes;
        this.appElement = document.getElementById(appId);

        window.addEventListener("popstate", () => this.render());
        document.addEventListener("DOMContentLoaded", () => this.render());
    }

    public navigate(event: Event, path: string): void {
        event.preventDefault();
        window.history.pushState({}, "", path);
        this.render();
    }

    public render(): void {
        console.log("render");
        if (!this.appElement) return;
        const path = window.location.pathname;

        // Get the container element inside main-viewer-component
        const mainViewerContainer = this.appElement.querySelector("main-viewer-component");
        console.log("here");
        
        if (mainViewerContainer) {
            // Clear previous content
            mainViewerContainer.innerHTML = "<p>Loading...</p>";
            // Get the corresponding component tag based on the route
            const componentTag = this.routes[path]?.();
            if (componentTag) {
                // Dynamically create and append the component to the container
                const componentElement = document.createElement(componentTag);
                mainViewerContainer.appendChild(componentElement);
            } else {
                mainViewerContainer.innerHTML = "<h1>404 Not Found</h1>";
            }
        }
    }
}

// Define routes with component tags
const routes = {
    "/": () => "dashboard-component",
    "/dashboard": () => "dashboard-component",
    "/tech-settings": () => "tech-settings-component",
    "/custom-commands": () => "custom-commands-component",
    "/personal-commands": () => "personal-commands-component"
};

export const router = new Router(routes, "app-component");
