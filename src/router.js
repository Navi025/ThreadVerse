export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('popstate', () => {
      this.loadRoute(location.pathname);
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
    }
  }

  navigate(path) {
    history.pushState({}, '', path);
    this.loadRoute(path);
  }
}
