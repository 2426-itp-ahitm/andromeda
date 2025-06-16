import { html } from 'lit-html';
import { UiSection } from './UiSection';

const input = (label: string, type: string) => html`
  <div class="setting-item">
    <label>${label}</label>
    <!--<input type="${type}" placeholder="${label}" class="setting-value" />-->
    <input .type=${type} placeholder=${label} class="setting-value" />
  </div>
`;

export const InputFields = () => UiSection('Eingabefelder', html`
  ${input('Text Eingabe:', 'text')}
  ${input('Zahlen Eingabe:', 'number')}
  ${input('E-Mail Eingabe:', 'email')}
  ${input('Passwort:', 'password')}
  ${input('Telefon:', 'tel')}
  ${input('URL:', 'url')}
`);
