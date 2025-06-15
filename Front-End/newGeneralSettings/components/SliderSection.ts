import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const SliderSection = () => UiSection('Slider', html`
  <div class="setting-item">
    <label>Wert 1:</label>
    <input type="range" min="0" max="100" value="50" class="setting-value" />
  </div>
  <div class="setting-item">
    <label>Wert 2:</label>
    <input type="range" min="0" max="100" value="75" class="setting-value" />
  </div>
`);
