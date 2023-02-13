// importamos la funcion que vamos a testear
import { login } from '../src/lib/fireFunction';
import Home from '../src/components/Home';

jest.mock('../src/lib/fireFunction');

function time() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('test de home', () => {
  let containerLogin;
  let formLogin;
  let labelEmail;
  let inputEmail;
  let labelPass;
  let inputPass;
  let buttonLogin;
  let errorCode;
  let user;

  beforeEach(() => {
    document.body.appendChild(Home());
    containerLogin = document.querySelector('.containerLogin');
    formLogin = document.querySelector('.formLogin');
    labelEmail = document.querySelector('.labels');
    inputEmail = document.querySelector('.inputs');
    labelPass = document.querySelector('.labels');
    inputPass = document.querySelector('.inputs');
    buttonLogin = document.querySelector('.buttonLogin');
    errorCode = document.getElementById('errorCode');
    user = document.getElementById('user');
  });

  it('Debería mostrar un error', async () => {
    login.mockImplementationOnce((email, password) => {
      return Promise.reject(
        new Error('Firebase: Error (auth/invalid-email).'),
      );
    });

    buttonLogin.click();
    await time();
    expect(errorCode.innerHTML).toBe(
      'Firebase: Error (auth/invalid-email).',
    );
  });

  it('Debería mostrar éxito', async () => {
    login.mockImplementationOnce((email, password) => {
      return Promise.resolve({
        user: { userCredential: 9876, email: email }
      });
    });
    inputEmail.value = 'email@verify.com';
    inputPass.value = '6789';

    buttonLogin.click();
    await time();
    expect(user.innerHTML).toBe(
      'email@verify.com',
    );
  });
});
