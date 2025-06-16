import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const TextareaSection = () => UiSection('Textbereich', html`
  <div class="setting-item">
    <label>Mehrzeiliger Text:</label>
    <textarea class="setting-value" placeholder="Geben Sie hier Ihren Text ein..."></textarea>
  </div>
`);
