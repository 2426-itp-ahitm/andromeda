import { html, render } from 'lit-html';

export class Dashboard {
    constructor() {
        this.microphoneOptions = [
            'THC-GamingSensoricMicro',
            'USB-Microphone',
            'Bluetooth-Microphone'
        ];
        this.selectedMicrophone = 'THC-GamingSensoricMicro';
        this.isDropdownOpen = false;
        this.container = null;
        this._boundHandleClickOutside = this.handleClickOutside.bind(this);
    }

    connectedCallback(container) {
        this.container = container;
        document.addEventListener('click', this._boundHandleClickOutside);
        this.render();
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._boundHandleClickOutside);
    }

    toggleDropdown(e) {
        e.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
        this.render();
    }

    selectMicrophone(option, e) {
        e.preventDefault();
        e.stopPropagation();
        this.selectedMicrophone = option;
        this.isDropdownOpen = false;
        this.render();
    }

    handleClickOutside(event) {
        if (this.isDropdownOpen && !event.target.closest('.dropdown')) {
            this.isDropdownOpen = false;
            this.render();
        }
    }

    render() {
        if (!this.container) return;

        const template = html`
            <div class="content">
                <h1>Welcome to Andromeda!</h1>

                <div class="card">
                    <h2>Latest Used</h2>
                    <p><strong>Today</strong></p>
                    <p>Delete the folder 'Documents/Old Files'</p>
                    <p>Create a new folder named 'Projects' on the desktop</p>
                    <p><strong>Yesterday</strong></p>
                    <p>Start Google Chrome</p>
                    <p><strong>The previous 7 days</strong></p>
                    <p>Terminate the process named 'Spotify'</p>
                    <p>Shut down the PC</p>
                    <p>Increase the volume to 80%</p>
                    <p><strong>The previous 30 days</strong></p>
                    <p>Show my current IP address</p>
                </div>

                <div class="card">
                    <h2>Microphone status</h2>
                    <div class="dropdown" @click=${(e) => this.toggleDropdown(e)}>
                        <span>Microphone</span>
                        <span>${this.selectedMicrophone}</span>
                        <span class="icon">▼</span>
                        ${this.isDropdownOpen ? html`
                            <div class="dropdown-content">
                                ${this.microphoneOptions.map(option => html`
                                    <a href="#" @click=${(e) => this.selectMicrophone(option, e)}>
                                        ${option}
                                    </a>
                                `)}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="card">
                    <h2>Contact us by Problems</h2>
                    <p><strong>E-Mail:</strong> andromeda@gmail.com</p>
                    <p><strong>Telephone:</strong> +43 6603 210701</p>
                    <p>Our Team member Gabriel Pabst is amused to help you!</p>
                </div>
            </div>
        `;

        render(template, this.container);
    }
} 