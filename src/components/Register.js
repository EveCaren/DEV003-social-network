import Toastify from 'toastify-js';
import { registerEvent } from '../lib/fireFunction.js';
// import { onNavigate } from '../router.js';

export const register = (onNavigate) => {
  const HomeDivReg = document.createElement('div');
  HomeDivReg.setAttribute('class', 'HomeDivReg');
  const logoDiv = document.createElement('div');
  const containerRegister = document.createElement('div');
  containerRegister.setAttribute('class', 'containerRegis');
  containerRegister.setAttribute('id', 'containerRegis');
  const divError = document.createElement('div');
  const form = document.createElement('form');
  form.setAttribute('class', 'form');
  form.setAttribute('id', 'form');
  const btnDiv = document.createElement('div');
  btnDiv.setAttribute('class', 'btnDiv');
  logoDiv.setAttribute('class', 'logoDiv');
  const logo = document.createElement('img');
  logo.setAttribute('src', '/img/logo.png');
  logo.setAttribute('alt', 'logoAlt');
  logo.setAttribute('class', 'logo');
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
  const containerAll = document.createElement('div');
  containerAll.setAttribute('class', 'containerAll');
  const RegTitle = document.createElement('P');
  RegTitle.setAttribute('class', 'RegTitle');
  RegTitle.textContent = 'Regístrate';
  // formulario etiquetas
  const labelUser = document.createElement('label');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  // formulario inputs
  const inputUser = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  // texcontent de etiquetas e inputs
  labelUser.textContent = 'Usuario';
  labelEmail.textContent = 'Correo';
  labelPass.textContent = 'Contraseña';
  // abributos label
  labelUser.setAttribute('class', 'labels');
  labelEmail.setAttribute('class', 'labels');
  labelPass.setAttribute('class', 'labels');
  // atributos inputs
  inputUser.setAttribute('type', 'text');
  inputUser.placeholder = 'Escriba aquí su usuario';
  inputUser.setAttribute('class', 'inputsReg');
  inputUser.setAttribute('id', 'user');
  // inputUser.required = 'true';
  inputEmail.setAttribute('type', 'text');
  inputEmail.placeholder = 'Escriba aquí su correo';
  inputEmail.setAttribute('class', 'inputsReg');
  inputEmail.setAttribute('id', 'email');
  // inputEmail.required = 'true';
  inputPass.setAttribute('type', 'text');
  inputPass.placeholder = 'Escriba aquí su contraseña';
  inputPass.setAttribute('class', 'inputsReg');
  inputPass.setAttribute('id', 'pass');
  // inputPass.required = 'true';
  // botones
  const buttonCreate = document.createElement('button');
  buttonCreate.setAttribute('class', 'buttonCreate');
  buttonCreate.setAttribute('type', 'submit');
  // poner un href o a tyope button para redirigir el código
  buttonCreate.textContent = 'Crear cuenta';
  const gmailDiv = document.createElement('div');
  gmailDiv.setAttribute('class', 'gmailDiv');
  const iconGoogle = document.createElement('i');
  iconGoogle.className = 'fa-brands fa-google';
  const buttonGmail = document.createElement('button');
  buttonGmail.setAttribute('class', 'buttonGmail');
  buttonGmail.textContent = 'Ingresar con Google  ';

  // promesas
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userValue = inputUser.value;
    const mailValue = inputEmail.value;
    const passValue = inputPass.value;
    // const exprReg = /[A-z]/g;

    // function showError(userValue, divError) {
    //   if (exprReg.test(userValue)) {
    //     divError.innerHTML('válido');
    //     inputUser.style.borderColor = 'green';
    //   } else {
    //     divError.innerHTML('inválido');
    //     inputUser.style.borderColor = 'red';
    //   }
    // }
    if (userValue === '' || userValue.length < 5) {
      Toastify({
        text: 'El usuario debe ser mayor a 5 caracteres.',
        duration: 6000,
        style: {
          background: 'linear-gradient(to right, #f2a71b, #bf522a)',
        },
      }).showToast();
    } else if (userValue && mailValue && passValue) {
      registerEvent(mailValue, passValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // si la promesa es positiva debería redirigirme al login router
          onNavigate('/');
          Toastify({
            text: '¡Bienvenido a PETGRAM! Ya puedes iniciar sesión',
            duration: 5000,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
          }).showToast();
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode) {
            if (errorCode === 'auth/invalid-email') {
              Toastify({
                text: 'Correo inválido.',
                duration: 6000,
                style: {
                  background: 'linear-gradient(to right, #f2a71b, #bf522a)',
                },
              }).showToast();
            } else if (errorCode === 'auth/email-already-in-use') {
              Toastify({
                text: 'Correo inválido, ya esta en uso.',
                duration: 6000,
                style: {
                  background: 'linear-gradient(to right, #f2a71b, #bf522a)',
                },
              }).showToast();
            } else if (errorCode === 'auth/weak-password') {
              Toastify({
                text: 'Su contraseña es débil, ponga al menos 6 caracteres.',
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

  // buttonGmail.addEventListener('click', () => {
  //   registerGoogle().then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // console.log(user);
  //     // IdP data available using getAdditionalUserInfo(result)
  //     onNavigate('/muro');
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // });

  logoDiv.append(logo, title, welcome);
  btnDiv.appendChild(buttonCreate);
  form.append(labelUser, inputUser, divError, labelEmail, inputEmail);
  form.append(labelPass, inputPass, btnDiv);
  containerRegister.append(form);
  buttonGmail.appendChild(iconGoogle);
  gmailDiv.appendChild(buttonGmail);
  containerAll.append(RegTitle, containerRegister, gmailDiv);
  HomeDivReg.append(logoDiv, containerAll);
  return HomeDivReg;
};

/* optiones sexo y fecha de nac.
const labelDate = document.createElement('label');
const labelSex = document.createElement('label');
const inputDate = document.createElement('input');
const inputSex = document.createElement('select');
labelDate.setAttribute('class', 'labels');
  labelSex.setAttribute('class', 'labels');
inputDate.setAttribute('type', 'text');
  inputDate.setAttribute('class', 'inputs');
  inputDate.setAttribute('id', 'date');
  inputDate.setAttribute('placeholder', 'DD / MM / AA');
// select para el sexo
  inputSex.setAttribute('class', 'inputs');
  inputSex.setAttribute('id', 'sex');
  // opción vacía
  const optionSexEmpy = document.createElement('option');
  optionSexEmpy.setAttribute('value', '');
  optionSexEmpy.setAttribute('selected', 'true');
  const textSexEmpy = document.createTextNode('seleccione');
  optionSexEmpy.appendChild(textSexEmpy);
  inputSex.appendChild(optionSexEmpy);
  // opción macho
  const optionSexM = document.createElement('option');
  optionSexM.setAttribute('value', 'macho');
  optionSexM.setAttribute('selected', 'true');
  const textSexM = document.createTextNode('Macho');
  optionSexM.appendChild(textSexM);
  inputSex.appendChild(optionSexM);
  // opción hembra
  const optionSexH = document.createElement('option');
  optionSexH.setAttribute('value', 'hembra');
  optionSexH.setAttribute('selected', 'true');
  const textSexH = document.createTextNode('Hembra');
  optionSexH.appendChild(textSexH);
  inputSex.appendChild(optionSexH);
  // inputSex.required = 'true';
  HomeDiv.appendChild(labelDate);
  HomeDiv.appendChild(inputDate);
  HomeDiv.appendChild(labelSex);
  HomeDiv.appendChild(inputSex); */
