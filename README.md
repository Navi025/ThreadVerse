# ThreadVerse

## Part 1: Lit SPA with Repeating Image Transition

This project converts the repeating image transition effect from [Tympanus Repeating Image Transition](https://tympanus.net/Development/RepeatingImageTransition/) into a Single Page Application (SPA) using Lit web components.

### Implementation Details

- The repeating image transition effect is encapsulated in a Lit web component `repeating-image-transition`.
- The component manages its own state with reactive properties (`images` and `currentIndex`).
- The image transition is handled with a timer (`setInterval`) that updates the `currentIndex` to cycle through images.
- CSS transitions are used for smooth fade effects between images.

### State Management

- State is managed locally within Lit components using reactive properties.
- The main app component (`thread-verse-app`) manages routing state via a simple Router class.
- The Router listens to browser history changes and updates the displayed component accordingly.

### Routing

- A simple client-side router is implemented in `src/router.js`.
- Routes are defined as path-component mappings.
- Navigation updates the browser history and loads the corresponding component into the app outlet.
- The router listens to `popstate` events to handle back/forward navigation.

## Next Steps

- Proceed to Part 2: Build the customizable POD t-shirt store UI with Lit components, 3D integration, and image upload features.
- Implement style version switching and deployment on Cloudflare.
