import { async } from 'regenerator-runtime';
import {
  addANewPost,
  printPost,
  stateLogin,
  addLikes,
  removeLikes,
  getLikes,
  deletePost,
  currentUserInfo,
  editPost,
  getPost,
  logOut,
} from '../lib/fireFunction.js';

let userMuro = '';
let userIdMuro = '';

stateLogin((user) => {
  console.log('stateLogin', user);
  userMuro = user.displayName;
  userIdMuro = user.uid;
  console.log(userIdMuro);
});

export const muro = (onNavigate) => {
  // const localId = ;
  // console.log(localId);
  // maquetación del muro
  const HomeDivMuro = document.createElement('div');
  const logoDiv = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const divContainer = document.createElement('div');
  const writeMuro = document.createElement('div');
  const formMuro = document.createElement('form');
  const write = document.createElement('input');
  const post = document.createElement('button');
  const postMuro = document.createElement('div');
  const likeDiv = document.createElement('div');
  const buttonProfile = document.createElement('button');
  const logoProfile = document.createElement('img');
  const buttonHome = document.createElement('button');
  const logoButton = document.createElement('img');
  const buttonLogOut = document.createElement('button');
  const logoOut = document.createElement('img');
  const publishDiv = document.createElement('div');
  const buttonPublish = document.createElement('button');
  const buttonUpdate = document.createElement('button');
  const buttonEdCancel = document.createElement('button');
  const footerCont = document.createElement('footer');

  HomeDivMuro.setAttribute('class', 'HomeDivMuro');
  logoDiv.setAttribute('class', 'logoMuro');
  logo.setAttribute('src', '/img/logo.png');
  logo.setAttribute('alt', 'logoAlt');
  title.setAttribute('class', 'titleMuro');
  divContainer.setAttribute('class', 'divContainer');
  writeMuro.setAttribute('class', 'writeMuro');
  formMuro.setAttribute('class', 'formMuro');
  write.setAttribute('class', 'write');
  post.setAttribute('class', 'post');
  postMuro.setAttribute('class', 'postMuro');
  likeDiv.setAttribute('class', 'likeDiv');
  publishDiv.setAttribute('class', 'publishDiv');
  buttonPublish.setAttribute('class', 'buttonPublish');
  buttonUpdate.setAttribute('class', 'buttonUpdate');
  buttonEdCancel.setAttribute('class', 'buttonEdCancel');
  buttonHome.setAttribute('class', 'buttonHome');
  logoButton.setAttribute('src', '/img/pet-love.png');
  logoButton.setAttribute('alt', 'logoAlt');
  buttonProfile.setAttribute('class', 'buttonProfile');
  logoProfile.setAttribute('src', '/img/Max.jpeg');
  logoProfile.setAttribute('alt', 'logoAlt');
  buttonLogOut.setAttribute('class', 'buttonLogOut');
  logoOut.setAttribute('src', '/img/logOut.png');
  logoOut.setAttribute('alt', 'logoAlt');
  footerCont.setAttribute('class', 'footerCont');

  title.textContent = 'PETGRAM';
  buttonPublish.textContent = 'Publicar';
  buttonUpdate.textContent = 'Actualizar';
  buttonEdCancel.textContent = 'Cancelar';
  write.placeholder = '¿En qué estás pensando?';
  buttonLogOut.textContent = 'Out';

  // Función del boton publicar
  buttonPublish.addEventListener('click', (e) => {
    e.preventDefault();
    const postValue = write.value;
    if (postValue !== '') {
      addANewPost(userMuro, postValue, userIdMuro);
      formMuro.reset();
    } else {
      alert('No has escrito nada, revisa por favor');
    }
  });

  // enlistar posts
  printPost((querySnapshot) => {
    let contentPost = '';
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      console.log(docData);
      console.log('currentUserInfo', currentUserInfo());

      const loggedUserId = currentUserInfo().uid;
      const isAuthor = docData.uidUser === loggedUserId;

      contentPost += `<div class = 'cardPost' id = 'cardPost'> 
      <p class = 'customer'>${docData.customer}</p>
      <p class = 'postUser' id= ${doc.id}>${docData.postUser}</p>
       <div class = 'likeDiv'>
       <button class = 'btnLike' id=${doc.id}>
       <img src='img/mascotas.png' alt='logolike'>
       </button>
        <p class = 'numLike'>${docData.like.length}</p>
        ${isAuthor ? `<button class = 'btnEdit' id=${doc.id}>
        <img src='img/lapiz.png' alt='logolike'>
        </button>
        <button class = 'btnDelete' id=${doc.id}>
        <img src='img/eliminar.png' alt='logolike'>
        </button>` : ''}
       </div>
      </div>`;
    });
    postMuro.innerHTML = contentPost;
    eventLikes();
    eventDelete();
    eventEdit();
  });

  // Función para añadir y quitar like
  function eventLikes() {
    const BtnLike = postMuro.querySelectorAll('.btnLike');
    // console.log(BtnLike);
    BtnLike.forEach((btn) => {
      btn.addEventListener('click', () => {
        getLikes(btn.id).then((dbLike) => {
          const firstPost = dbLike.data();
          const userLikes = firstPost.like;
          if (userLikes.includes(userIdMuro)) {
            removeLikes(btn.id, userIdMuro);
          } else {
            addLikes(btn.id, userIdMuro);
          }
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }

  // Función para eliminar posts
  function eventDelete() {
    const BtnDelete = postMuro.querySelectorAll('.btnDelete');
    BtnDelete.forEach((btn) => {
      btn.addEventListener('click', () => {
        const question = confirm('¿Desea eliminar este post?');
        if (question === true) {
          deletePost(btn.id);
        }
      });
    });
  }
  // Función para editar posts
  // Toma el post y lo devuelve en el input para ser editado
  function eventEdit() {
    const BtnEdit = postMuro.querySelectorAll('.btnEdit');
    const contentPostInput = formMuro.querySelector('.write');
    let taskPost;
    let postGet;
    let btnIdPost;
    BtnEdit.forEach((btn) => {
      btn.addEventListener('click', async () => {
        btnIdPost = btn.id;
        postGet = await getPost(btn.id);
        console.log (postGet.data());
        taskPost = postGet.data();
        contentPostInput.value = taskPost.postUser;
        buttonUpdate.style.display = 'block';
        buttonEdCancel.style.display = 'block';
        buttonPublish.style.display = 'none';
      });
    });
    // Actualiza la nueva edición del post
    const BtnUpdate = formMuro.querySelector('.buttonUpdate');
    BtnUpdate.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('taskPost', taskPost);
      // const btnIdUp = BtnUpdate.id;
      console.log(btnIdPost);
      editPost(btnIdPost, contentPostInput.value);
      buttonUpdate.style.display = 'none';
      buttonEdCancel.style.display = 'none';
      buttonPublish.style.display = 'block';
      contentPostInput.value = '';
    });
    // Da funcionalidad al botón cancelar
    const BtnCancel = formMuro.querySelector('.buttonEdCancel');
    BtnCancel.addEventListener('click', async (e) => {
      e.preventDefault();
      buttonUpdate.style.display = 'none';
      buttonEdCancel.style.display = 'none';
      buttonPublish.style.display = 'block';
      contentPostInput.value = '';
    });
  }
  // función cerrar sesión
  buttonLogOut.addEventListener('click', (e) => {
    e.preventDefault();
    logOut().then(() => {
      onNavigate('/');
    });
  });

  logoDiv.append(logo, title);
  formMuro.append(write, buttonPublish, buttonUpdate, buttonEdCancel);
  publishDiv.appendChild(formMuro);
  writeMuro.append(publishDiv);
  divContainer.append(writeMuro, postMuro);
  buttonLogOut.appendChild(logoOut);
  buttonHome.appendChild(logoButton);
  buttonProfile.appendChild(logoProfile);
  footerCont.append(buttonLogOut, buttonHome, buttonProfile);
  postMuro.appendChild(likeDiv);
  likeDiv.appendChild(post);
  HomeDivMuro.append(logoDiv, divContainer, footerCont);

  return HomeDivMuro;
};
