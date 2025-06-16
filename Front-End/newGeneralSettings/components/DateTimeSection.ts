import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const DateTimeSection = () => UiSection('Datum und Zeit', html`
  <div class="setting-item">
    <label>Datum:</label>
    <input type="date" class="setting-value" />
  </div>
  <div class="setting-item">
    <label>Zeit:</label>
    <input type="time" class="setting-value" />
  </div>
  <div class="setting-item">
    <label>Datum und Zeit:</label>
    <input type="datetime-local" class="setting-value" />
  </div>
`);
