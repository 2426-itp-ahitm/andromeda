import { html, TemplateResult } from 'lit-html';

export const UiSection = (title: string, content: TemplateResult) => html`
  <div class="card">
    <h2>${title}</h2>
    <div>${content}</div>
  </div>
`;
