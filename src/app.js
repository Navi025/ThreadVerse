import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import { Router } from './router.js';
import { globalState } from './state.js';
import { watch } from 'https://unpkg.com/lit@2.7.5/directives/watch.js?module';
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
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._onKeyDown);
    this._state = globalState.state;
    this._state.addEventListener('change', () => this.requestUpdate());
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  _onKeyDown(e) {
    if (e.altKey && e.key.toLowerCase() === 'q') {
      globalState.setStyleVersion((this._state.styleVersion % 3) + 1);
    }
  }

  firstUpdated() {
    console.log('Loading route for path:', location.pathname);
    this.router.loadRoute(location.pathname);
  }

  _onHWBuildChange(e) {
    const { height, weight, build } = e.detail;
    globalState.setHeight(height);
    globalState.setWeight(weight);
    globalState.setBuild(build);
  }

  _onClothingChange(e) {
    globalState.setClothing(e.detail.selected);
  }

  _onImageChange(e) {
    globalState.setImageSrc(e.detail.src);
  }

  _onTextChange(e) {
    globalState.setPrintText(e.detail.value);
  }

  render() {
    return html`
      <nav>
        <a @click="${() => this.router.navigate('/')}">Home</a>
      </nav>
      <div id="app-outlet"></div>

      <div class="container" style="margin-top: 24px;">
        <div class="controls">
          <height-weight-build
            @hwbuild-change="${this._onHWBuildChange}"
            .height="${this._state.height}"
            .weight="${this._state.weight}"
            .build="${this._state.build}"
          ></height-weight-build>

          <clothing-menu
            @clothing-change="${this._onClothingChange}"
            .selected="${this._state.clothing}"
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
            src="${this._state.imageSrc}"
            alt="Large preview"
            style="max-width: 100%; border: 1px solid #ccc; margin-bottom: 16px;"
          />
          <threejs-tshirt
            .modelType="${this._state.clothing}"
            .imageSrc="${this._state.imageSrc}"
          ></threejs-tshirt>
          <div style="margin-top: 16px; white-space: pre-wrap; font-family: Arial, sans-serif;">
            ${this._state.printText}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('thread-verse-app', ThreadVerseApp);
