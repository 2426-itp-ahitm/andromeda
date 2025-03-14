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
