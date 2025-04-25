import { html, render } from 'lit-html';

class Dashboard extends HTMLElement {
  container: HTMLElement | null = null;
  private selectedMicrophone: string = 'THC-GamingSensoricMicro';
  private recentCommands: string[] = [
    'Open Chrome browser',
    'Create new folder on Desktop',
    'Check system status',
    'Update applications'
  ];

  connectedCallback(): void {
    this.container = document.createElement('div');
    this.appendChild(this.container); // Append the container to the component
    this.setupDropdownListener();
    this.render();
  }

  private setupDropdownListener(): void {
    setTimeout(() => {
      const dropdown = this.container?.querySelector('.dropdown');
      if (!dropdown) return;

      dropdown.addEventListener('click', () => this.toggleDropdown());
    }, 0);
  }

  private toggleDropdown(): void {
    const dropdown = this.container?.querySelector('.dropdown');
    const content = dropdown?.querySelector('.dropdown-content') as HTMLElement;
    if (content) {
      content.style.display = content.style.display === 'flex' ? 'none' : 'flex';
    }
  }

  private handleMicrophoneSelect(mic: string): void {
    this.selectedMicrophone = mic;
    this.toggleDropdown();
    this.render();
  }

  render(): void {
    if (!this.container) return;

    const template = html`
      <div class="dashboard">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
              <div class="stat-value">98%</div>
              <div class="stat-label">Detection Accuracy</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-info">
              <div class="stat-value">2.3s</div>
              <div class="stat-label">Response Time</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
              <div class="stat-value">1,234</div>
              <div class="stat-label">Commands Executed</div>
            </div>
          </div>
        </div>

        <div class="dashboard-sections">
          <div class="card microphone-section">
            <h2>Microphone Status</h2>
            <div class="microphone-settings">
              <div class="setting-item">
                <label class="dropdown-label">Input Device</label>
                <div class="dropdown">
                  <span>${this.selectedMicrophone}</span>
                  <span>▼</span>
                  <div class="dropdown-content">
                    <a @click=${() => this.handleMicrophoneSelect('THC-GamingSensoricMicro')}>THC-GamingSensoricMicro</a>
                    <a @click=${() => this.handleMicrophoneSelect('USB-Microphone')}>USB-Microphone</a>
                    <a @click=${() => this.handleMicrophoneSelect('Bluetooth-Microphone')}>Bluetooth-Microphone</a>
                  </div>
                </div>
              </div>
              <div class="setting-item">
                <label>Microphone Sensitivity</label>
                <input type="range" min="0" max="100" value="75">
              </div>
              <div class="setting-item">
                <label>Noise Cancellation</label>
                <div class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="card recent-commands">
            <h2>Recent Commands</h2>
            <div class="command-list">
              ${this.recentCommands.map(command => html`
                <div class="command-item">
                  <span class="command-text">${command}</span>
                  <span class="command-time">2 min ago</span>
                </div>
              `)}
            </div>
          </div>

          <div class="card contact-section">
            <h2>Contact Support</h2>
            <p>Having issues? Our support team is here to help!</p>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>support@andromeda.ai</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">💬</span>
                <span>Live Chat Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    render(template, this.container); // Render the template into the container
  }
}

customElements.define('app-dashboard', Dashboard);