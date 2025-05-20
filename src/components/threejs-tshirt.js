import { LitElement, html, css } from 'lit';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ThreejsTshirt extends LitElement {
  static properties = {
    modelType: { type: String },
    imageSrc: { type: String },
    text: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 500px;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  constructor() {
    super();
    this.modelType = 'tshirt';
    this.imageSrc = '';
    this.text = '';
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._model = null;
    this._textureCanvas = null;
  }

  firstUpdated() {
    this._initThree();
    this._loadModel(this.modelType);
    this._animate();
  }

  updated(changedProps) {
    if (changedProps.has('modelType')) {
      this._loadModel(this.modelType);
    }
    if (changedProps.has('imageSrc') || changedProps.has('text')) {
      this._updateTexture(this.imageSrc, this.text);
    }
  }

  _initThree() {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0xffffff);

    const width = this.offsetWidth;
    const height = this.offsetHeight;

    this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this._camera.position.z = 2;

    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(width, height);
    this.shadowRoot.appendChild(this._renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    this._scene.add(light);
  }

  _loadModel(modelType) {
    const loader = new GLTFLoader();
    const modelPath = `/models/${modelType}.glb`;

    loader.load(modelPath, (gltf) => {
      if (this._model) {
        this._scene.remove(this._model);
      }
      this._model = gltf.scene;
      this._scene.add(this._model);
      this._updateTexture(this.imageSrc, this.text);
    }, undefined, (error) => {
      console.error(`Error loading model ${modelPath}:`, error);
    });
  }

  _updateTexture(imageSrc, text) {
    if (!this._model) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const applyTexture = () => {
      if (text) {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      }

      const texture = new THREE.CanvasTexture(canvas);

      this._model.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    };

    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        applyTexture();
      };
      img.onerror = () => {
        console.error('Image failed to load:', imageSrc);
        applyTexture();
      };
      img.src = imageSrc;
    } else {
      applyTexture();
    }
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    if (this._model) {
      this._model.rotation.y += 0.01;
    }
    this._renderer.render(this._scene, this._camera);
  }

  render() {
    return html``;
  }
}

customElements.define('threejs-tshirt', ThreejsTshirt);