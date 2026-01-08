import { html, render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { customCommandService } from '../services/CustomCommandService';

declare const hljs: any;

// --- Speech API Types ---
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}
// ------------------------

export class CustomCommands extends HTMLElement {
    container: HTMLElement | null = null;
    private currentCode: string = '';
    private voiceCommand: string = '';
    private fileName: string = '';

    // Voice recognition state
    private isListening: boolean = false;
    private recognition: any = null;

    connectedCallback(): void {
        this.initSpeechRecognition();
        this.render();
        this.setupCodeHighlighting();
    }

    private initSpeechRecognition(): void {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true; 
            
            // AUTOMATIC LANGUAGE DETECTION
            // Uses the browser's language (e.g., 'de-DE', 'en-US', 'fr-FR')
            this.recognition.lang = navigator.language || 'de-DE'; 

            this.recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                this.voiceCommand = finalTranscript || interimTranscript;
                this.render();
            };

            this.recognition.onerror = (err: any) => {
                console.error('Speech recognition error:', err);
                this.isListening = false;
                this.render();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.render();
            };
        }
    }

    private toggleListening = (): void => {
        if (!this.recognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.voiceCommand = ''; 
            this.isListening = true;
            this.recognition.start();
            this.render();
        }
    }

    private setupCodeHighlighting(): void {
        const textarea = this.querySelector('.code-editor textarea') as HTMLTextAreaElement;
        const codeDisplay = this.querySelector('.code-display') as HTMLElement;

        if (textarea && codeDisplay) {
            textarea.addEventListener('input', () => {
                this.currentCode = textarea.value;
                this.render();
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

    private handleCodeChange = (event: Event): void => {
        const textarea = event.target as HTMLTextAreaElement;
        this.currentCode = textarea.value;
    }

    private handleVoiceCommandChange = (event: Event): void => {
        const input = event.target as HTMLInputElement;
        this.voiceCommand = input.value;
    }

    private handleFileUpload = (event: Event): void => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file && file.name.endsWith('.py')) {
            this.fileName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.currentCode = e.target?.result as string;
                this.render();
                this.setupCodeHighlighting();
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a Python (.py) file');
            input.value = '';
        }
    }

    private handleSave = async (): Promise<void> => {
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
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <input 
                                    type="text" 
                                    style="flex-grow: 1;"
                                    placeholder="e.g., 'open music' or 'start browser'"
                                    .value=${this.voiceCommand}
                                    @input=${this.handleVoiceCommandChange}
                                >
                                <button 
                                    class="mic-button ${this.isListening ? 'listening' : ''}" 
                                    @click=${this.toggleListening}
                                    type="button"
                                    style="padding: 0 12px; cursor: pointer;"
                                >
                                    ${this.isListening ? '🛑 Stop' : '🎤'}
                                </button>
                            </div>
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