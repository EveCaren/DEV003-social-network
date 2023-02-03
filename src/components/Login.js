export const login = () => {
  const HomeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const buttonHome = document.createElement('button');

  title.textContent = 'Inicia sesión';
  button.textContent = 'Inicia sesión';
  buttonHome.textContent = 'Regresar al Home';

  HomeDiv.append(title, button, buttonHome);

  return HomeDiv;
};
