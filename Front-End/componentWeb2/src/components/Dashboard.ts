import { html, render } from 'lit-html';
import { StatisticService } from '../services/StatisticService';
import { Statistics } from '../interfaces/Statistics';

class Dashboard extends HTMLElement {
  container: HTMLElement | null = null;
  private selectedMicrophone: string = 'Default Microphone';
  private availableMicrophones: MediaDeviceInfo[] = [];
  private statistics: Statistics | null = null;
  private recentCommands: any[] = [];
  private statisticService: StatisticService = StatisticService.getInstance();

  async connectedCallback(): Promise<void> {
    this.container = document.createElement('div');
    this.appendChild(this.container); // Append the container to the component
    await this.fetchStatistics();
    this.setupDropdownListener();
    this.render();

    // Refresh statistics every 30 seconds
    setInterval(() => this.fetchStatistics(), 30000);
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

  private async fetchStatistics(): Promise<void> {
    try {
      this.statistics = await this.statisticService.getStatistics();
      if (this.statistics) {
        this.recentCommands = this.statistics.latestCommandsExecuted.slice(0,4) || [];
      }
      this.render();
    } catch (error) {
      console.error('Error fetching statistics:', error);
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
              <div class="stat-label">Server Uptime</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-info">
              <div class="stat-value">${this.statistics?.responseTime || '0'}ms</div>
              <div class="stat-label">Response Time</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
              <div class="stat-value">${this.recentCommands.length || 0}</div>
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
                </div>
              </div>
            </div>
          </div>

          <div class="card recent-commands">
            <h2>Recent Commands</h2>
            <div class="command-list">
              ${this.recentCommands.map(command => html`
                <div class="command-item">
                  <span class="command-text">${command.name}</span>
                  <span class="command-time">${command.timestamp}</span>
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
                <span>andromeda@gmail.com</span>
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