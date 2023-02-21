// import { onAuthStateChanged } from 'firebase/auth';
// import { updateCurrentUser } from 'firebase/auth';
import { addANewPost, currentUserInfo } from '../lib/fireFunction.js';

export const muro = () => {
  const userMuro = currentUserInfo().displayName;
  const UserIdMuro = currentUserInfo().uid;
  console.log(userMuro, UserIdMuro);

  // maquetación del muro
  const HomeDivMuro = document.createElement('div');
  const logoDiv = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const divContainer = document.createElement('div');
  const writeMuro = document.createElement('div');
  const write = document.createElement('input');
  const post = document.createElement('button');
  const postMuro = document.createElement('div');
  const likeDiv = document.createElement('div');
  const logoLike = document.createElement('img');
  const postSecond = document.createElement('button');
  const postMuroSecond = document.createElement('div');
  const likeSecond = document.createElement('div');
  const logoSecond = document.createElement('img');
  const buttonProfile = document.createElement('button');
  const logoProfile = document.createElement('img');
  const buttonHome = document.createElement('button');
  const logoButton = document.createElement('img');
  const publishDiv = document.createElement('div');
  const buttonPublish = document.createElement('button');
  const buttonContainer = document.createElement('div');

  HomeDivMuro.setAttribute('class', 'HomeDivMuro');
  logoDiv.setAttribute('class', 'logoMuro');
  logo.setAttribute('src', '/img/logo.png');
  logo.setAttribute('alt', 'logoAlt');
  title.setAttribute('class', 'titleMuro');
  divContainer.setAttribute('class', 'divContainer');
  writeMuro.setAttribute('class', 'writeMuro');
  write.setAttribute('class', 'write');
  post.setAttribute('class', 'post');
  postMuro.setAttribute('class', 'postMuro');
  likeDiv.setAttribute('class', 'likeDiv');
  logoLike.setAttribute('src', '/img/like.png');
  logoLike.setAttribute('alt', 'logoAlt');
  logoLike.setAttribute('class', 'logoLike');
  postSecond.setAttribute('class', 'postSecond');
  postMuroSecond.setAttribute('class', 'postMuroSecond');
  likeSecond.setAttribute('class', 'likeSecond');
  logoSecond.setAttribute('src', '/img/like.png');
  logoSecond.setAttribute('alt', 'logoAlt');
  logoSecond.setAttribute('class', 'logoSecond');
  publishDiv.setAttribute('class', 'publishDiv');
  buttonPublish.setAttribute('class', 'buttonPublish');
  buttonHome.setAttribute('class', 'buttonHome');
  logoButton.setAttribute('src', '/img/pet-love.png');
  logoButton.setAttribute('alt', 'logoAlt');
  buttonProfile.setAttribute('class', 'buttonProfile');
  logoProfile.setAttribute('src', '/img/Max.jpeg');
  logoProfile.setAttribute('alt', 'logoAlt');
  buttonContainer.setAttribute('class', 'buttonContainer');

  title.textContent = 'PETGRAM';
  buttonPublish.textContent = 'Publicar';

  write.placeholder = '¿En qué estás pensando?';

  // Función del boton publicar

  buttonPublish.addEventListener('click', (e) => {
    const postValue = write.value;
    addANewPost(userMuro, postValue, UserIdMuro);
  });


// función para agregar datos
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "paquito",
//     last: "chetito",
//     born: 2014
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }


  logoDiv.append(logo, title);
  divContainer.append(writeMuro, postMuro, postMuroSecond, buttonContainer);
  writeMuro.append(write, publishDiv);
  publishDiv.appendChild(buttonPublish);
  buttonContainer.append(buttonHome, buttonProfile);
  buttonHome.appendChild(logoButton);
  buttonProfile.appendChild(logoProfile);
  postMuroSecond.appendChild(likeSecond);
  postMuro.appendChild(likeDiv);
  likeDiv.appendChild(post);
  likeSecond.appendChild(postSecond);
  post.appendChild(logoLike);
  postSecond.appendChild(logoSecond);
  HomeDivMuro.append(logoDiv, divContainer);

  return HomeDivMuro;

};
