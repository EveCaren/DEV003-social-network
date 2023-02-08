// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

import { home } from './components/Home.js';
import { register } from './components/Register.js';
import { login } from './components/Login.js';

const root = document.getElementById('root');

const routes = {
  '/': home,
  '/register': register,
  '/login': login,
};
// método que toma el nombre de la ruta y renderiza la sección de acuerdo a este
export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  root.appendChild(routes[pathname]()); // "()"para que se ejecute
};

const component = routes[window.location.pathname];
// regresar al layout anterior mediante onpopstate
window.onpopstate = () => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.append(component(onNavigate));
};

root.appendChild(component(onNavigate));
