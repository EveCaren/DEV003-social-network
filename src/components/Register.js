export const register = (on) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Registro';
  const buttonCreate = document.createElement('button');
  buttonCreate.setAttribute('class', 'buttonCreate');
  buttonCreate.textContent = 'Crear cuenta';

  const buttonGmail = document.createElement('button');
  buttonGmail.setAttribute('class', 'buttonGmail');
  buttonGmail.textContent = 'Ingresar con Google';

  buttonCreate.addEventListener('click', () => on('/'));
  buttonGmail.addEventListener('click', () => on('/'));

  HomeDiv.appendChild(buttonCreate);
  HomeDiv.appendChild(buttonGmail);

  return HomeDiv;
};
