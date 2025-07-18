// Router.js
class Router {
    constructor(routes) {
      this.routes = routes;
      this.rootElement = document.querySelector('#product-view-container');
      window.addEventListener('hashchange', this.handleRouteChange.bind(this));
      this.handleRouteChange();
    }
  
    handleRouteChange() {
      const path = location.hash.replace('#', '');
      const route = this.routes.find((route) => route.path === path);
      if (route && this.rootElement) {
        this.rootElement.innerHTML = '';
        const viewElement = route.view();
        this.rootElement.appendChild(viewElement);
      } else {
        console.error(`No route found for path: ${path}`);
      }
    }
  }
  
  export default Router;
  