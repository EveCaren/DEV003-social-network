import Toastify from 'toastify-js';
import { login } from '../lib/fireFunction.js';
// import { onNavigate } from '../router.js';

export const home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.setAttribute('class', 'HomeDiv');
  const logoDiv = document.createElement('div');
  logoDiv.setAttribute('class', 'logoDiv');
  const logo = document.createElement('img');
  logo.setAttribute('src', '/img/logo.png');
  logo.setAttribute('alt', 'logoAlt');
  logo.setAttribute('class', 'logo');
  const btnDiv = document.createElement('div');
  btnDiv.setAttribute('class', 'btnDiv');
  const footer = document.createElement('footer');
  footer.setAttribute('class', 'footer');
  footer.textContent = 'Social Network by Andre, Eli, Eve';
  // Inputs
  const title = document.createElement('h2');
  title.setAttribute('class', 'title');
  title.textContent = 'PETGRAM';
  const welcome = document.createElement('p');
  welcome.setAttribute('class', 'welcome');
  welcome.textContent = `¡Bienvenido! Nos alegra que 
  estés aquí. Petgram es una 
  comunidad enorme en la que 
  puedes compartir contenido 
  diverso sobre tu mascota.`;
  const containerLogin = document.createElement('div');
  containerLogin.setAttribute('class', 'containerLogin');
  const formLogin = document.createElement('form');
  formLogin.setAttribute('class', 'formLogin');
  formLogin.setAttribute('id', 'formLogin');
  const labelEmail = document.createElement('label');
  labelEmail.setAttribute('class', 'labels');
  labelEmail.textContent = 'Correo';
  const labelPass = document.createElement('label');
  labelPass.setAttribute('class', 'labels');
  labelPass.textContent = 'Contraseña';
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('class', 'inputs');
  inputEmail.placeholder = 'xxxxxxxx@gmail.com';
  const inputPass = document.createElement('input');
  inputPass.setAttribute('type', 'text');
  inputPass.setAttribute('class', 'inputs');
  inputPass.placeholder = 'xxxxxxxx';
  // Botones
  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('class', 'buttonLogin');
  buttonLogin.setAttribute('type', 'submit');
  buttonLogin.textContent = 'Inicia Sesión';

  const buttonRegister = document.createElement('button');
  buttonRegister.setAttribute('class', 'buttonRegister');
  buttonRegister.textContent = 'Registrate';

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueEmail = inputEmail.value;
    const valuePass = inputPass.value;
    if (valueEmail === '' || valuePass === '') {
      Toastify({
        text: 'Por favor ingresar datos.',
        duration: 6000,
        style: {
          background: 'linear-gradient(to right, #f2a71b, #bf522a)',
        },
      }).showToast();
    } else if (valueEmail && valuePass) {
      login(valueEmail, valuePass).then(() => {
        // Signed in
        // const user = userCredential.user;
        // alert(user);
        // user.setAttribute('id', 'user');
        onNavigate('/muro');
      }).catch((error) => {
        const errorCode = error.code;
        // errorCode.setAttribute('id', 'errorCode');
        if (errorCode) {
          if (errorCode === 'auth/invalid-email') {
            Toastify({
              text: error.message,
              duration: 6000,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          } else if (errorCode === 'auth/wrong-password') {
            Toastify({
              text: 'Contraseña inválida.',
              duration: 6000,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          }
        }
      });
    }
  });

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  logoDiv.append(logo, title, welcome);
  btnDiv.appendChild(buttonLogin);
  formLogin.append(labelEmail, inputEmail, labelPass, inputPass, btnDiv);
  containerLogin.append(formLogin, buttonRegister);
  HomeDiv.append(logoDiv, containerLogin, footer);

  return HomeDiv;
};
