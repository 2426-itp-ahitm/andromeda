import { html } from 'lit-html';
import { UiSection } from './UiSection';

export const ButtonsSection = () => UiSection('Buttons', html`
  <div class="setting-item">
    <button class="primary">Primär Button</button>
    <button class="secondary">Sekundär Button</button>
    <button class="success">Basic Button</button>
  </div>
`);
