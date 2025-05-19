import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import { Router } from './router.js';
import './components/repeating-image-transition.js';
import './components/height-weight-build.js';
import './components/clothing-menu.js';
import './components/image-uploader.js';
import './components/text-input.js';
import './components/threejs-tshirt.js';

export class ThreadVerseApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 16px;
    }
    nav a {
      margin-right: 16px;
      cursor: pointer;
      text-decoration: underline;
      color: blue;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }
    .controls {
      flex: 1 1 300px;
      max-width: 400px;
    }
    .preview {
      flex: 1 1 300px;
      max-width: 400px;
    }
  `;

  constructor() {
    super();
    this.router = new Router([
      { path: '/', component: customElements.get('repeating-image-transition') },
      // Future routes can be added here
    ]);
    this.height = 180;
    this.weight = 80;
    this.build = 'athletic';
    this.clothing = 'tshirt';
    this.imageSrc = '';
    this.printText = '';
    this.styleVersion = 1;
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  _onKeyDown(e) {
    if (e.altKey && e.key.toLowerCase() === 'q') {
      this.styleVersion = (this.styleVersion % 3) + 1;
    }
  }

  firstUpdated() {
    this.router.loadRoute(location.pathname);
  }

  _onHWBuildChange(e) {
    const { height, weight, build } = e.detail;
    this.height = height;
    this.weight = weight;
    this.build = build;
  }

  _onClothingChange(e) {
    this.clothing = e.detail.selected;
  }

  _onImageChange(e) {
    this.imageSrc = e.detail.src;
  }

  _onTextChange(e) {
    this.printText = e.detail.value;
  }

  render() {
    return html`
      <nav>
        <a @click="${() => this.router.navigate('/')}">Home</a>
      </nav>
      <div id="app-outlet">
        <div style="color: red; font-weight: bold;">Test: Router outlet content</div>
      </div>

      <div class="container" style="margin-top: 24px;">
        <div class="controls">
          <height-weight-build
            @hwbuild-change="${this._onHWBuildChange}"
            .height="${this.height}"
            .weight="${this.weight}"
            .build="${this.build}"
          ></height-weight-build>

          <clothing-menu
            @clothing-change="${this._onClothingChange}"
            .selected="${this.clothing}"
          ></clothing-menu>

          <image-uploader
            @image-change="${this._onImageChange}"
          ></image-uploader>

          <text-input
            @text-change="${this._onTextChange}"
          ></text-input>
        </div>

        <div class="preview">
          <img
            src="${this.imageSrc}"
            alt="Large preview"
            style="max-width: 100%; border: 1px solid #ccc; margin-bottom: 16px;"
          />
          <threejs-tshirt
            .modelType="${this.clothing}"
            .imageSrc="${this.imageSrc}"
          ></threejs-tshirt>
          <div style="margin-top: 16px; white-space: pre-wrap; font-family: Arial, sans-serif;">
            ${this.printText}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('thread-verse-app', ThreadVerseApp);
