import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

export class ThreejsTshirt extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 400px;
      border: 1px solid #ccc;
      position: relative;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  static properties = {
    modelType: { type: String },
    imageSrc: { type: String },
  };

  constructor() {
    super();
    this.modelType = 'tshirt';
    this.imageSrc = '';
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._model = null;
    this._loader = new GLTFLoader();
    this._animationId = null;
    this._texture = null;
    this._resizeObserver = null;
  }

  firstUpdated() {
    this._initThree();
    this._loadModel(this.modelType);
    this._setupResizeObserver();
  }

  updated(changedProps) {
    if (changedProps.has('modelType')) {
      this._loadModel(this.modelType);
    }
    if (changedProps.has('imageSrc')) {
      this._updateTexture(this.imageSrc);
    }
  }

  _initThree() {
    const width = this.clientWidth;
    const height = this.clientHeight;

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this._camera.position.set(0, 1.5, 3);

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(width, height);
    this.shadowRoot.appendChild(this._renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    this._scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 20, 10);
    this._scene.add(directionalLight);

    this._animate();
  }

  _animate() {
    this._animationId = requestAnimationFrame(() => this._animate());
    if (this._model) {
      this._model.rotation.y += 0.01;
    }
    this._renderer.render(this._scene, this._camera);
  }

  _loadModel(type) {
    if (this._model) {
      this._scene.remove(this._model);
      this._model.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
      this._model = null;
    }

    let modelUrl = '';
    switch (type) {
      case 'hoodie':
        modelUrl = './models/hoodie.glb';
        break;
      case 'cap':
        modelUrl = './models/cap.glb';
        break;
      case 'sleevie':
        modelUrl = './models/sleevie.glb';
        break;
      case 'tshirt':
      default:
        modelUrl = './models/tshirt.glb';
        break;
    }

    this._loader.load(
      modelUrl,
      (gltf) => {
        this._model = gltf.scene;
        this._scene.add(this._model);
        this._updateTexture(this.imageSrc);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  _updateTexture(imageSrc) {
    if (!this._model) return;
    if (this._texture) {
      this._texture.dispose();
      this._texture = null;
    }
    if (!imageSrc) return;

    const loader = new THREE.TextureLoader();
    loader.load(
      imageSrc,
      (texture) => {
        this._texture = texture;
        this._model.traverse((child) => {
          if (child.isMesh) {
            child.material.map = this._texture;
            child.material.needsUpdate = true;
          }
        });
        this.dispatchEvent(new CustomEvent('image-loaded', { bubbles: true, composed: true }));
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  }

  _setupResizeObserver() {
    this._resizeObserver = new ResizeObserver(() => {
      const width = this.clientWidth;
      const height = this.clientHeight;
      this._renderer.setSize(width, height);
      this._camera.aspect = width / height;
      this._camera.updateProjectionMatrix();
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    if (this._renderer) {
      this._renderer.dispose();
    }
  }

  render() {
    return html``;
  }
}

customElements.define('threejs-tshirt', ThreejsTshirt);
</create_file>
