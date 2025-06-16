import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const RadioSection = () => UiSection('Radio Buttons', html`
  <div class="setting-item">
    <label>Option 1</label>
    <input type="radio" name="option" value="1" class="command-checkbox" />
  </div>
  <div class="setting-item">
    <label>Option 2</label>
    <input type="radio" name="option" value="2" class="command-checkbox" />
  </div>
  <div class="setting-item">
    <label>Option 3</label>
    <input type="radio" name="option" value="3" class="command-checkbox" />
  </div>
`);
