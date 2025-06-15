import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const SelectSection = () => UiSection('Auswahlmenü', html`
  <div class="setting-item">
    <label>Einfache Auswahl:</label>
    <select class="setting-value">
      <option value="">Bitte wählen</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
  </div>
  <div class="setting-item">
    <label>Mehrfachauswahl:</label>
    <select multiple class="setting-value">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4">Option 4</option>
    </select>
  </div>
`);
