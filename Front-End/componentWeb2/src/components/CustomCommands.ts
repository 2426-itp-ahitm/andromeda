import { html, render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { customCommandService } from '../services/CustomCommandService';

declare const hljs: any;

export class CustomCommands extends HTMLElement {
    container: HTMLElement | null = null;
    private currentCode: string = '';
    private voiceCommand: string = '';
    private fileName: string = '';

    connectedCallback(): void {
        this.render();
        this.setupCodeHighlighting();
    }

    private setupCodeHighlighting(): void {
        const textarea = this.querySelector('.code-editor textarea') as HTMLTextAreaElement;
        const codeDisplay = this.querySelector('.code-display') as HTMLElement;

        if (textarea && codeDisplay) {
            textarea.addEventListener('input', () => {
                this.currentCode = textarea.value;
                const highlighted = hljs.highlight(this.currentCode, { language: 'python' }).value;
                codeDisplay.innerHTML = highlighted || '&nbsp;';
                this.syncScroll(textarea, codeDisplay.parentElement as HTMLElement);
            });

            textarea.addEventListener('scroll', () => {
                this.syncScroll(textarea, codeDisplay.parentElement as HTMLElement);
            });
        }
    }

    private syncScroll(textarea: HTMLTextAreaElement, codeDisplay: HTMLElement): void {
        codeDisplay.scrollTop = textarea.scrollTop;
        codeDisplay.scrollLeft = textarea.scrollLeft;
    }

    private handleCodeChange(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        this.currentCode = textarea.value;
    }

    private handleVoiceCommandChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.voiceCommand = input.value;
    }

    private handleFileUpload(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file && file.name.endsWith('.py')) {
            this.fileName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.currentCode = e.target?.result as string;
                this.render();
                // Highlight the uploaded code
                const textarea = this.querySelector('.code-editor textarea') as HTMLTextAreaElement;
                const codeDisplay = this.querySelector('.code-display') as HTMLElement;
                if (textarea && codeDisplay) {
                    const highlighted = hljs.highlight(this.currentCode, { language: 'python' }).value;
                    codeDisplay.innerHTML = highlighted || '&nbsp;';
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a Python (.py) file');
            input.value = '';
        }
    }

    private async handleSave(): Promise<void> {
        if (!this.voiceCommand.trim()) {
            alert('Please enter a voice command');
            return;
        }
        
        if (!this.currentCode.trim()) {
            alert('Please enter Python code or upload a file');
            return;
        }

        try {
            const savedCommand = await customCommandService.saveCustomCommand(
                this.voiceCommand,
                this.currentCode
            );
            alert('Command saved successfully!');
            console.log('Command saved:', savedCommand);
            
            // Reset form
            this.currentCode = '';
            this.voiceCommand = '';
            this.fileName = '';
            this.render();
        } catch (error) {
            alert(`Error saving command: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error('Error saving command:', error);
        }
    }

    render(): void {
        const exampleCode = `class MyCommand:
    # Your command implementation
    def run(self, params):
        # params: dictionary of parameters
        # return: result of the command
        return "Command executed successfully"`;

        const highlightedExample = hljs.highlight(exampleCode, { language: 'python' }).value;

        const template = html`
            <div class="custom-commands">
                <div class="command-editor">
                    <div class="command-editor-header">
                        <h2>Create Python Command</h2>
                    </div>
                    <div class="command-editor-content">
                        <div class="voice-command-input">
                            <label>Voice Command Trigger</label>
                            <input 
                                type="text" 
                                placeholder="e.g., 'open music' or 'start browser'"
                                .value=${this.voiceCommand}
                                @input=${this.handleVoiceCommandChange}
                            >
                        </div>

                        <div class="command-help">
                            <p>Create a new command by implementing a Python class with a run method:</p>
                            <pre><code class="language-python">${unsafeHTML(highlightedExample)}</code></pre>
                        </div>

                        <div class="code-input-options">
                            <div class="file-upload">
                                <label for="pyfile">Upload Python File</label>
                                <div class="file-input-wrapper">
                                    <input 
                                        type="file" 
                                        id="pyfile" 
                                        accept=".py"
                                        @change=${this.handleFileUpload}
                                    >
                                    ${this.fileName ? html`
                                        <span class="file-name">${this.fileName}</span>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="separator">OR</div>
                            <div class="code-editor">
                                <textarea 
                                    placeholder="Enter your Python code here..."
                                    .value=${this.currentCode}
                                    @input=${this.handleCodeChange}
                                    spellcheck="false"
                                    autocomplete="off"
                                    autocorrect="off"
                                    autocapitalize="off"
                                ></textarea>
                                <pre class="code-mirror"><code class="code-display language-python">${unsafeHTML(hljs.highlight(this.currentCode, { language: 'python' }).value || '&nbsp;')}</code></pre>
                            </div>
                        </div>
                    </div>
                    <div class="command-editor-actions">
                        <button class="command-editor-button cancel" @click=${() => {
                            this.currentCode = '';
                            this.voiceCommand = '';
                            this.fileName = '';
                            this.render();
                        }}>
                            Clear All
                        </button>
                        <button class="command-editor-button save" @click=${this.handleSave}>
                            Save Command
                        </button>
                    </div>
                </div>
            </div>
        `;

        render(template, this);
        this.setupCodeHighlighting();
    }
}

customElements.define('app-custom-commands', CustomCommands);