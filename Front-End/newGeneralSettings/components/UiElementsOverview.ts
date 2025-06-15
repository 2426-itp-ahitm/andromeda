console.log('UiElementsOverview module loaded');

import { html, render } from 'lit-html';
import { ButtonsSection } from './ButtonsSection.js';
import { InputFields } from './InputFields.js';

export class UiElementsOverview extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    render(html`
      <h1>UI Elemente Übersicht</h1>
      ${ButtonsSection()}
      ${InputFields()}
    `, this);
  }
}

customElements.define('app-ui-elements-overview', UiElementsOverview);

