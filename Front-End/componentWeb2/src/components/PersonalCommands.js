import { html, render } from 'lit-html';

export class PersonalCommands {
    constructor() {
        this.container = null;
        this.commands = [
            "Delete the folder 'Documents/Old Files'",
            "Create a new folder named 'Projects' on the desktop",
            "Start Google Chrome",
            "Terminate the process named 'Spotify'",
            "Start Google Chrome",
            "Shut down the PC",
            "Increase volume to 80%",
            "Terminate the process named 'Spotify'",
            "Show my current IP address"
        ];
    }

    connectedCallback(container) {
        this.container = container;
        this.render();
    }

    render() {
        if (!this.container) return;

        const template = html`
            <div class="content">
                <h1>Personal Commands</h1>
                <select class="command-select">
                    <option value="personalized" selected>Select: personalized</option>
                    <option value="all">All</option>
                    <option value="recent">Recent</option>
                </select>

                <div class="command-list">
                    ${this.commands.map(command => html`
                        <div class="command-item">
                            ${command}
                        </div>
                    `)}
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 