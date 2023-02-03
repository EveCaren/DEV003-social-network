import { onNavigate } from '../main.js';

export const home = () => {
  const HomeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const buttonRegister = document.createElement('button');
  const buttonLogin = document.createElement('button');

  title.textContent = 'PETGRAM';
  buttonRegister.textContent = 'Registrate';
  buttonLogin.textContent = 'Inicia Sesión';

  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  HomeDiv.append(title, buttonRegister, buttonLogin);

  return HomeDiv;
};
