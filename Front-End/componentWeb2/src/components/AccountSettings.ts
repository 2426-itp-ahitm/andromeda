import { html, render } from 'lit-html';
import '../styles/account-settings.css';

/**
 * AccountSettings-Komponente für die Verwaltung von Benutzer- und Systemeinstellungen
 */
class AccountSettings extends HTMLElement {
  // Account-bezogene Properties
  private email: string = 'user@example.com';
  private password: string = '';
  private twoFactorEnabled: boolean = false;

  // Screenshot-bezogene Properties
  private screenshotEnabled: boolean = false;
  private autoDeleteDays: number = 30;
  private screenshotLocation: string = '';

  // System- und Benutzeroberflächen-Properties
  private startMinimized: boolean = false;
  private autostart: boolean = false;
  private allowExternalAPI: boolean = false;
  private offlineOnly: boolean = false;

  // Audio- und Sprach-Properties
  private ttsEnabled: boolean = false;
  private commandSoundEnabled: boolean = false;
  private timeoutEnabled: boolean = false;
  private hotwordEnabled: boolean = true;
  private customHotword: string = '';
  private storeVoiceData: boolean = false;

  /**
   * Lifecycle-Hook: Wird aufgerufen, wenn das Element in das DOM eingefügt wird
   */
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  /**
   * Initialisiert alle Event-Listener für die Komponente
   */
  private setupEventListeners() {
    // Allgemeine Input-Listener
    this.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('change', () => this.handleInputChange());
    });

    // Spezifische Event-Listener
    this.setupAccountEventListeners();
  }

  /**
   * Initialisiert die Account-spezifischen Event-Listener
   */
  private setupAccountEventListeners() {
    this.querySelector('#email')?.addEventListener('input', (e) => {
      this.email = (e.target as HTMLInputElement).value;
    });

    this.querySelector('#password')?.addEventListener('input', (e) => {
      this.password = (e.target as HTMLInputElement).value;
    });

    this.querySelector('#2fa-toggle')?.addEventListener('change', (e) => {
      this.twoFactorEnabled = (e.target as HTMLInputElement).checked;
      this.render();
    });

    this.querySelector('#logout-btn')?.addEventListener('click', () => {
      alert('Logging out...');
    });

    this.querySelector('#delete-btn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
        alert('Account deleted');
      }
    });
  }

  /**
   * Verarbeitet Änderungen an den Eingabefeldern
   */
  private handleInputChange() {
    const getVal = (id: string) => (this.querySelector(`#${id}`) as HTMLInputElement);

    // Screenshot-Einstellungen
    this.screenshotEnabled = getVal('screenshotEnabled').checked;
    this.autoDeleteDays = Number(getVal('autoDeleteDays').value);
    this.screenshotLocation = getVal('screenshotLocation').value;

    // System-Einstellungen
    this.startMinimized = getVal('startMinimized').checked;
    this.autostart = getVal('autostart').checked;
    this.allowExternalAPI = getVal('allowExternalAPI').checked;
    this.offlineOnly = getVal('offlineOnly').checked;

    // Audio- und Sprach-Einstellungen
    this.commandSoundEnabled = getVal('commandSoundEnabled').checked;
    this.ttsEnabled = getVal('ttsEnabled').checked;
    this.timeoutEnabled = getVal('timeoutEnabled').checked;
    this.hotwordEnabled = getVal('hotwordEnabled').checked;
    this.customHotword = getVal('customHotword')?.value || '';
    this.storeVoiceData = getVal('storeVoiceData').checked;
  }

  /**
   * Rendert die Komponente
   */
  private render() {
    const template = html`
      <div class="account-settings">
        <h1>Account Settings</h1>

        <div class="setting-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" .value=${this.email}>
        </div>

        <div class="setting-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter new password">
        </div>

        <div class="setting-group">
          <label for="2fa-toggle">Two-Factor Authentication</label>
          <div class="toggle-switch">
            <input type="checkbox" id="2fa-toggle" ?checked=${this.twoFactorEnabled}>
            <span class="toggle-slider"></span>
          </div>
          <p class="info">${this.twoFactorEnabled ? '2FA is enabled' : '2FA is disabled'}</p>
        </div>

        <div class="actions">
          <button id="logout-btn">Log Out</button>
          <button id="delete-btn" class="danger">Delete Account</button>
        </div>

        <h1>System & Privacy Settings</h1>

        <section>
          <h2>📁 Screenshot-Verwaltung</h2>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="screenshotEnabled" ?checked=${this.screenshotEnabled}>
              Auto-Screenshot aktivieren
            </label>
          </div>
          <div class="setting-group">
            <label for="screenshotLocation">Speicherort</label>
            <input type="text" id="screenshotLocation" value=${this.screenshotLocation}>
          </div>
          <div class="setting-group">
            <label for="autoDeleteDays">Auto-Löschen nach Tagen</label>
            <input type="number" id="autoDeleteDays" value=${this.autoDeleteDays}>
          </div>
        </section>

        <section>
          <h2>🧩 Systemintegration</h2>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="autostart" ?checked=${this.autostart}>
              Autostart aktivieren
            </label>
          </div>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="startMinimized" ?checked=${this.startMinimized}>
              Minimiert starten
            </label>
          </div>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="allowExternalAPI" ?checked=${this.allowExternalAPI}>
              Externe API-Zugriffe erlauben
            </label>
          </div>
        </section>

        <section>
          <h2>📣 Akustisches Feedback</h2>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="commandSoundEnabled" ?checked=${this.commandSoundEnabled}>
              Sound bei erfolgreichem Befehl
            </label>
          </div>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="ttsEnabled" ?checked=${this.ttsEnabled}>
              Text-to-Speech aktivieren
            </label>
          </div>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="timeoutEnabled" ?checked=${this.timeoutEnabled}>
              Timeout bei Nicht-Erkennung
            </label>
          </div>
        </section>

        <section>
          <h2>🔐 Datenschutz & Erkennung</h2>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="offlineOnly" ?checked=${this.offlineOnly}>
              Lokale/offline Erkennung erzwingen
            </label>
          </div>
          <div class="setting-group">
            <label>
              <input type="checkbox" id="hotwordEnabled" ?checked=${this.hotwordEnabled}>
              Hotword "Andromeda" aktivieren
            </label>
          </div>
          ${!this.hotwordEnabled ? html`
            <div class="setting-group">
              <label for="customHotword">Benutzerdefiniertes Hotword</label>
              <input type="text" id="customHotword" value=${this.customHotword}>
            </div>
          ` : ''}
          <div class="setting-group">
            <label>
              <input type="checkbox" id="storeVoiceData" ?checked=${this.storeVoiceData}>
              Sprachdaten speichern
            </label>
          </div>
        </section>
      </div>
    `;

    render(template, this);
  }
}

customElements.define('system-settings', AccountSettings);
