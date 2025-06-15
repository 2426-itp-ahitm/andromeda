import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const CheckboxSection = () => UiSection('Checkboxen', html`
  <div class="setting-item">
    <label>Option A</label>
    <input type="checkbox" value="1" class="command-checkbox" />
  </div>
  <div class="setting-item">
    <label>Option B</label>
    <input type="checkbox" value="2" class="command-checkbox" />
  </div>
  <div class="setting-item">
    <label>Option C</label>
    <input type="checkbox" value="3" class="command-checkbox" />
  </div>
`);
