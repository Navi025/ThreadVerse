import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class RepeatingImageTransition extends LitElement {
  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 400px;
      --transition-duration: 1s;
    }
    .container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .image-strip {
      display: flex;
      width: 400%;
      height: 100%;
      animation: slide 12s linear infinite;
    }
    .image-strip.reverse {
      animation-direction: reverse;
    }
    .image {
      flex: 1 0 25%;
      background-size: cover;
      background-position: center;
      height: 100%;
      will-change: transform;
    }
    @keyframes slide {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-25%);
      }
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
      <div class="container">
        <div class="image-strip">
          ${this.images.map(
            (img) => html`<div class="image" style="background-image: url('${img}')"></div>`
          )}
        </div>
        <div class="image-strip reverse" style="position: absolute; top: 0; left: 0;">
          ${this.images.map(
            (img) => html`<div class="image" style="background-image: url('${img}')"></div>`
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('repeating-image-transition', RepeatingImageTransition);
