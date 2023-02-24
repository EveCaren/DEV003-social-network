import Toastify from 'toastify-js';
import { getAuth } from 'firebase/auth';
import { registerEvent, updateInfo } from '../lib/fireFunction.js';

export const register = (onNavigate) => {
  console.log('que valor tiene onNavvigate', onNavigate)
  // estructuración
  const HomeDivReg = document.createElement('div');
  const logoDiv = document.createElement('div');
  const containerRegister = document.createElement('div');
  const divError = document.createElement('div');
  const form = document.createElement('form');
  const btnDiv = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const welcome = document.createElement('p');
  const containerAll = document.createElement('div');
  const RegTitle = document.createElement('P');
  const labelUser = document.createElement('label');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  const inputUser = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const gmailDiv = document.createElement('div');
  const buttonCreate = document.createElement('button');
  const buttonGmail = document.createElement('button');
  const iconGoogle = document.createElement('i');

  // asignando clases
  HomeDivReg.setAttribute('class', 'HomeDivReg');
  logoDiv.setAttribute('class', 'logoDiv');
  containerRegister.setAttribute('class', 'containerRegis');
  containerRegister.setAttribute('id', 'containerRegis');
  form.setAttribute('class', 'form');
  form.setAttribute('id', 'form');
  btnDiv.setAttribute('class', 'btnDiv');
  logo.setAttribute('src', '/img/logo.png');
  logo.setAttribute('alt', 'logoAlt');
  logo.setAttribute('class', 'logo');
  title.setAttribute('class', 'title');
  welcome.setAttribute('class', 'welcome');
  containerAll.setAttribute('class', 'containerAll');
  RegTitle.setAttribute('class', 'RegTitle');
  labelUser.setAttribute('class', 'labels');
  labelEmail.setAttribute('class', 'labels');
  labelPass.setAttribute('class', 'labels');
  inputUser.setAttribute('type', 'text');
  inputUser.setAttribute('class', 'inputsReg');
  inputUser.setAttribute('id', 'user');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('class', 'inputsReg');
  inputEmail.setAttribute('id', 'email');
  inputPass.setAttribute('type', 'text');
  inputPass.setAttribute('class', 'inputsReg');
  inputPass.setAttribute('id', 'pass');
  gmailDiv.setAttribute('class', 'gmailDiv');
  buttonCreate.setAttribute('class', 'buttonCreate');
  buttonCreate.setAttribute('type', 'submit');
  buttonGmail.setAttribute('class', 'buttonGmail');
  iconGoogle.className = 'fa-brands fa-google';

  // dando texto-contenido
  title.textContent = 'PETGRAM';
  welcome.textContent = `¡Bienvenido! Nos alegra que 
  estés aquí. Petgram es una 
  comunidad enorme en la que 
  puedes compartir contenido 
  diverso sobre tu mascota.`;
  labelUser.textContent = 'Usuario';
  labelEmail.textContent = 'Correo';
  labelPass.textContent = 'Contraseña';
  RegTitle.textContent = 'Regístrate';
  buttonCreate.textContent = 'Crear cuenta';
  buttonGmail.textContent = 'Ingresar con Google  ';

  // placeholder para inputs
  inputUser.placeholder = 'Escriba aquí su usuario';
  inputEmail.placeholder = 'Escriba aquí su correo';
  inputPass.placeholder = 'Escriba aquí su contraseña';

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
          console.log('register', user);
          // para guardar el nombre del usuario
          return updateInfo({
            displayName: userValue,
          });
        })
        .then(() => {
          onNavigate('/muro');
          Toastify({
            text: '¡Bienvenido a PETGRAM! Ya puedes comenzar a interactuar',
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
//   // }).catch((error) => {
//   //   // Handle Errors here.
//   //   const errorCode = error.code;
//   //   const errorMessage = error.message;
//   //   // The email of the user's account used.
//   //   const email = error.customData.email;
//   //   // The AuthCredential type that was used.
//   //   const credential = GoogleAuthProvider.credentialFromError(error);
//   //   // ...
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
