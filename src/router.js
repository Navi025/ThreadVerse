export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('popstate', () => {
      this.loadRoute(location.pathname);
    });
    window.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.href && anchor.origin === location.origin) {
        e.preventDefault();
        this.navigate(new URL(anchor.href).pathname);
      }
    });
  }

  loadRoute(path) {
    const route = this.routes.find(r => r.path === path);
    if (route && route.component) {
      const outlet = document.getElementById('app-outlet');
      if (outlet) {
        outlet.innerHTML = '';
        outlet.appendChild(new route.component());
      }
    } else {
      // Fallback: load first route or show 404
      const outlet = document.getElementById('app-outlet');
      if (outlet) {
        outlet.innerHTML = '<p>Page not found</p>';
      }
    }
  }

  navigate(path) {
    history.pushState({}, '', path);
    this.loadRoute(path);
  }
}
