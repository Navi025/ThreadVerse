import { reactive } from 'https://unpkg.com/@lit/reactive-element?module';

class GlobalState {
  constructor() {
    this._state = reactive({
      height: 180,
      weight: 80,
      build: 'athletic',
      clothing: 'tshirt',
      imageSrc: '',
      printText: '',
      styleVersion: 1,
    });
  }

  get state() {
    return this._state;
  }

  setHeight(height) {
    this._state.height = height;
  }

  setWeight(weight) {
    this._state.weight = weight;
  }

  setBuild(build) {
    this._state.build = build;
  }

  setClothing(clothing) {
    this._state.clothing = clothing;
  }

  setImageSrc(src) {
    this._state.imageSrc = src;
  }

  setPrintText(text) {
    this._state.printText = text;
  }

  setStyleVersion(version) {
    this._state.styleVersion = version;
  }
}

export const globalState = new GlobalState();
