import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import './height-weight-build.js';
import './clothing-menu.js';
import './image-uploader.js';
import './text-input.js';
import './threejs-tshirt.js';
import { globalState } from '../state.js';

export class CustomizerPage extends LitElement {
  static styles = css`
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
    this._state = globalState.state;
    this._onHWBuildChange = this._onHWBuildChange.bind(this);
    this._onClothingChange = this._onClothingChange.bind(this);
    this._onImageChange = this._onImageChange.bind(this);
    this._onTextChange = this._onTextChange.bind(this);
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
      <div class="container">
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
            .text="${this._state.printText}"
          ></threejs-tshirt>
          <div style="margin-top: 16px; white-space: pre-wrap; font-family: Arial, sans-serif;">
            ${this._state.printText}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('customizer-page', CustomizerPage);
