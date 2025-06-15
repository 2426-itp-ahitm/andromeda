import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const ToggleSection = () => UiSection('Toggle Switches', html`
  <div class="setting-item">
    <label>Toggle 1</label>
    <label class="toggle-switch">
      <input type="checkbox" />
      <span class="toggle-slider"></span>
    </label>
  </div>
  <div class="setting-item">
    <label>Toggle 2</label>
    <label class="toggle-switch">
      <input type="checkbox" checked />
      <span class="toggle-slider"></span>
    </label>
  </div>
`);
