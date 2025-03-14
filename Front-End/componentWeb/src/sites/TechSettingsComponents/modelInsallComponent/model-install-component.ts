import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("model-install-component")
export class ModelInstallComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
        <link rel="stylesheet" href="/techSettings/techSettings.css">
        <link rel="stylesheet" href="/styles/style.css">
        <h2>Install Models</h2>
        <select>
            <option>Select:</option>
        </select>
        <table>
            <tr>
                <td>
                    <div class="card">Model1<br>
                        <pre>18 GB            80%</pre>
                        <div class="card-actions">
                            <button class="download_button">Download</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="card">Model2<br>
                        <pre>25 GB            40%</pre>
                        <div class="card-actions">
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div class="card">Model3<br>
                        <pre>28 GB            60%</pre>
                        <div class="card-actions">
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="card">Model4<br>
                        <pre>32 GB            25%</pre>
                        <div class="card-actions">
                            <button class="download_button">Download</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="card">Model5<br>
                        <pre>14 GB            10%</pre>
                        <div class="card-actions">
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="card">Model6<br>
                        <pre>8 GB            30%</pre>
                        <div class="card-actions">
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="card">Model7<br>
                        <pre>56 GB            85%</pre>
                        <div class="card-actions">
                            <button class="download_button">Download</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="card">Model8<br>
                        <pre>39 GB            90%</pre>
                        <div class="card-actions">
                            <button class="download_button">Download</button>
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <br>
        <div id="loadMore_button"><button class="button">Load More</button></div>



        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "model-install-component": ModelInstallComponent;
    }
}
