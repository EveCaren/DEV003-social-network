export const muro = () => {
  const HomeDiv = document.createElement('div');
  const logoDiv = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const writeMuro = document.createElement('div');
  const write = document.createElement('input');
  const post = document.createElement('button');
  const postMuro = document.createElement('div');
  const button = document.createElement('button');
  const buttonHome = document.createElement('button');

  logoDiv.setAttribute('class', 'logoMuro');
  logo.setAttribute('src', '/img/logo.png');
  logo.setAttribute('alt', 'logoAlt');
  logo.setAttribute('class', 'titleMuro');
  writeMuro.setAttribute('class', 'writeMuro');
  write.setAttribute('class', 'write');
  post.setAttribute('class', 'post');
  postMuro.setAttribute('class', 'postMuro');

  title.textContent = 'PETGRAM';
  button.textContent = 'perfil';
  buttonHome.textContent = 'inicio';

  logoDiv.append(logo, title);
  writeMuro.append();

  HomeDiv.append(logoDiv, writeMuro, postMuro, button, buttonHome);

  return HomeDiv;
};
