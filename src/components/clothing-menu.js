import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class ClothingMenu extends LitElement {
  static styles = css`
    /* styles here */
  `;

  static properties = {
    selected: { type: String },
  };

  constructor() {
    super();
    this.selected = 'tshirt';
  }

  _onSelect(e) {
    this.selected = e.target.value;
    this.dispatchEvent(new CustomEvent('clothing-change', {
      detail: { selected: this.selected },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <label for="clothing">Clothing:</label>
      <select id="clothing" @change="${this._onSelect}">
        <option value="tshirt" ?selected=${this.selected === 'tshirt'}>T-Shirt</option>
        <option value="hoodie" ?selected=${this.selected === 'hoodie'}>Hoodie</option>
        <option value="sleevie" ?selected=${this.selected === 'sleevie'}>Sleevie</option>
        <option value="cap" ?selected=${this.selected === 'cap'}>Cap</option>
      </select>
    `;
  }
}

customElements.define('clothing-menu', ClothingMenu);
