import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class HeightWeightBuild extends LitElement {
  static styles = css`
    .container {
      display: flex;
      gap: 12px;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    label {
      font-weight: bold;
      margin-right: 4px;
    }
    select, input[type="number"] {
      padding: 4px 8px;
      font-size: 1rem;
    }
  `;

  static properties = {
    height: { type: Number },
    weight: { type: Number },
    build: { type: String },
  };

  constructor() {
    super();
    this.height = 180; // cm
    this.weight = 80;  // kg
    this.build = 'athletic';
  }

  _onHeightChange(e) {
    this.height = Number(e.target.value);
    this._dispatchChange();
  }

  _onWeightChange(e) {
    this.weight = Number(e.target.value);
    this._dispatchChange();
  }

  _onBuildChange(e) {
    this.build = e.target.value;
    this._dispatchChange();
  }

  _dispatchChange() {
    this.dispatchEvent(new CustomEvent('hwbuild-change', {
      detail: {
        height: this.height,
        weight: this.weight,
        build: this.build,
      },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="container">
        <label for="height">Height (cm):</label>
        <input id="height" type="number" min="100" max="250" .value="${this.height}" @input="${this._onHeightChange}" />
        <label for="weight">Weight (kg):</label>
        <input id="weight" type="number" min="30" max="200" .value="${this.weight}" @input="${this._onWeightChange}" />
        <label for="build">Build:</label>
        <select id="build" @change="${this._onBuildChange}">
          <option value="lean" ?selected=${this.build === 'lean'}>Lean</option>
          <option value="regular" ?selected=${this.build === 'regular'}>Regular</option>
          <option value="athletic" ?selected=${this.build === 'athletic'}>Athletic</option>
          <option value="big" ?selected=${this.build === 'big'}>Big</option>
        </select>
      </div>
    `;
  }
}

customElements.define('height-weight-build', HeightWeightBuild);