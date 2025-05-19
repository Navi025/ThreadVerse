import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class ImageUploader extends LitElement {
  static styles = css`
    .uploader {
      border: 2px dashed #ccc;
      padding: 16px;
      text-align: center;
      cursor: pointer;
      font-family: Arial, sans-serif;
      color: #666;
      user-select: none;
    }
    .uploader.dragover {
      border-color: #333;
      color: #333;
    }
    input[type="file"] {
      display: none;
    }
    img.preview {
      max-width: 100%;
      max-height: 200px;
      margin-top: 12px;
      border: 1px solid #ccc;
    }
  `;

  static properties = {
    imageSrc: { type: String },
  };

  constructor() {
    super();
    this.imageSrc = '';
  }

  _onFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      this._loadFile(file);
    }
  }

  _onDrop(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
      this._loadFile(file);
    }
  }

  _onDragOver(e) {
    e.preventDefault();
    this.classList.add('dragover');
  }

  _onDragLeave(e) {
    e.preventDefault();
    this.classList.remove('dragover');
  }

  _loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
      this.dispatchEvent(new CustomEvent('image-change', {
        detail: { src: this.imageSrc },
        bubbles: true,
        composed: true,
      }));
    };
    reader.readAsDataURL(file);
  }

  render() {
    return html`
      <div
        class="uploader"
        @drop="${this._onDrop}"
        @dragover="${this._onDragOver}"
        @dragleave="${this._onDragLeave}"
        @click="${() => this.shadowRoot.getElementById('fileInput').click()}"
      >
        <p>Click or drag and drop an image to upload</p>
        <input id="fileInput" type="file" accept="image/*" @change="${this._onFileChange}" />
        ${this.imageSrc ? html`<img class="preview" src="${this.imageSrc}" alt="Uploaded Image Preview" />` : ''}
      </div>
    `;
  }
}

customElements.define('image-uploader', ImageUploader);
