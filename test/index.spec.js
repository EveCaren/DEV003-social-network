/* eslint-disable no-unused-vars */
// importamos la funcion que vamos a testear
import Toastify from 'toastify-js';
import { login } from '../src/lib/fireFunction';
import { home } from '../src/components/Home';

jest.mock('../src/lib/fireFunction');

jest.mock('toastify-js', () => jest.fn(() => ({
  showToast: jest.fn(),
})));

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
  let user;

  beforeEach(() => {
    document.body.appendChild(home());
    containerLogin = document.querySelector('.containerLogin');
    formLogin = document.querySelector('.formLogin');
    labelEmail = document.querySelector('.labels');
    inputEmail = document.querySelector('.inputs');
    labelPass = document.querySelector('.labels');
    inputPass = document.querySelector('.inputs');
    buttonLogin = document.querySelector('.buttonLogin');
    user = document.getElementById('user');
  });

  it('Debería mostrar un error (llamar a Toastify una vez )', async () => {
    login.mockImplementationOnce(() => Promise.reject(
      new Error('Firebase: Error (auth/invalid-email).'),
    ));
    buttonLogin.click();
    await time();
    // --------------llamar a Toastify-------------------
    expect(Toastify).toHaveBeenCalled();
  });

  it('Debería mostrar éxito', async () => {
    login.mockImplementationOnce((email) => Promise.resolve({
      user: { userCredential: 9876, email },
    }));

    buttonLogin.click();
    await time();
    expect(Toastify).toHaveBeenCalled();
  });
});
