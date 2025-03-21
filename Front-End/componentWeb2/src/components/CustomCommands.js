import { html, render } from 'lit-html';

export class CustomCommands {
    constructor() {
        this.container = null;
    }

    connectedCallback(container) {
        this.container = container;
        this.render();
    }

    render() {
        if (!this.container) return;

        const template = html`
            <div class="content">
                <div class="command-editor">
                    <div class="command-editor-header">
                        <span>Write a new command</span>
                        <span>📁</span>
                    </div>
                    <div class="command-editor-content">
                        <textarea 
                            placeholder="Write your command here..."
                            style="width: 100%; height: 100%; border: none; resize: none; outline: none; font-family: inherit;"
                        ></textarea>
                    </div>
                    <div class="command-editor-actions">
                        <button class="command-editor-button cancel">✕</button>
                        <button class="command-editor-button save">✓</button>
                    </div>
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 