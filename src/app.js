import { LitElement, html, css } from 'lit';
import { Router } from './router.js';
import { globalState } from './state.js';
import './components/repeating-image-transition.js';
import './components/height-weight-build.js';
import './components/clothing-menu.js';
import './components/image-uploader.js';
import './components/text-input.js';
import './components/threejs-tshirt.js';
import './components/customizer-page.js';

export class ThreadVerseApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 16px;
      background-color: var(--background-color, white);
      color: var(--text-color, black);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    nav a {
      margin-right: 16px;
      cursor: pointer;
      text-decoration: underline;
      color: var(--link-color, blue);
    }
  `;

  static get stylesByVersion() {
    return {
      1: {
        '--background-color': 'white',
        '--text-color': 'black',
        '--link-color': 'blue',
        '--primary-color': '#007bff',
        '--secondary-color': '#6c757d',
      },
      2: {
        '--background-color': '#1e1e2f',
        '--text-color': '#f0f0f0',
        '--link-color': '#61dafb',
        '--primary-color': '#61dafb',
        '--secondary-color': '#282c34',
      },
      3: {
        '--background-color': '#fdf6e3',
        '--text-color': '#657b83',
        '--link-color': '#b58900',
        '--primary-color': '#b58900',
        '--secondary-color': '#eee8d5',
      },
    };
  }
  
  constructor() {
    super();
    this.router = new Router([
      { path: '/', component: customElements.get('repeating-image-transition') },
      { path: '/customizer', component: customElements.get('customizer-page') },
    ]);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._state = globalState.state;
  }

  updated(changedProps) {
    if (changedProps.has('_state')) {
      this._applyTheme();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._onKeyDown);
    this._state.addEventListener('change', () => this.requestUpdate());
    this.router.loadRoute(location.pathname);
    this._applyTheme();
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  _applyTheme() {
    const styles = ThreadVerseApp.stylesByVersion[this._state.styleVersion] || ThreadVerseApp.stylesByVersion[1];
    for (const [key, value] of Object.entries(styles)) {
      this.style.setProperty(key, value);
    }
  }

  _onKeyDown(e) {
    if (e.altKey && e.key.toLowerCase() === 'q') {
      globalState.setStyleVersion((this._state.styleVersion % 3) + 1);
    }
  }

  render() {
    return html`
      <nav>
        <a @click="${() => this.router.navigate('/')}">Home</a>
        <a @click="${() => this.router.navigate('/customizer')}">Customizer</a>
      </nav>
      <div id="app-outlet"></div>
    `;
  }
}

customElements.define('thread-verse-app', ThreadVerseApp);
