import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class TextInput extends LitElement {
  static styles = css`
    textarea {
      width: 100%;
      height: 80px;
      font-size: 1rem;
      padding: 8px;
      font-family: Arial, sans-serif;
      resize: none;
      box-sizing: border-box;
    }
  `;

  static properties = {
    value: { type: String },
  };

  constructor() {
    super();
    this.value = '';
  }

  _onInput(e) {
    const val = e.target.value;
    if (val.split('\n').length <= 3) {
      this.value = val;
      this.dispatchEvent(new CustomEvent('text-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }));
    } else {
      // Limit to 3 lines
      e.target.value = this.value;
    }
  }

  render() {
    return html`
      <textarea
        placeholder="Type text to print on the t-shirt (max 3 lines)"
        .value="${this.value}"
        @input="${this._onInput}"
      ></textarea>
    `;
  }
}

customElements.define('text-input', TextInput);
