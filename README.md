Here’s a rewritten and **fully updated README** for your `ThreadVerse` project, reflecting the complete scope, features, and current implementation structure, including **Part 1** (image transition SPA) and **Part 2** (3D t-shirt customization with Three.js and Lit):

---

# 🧵 ThreadVerse

**ThreadVerse** is a dynamic Single Page Application (SPA) built using **Lit** that merges aesthetic web transitions with a powerful 3D product customization experience.

This project is divided into two main modules:

* 🔁 **Part 1:** Repeating Image Transition-based Landing Page
* 👕 **Part 2:** Interactive POD T-Shirt Store with Three.js and Image Upload

---

## 🚀 Features

### 🔁 Part 1: Repeating Image Transition (Landing Page)

Inspired by [Tympanus Repeating Image Transition](https://tympanus.net/Development/RepeatingImageTransition/), this landing page is implemented as a Lit web component for seamless integration into an SPA.

* ✅ Built as a Lit Web Component: `<repeating-image-transition>`
* ✅ Smooth image fading with CSS transitions
* ✅ Automatic cycling with `setInterval`
* ✅ Easily customizable image array
* ✅ Modular, reusable, and encapsulated styling
* ✅ Integrated into SPA using custom routing

---

### 👕 Part 2: Customizable POD Store (Three.js + Lit)

A powerful interactive t-shirt customizer with image upload and 3D model manipulation using **Three.js**, integrated as a Lit component.

* 🧩 3D Model Viewer: Renders `.glb` models (t-shirt, hoodie, cap, sleeve)
* 🎨 Real-Time Customization: Apply custom logos or images on 3D apparel
* 💾 Image Upload Support: Users can upload designs to place on the product
* 🔁 Reusable Component: `<threejs-tshirt>` accepts `modelType` and `imageSrc` as attributes
* 🧠 Modular Design: Add more apparel types or interactivity with ease
* 📂 Uses a shared `.glb` asset duplicated for each model type

---

## 🧱 Project Structure

```bash
ThreadVerse/
│
├── index.html                  # SPA entry point
├── src/
│   ├── components/
│   │   ├── thread-verse-app.js         # Main app shell and router
│   │   ├── repeating-image-transition.js  # Landing animation
│   │   └── threejs-tshirt.js          # 3D customizer component
│   ├── router.js               # Client-side routing logic
│   └── utils/
│       └── loadGLBModel.js     # Utility to load GLB models via Three.js
│
├── models/
│   ├── shirt_baked.glb         # Base 3D model duplicated for cap, hoodie, sleeve
│   ├── hoodie.glb
│   ├── cap.glb
│   └── sleeve.glb
│
├── images/
│   └── threadVerse-logo.png    # Logo for favicon and display
│
└── README.md
```

---

## ⚙️ Usage Instructions

### 🖼 Add Your Custom Logo

Put your logo or design inside the `images/` folder and reference it in the component:

```html
<threejs-tshirt 
  imageSrc="./images/your-logo.png" 
  modelType="hoodie">
</threejs-tshirt>
```

Supported `modelType` values:

* `tshirt`
* `hoodie`
* `cap`
* `sleeve`


---

## 📦 Next Steps

* ✅ Improve layout and responsiveness
* ✅ Add drag-n-drop support for logo positioning
* 🚀 Deploy to **Cloudflare Pages**
* 🔧 Add color switcher for apparel (future enhancement)
* 🌈 Enable different materials or textures

---

## 🛠 Tech Stack

* [Lit](https://lit.dev/) – lightweight web components
* [Three.js](https://threejs.org/) – 3D model rendering
* [GLB](https://github.com/KhronosGroup/glTF) – 3D model format
* HTML5, CSS3, JavaScript (ES Modules)

---

## 🙌 Credits

* Image Transition: [Tympanus Codrops](https://tympanus.net)
* 3D Base Model: [`shirt_baked.glb`](https://github.com/Starklord17/threejs-t-shirt)

---

Let me know if you want a version of this with Markdown formatting converted to `.md` or any deployment instructions included!
