import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class RepeatingImageTransition extends LitElement {
  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 400px;
    }
    .image-container {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transition: opacity 1s ease-in-out;
      opacity: 0;
    }
    .image-container.active {
      opacity: 1;
      z-index: 1;
    }
  `;

  static properties = {
    images: { type: Array },
    currentIndex: { type: Number },
  };

  constructor() {
    super();
    this.images = [
      'https://tympanus.net/Development/RepeatingImageTransition/img/1.jpg',
      'https://tympanus.net/Development/RepeatingImageTransition/img/2.jpg',
      'https://tympanus.net/Development/RepeatingImageTransition/img/3.jpg',
      'https://tympanus.net/Development/RepeatingImageTransition/img/4.jpg',
    ];
    this.currentIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._interval = setInterval(() => this._nextImage(), 3000);
  }

  disconnectedCallback() {
    clearInterval(this._interval);
    super.disconnectedCallback();
  }

  _nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  render() {
    return html`
      ${this.images.map(
        (img, index) => html`
          <div
            class="image-container ${index === this.currentIndex ? 'active' : ''}"
            style="background-image: url('${img}')"
          ></div>
        `
      )}
    `;
  }
}

customElements.define('repeating-image-transition', RepeatingImageTransition);
