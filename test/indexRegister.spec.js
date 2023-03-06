/* eslint-disable no-unused-vars */
import { async } from 'regenerator-runtime';
import Toastify from 'toastify-js';
import { register } from '../src/components/Register';
import { registerEvent } from '../src/lib/fireFunction';

jest.mock('../src/lib/fireFunction');
jest.mock('toastify-js', () => jest.fn(() => ({
  showToast: jest.fn(),
})));
function time() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('describe the component Register', () => {
  let containerRegister;
  let labelUser;
  let inputUser;
  let labelEmail;
  let inputEmail;
  let labelPass;
  let inputPass;
  let buttonCreate;
  let buttonGmail;

  beforeEach(() => {
    document.body.appendChild(register());
    containerRegister = document.querySelector('.containerRegister');
    labelUser = document.querySelector('.labelUser');
    inputUser = document.querySelector('.inputUser');
    labelEmail = document.querySelector('.labelEmail');
    inputEmail = document.querySelector('.inputEmail');
    labelPass = document.querySelector('.labelPass');
    inputPass = document.querySelector('.inputPass');
    buttonCreate = document.querySelector('.buttonCreate');
    buttonGmail = document.querySelector('.buttonGmail');
  });
  it('Debería mostrar un error, llamar a tostify', async () => {
    registerEvent.mockImplementationOnce(() => Promise.reject(
      new Error('Firebase: Error (auth/invalid-email)'),
      new Error('Firebase: Error (auth/email-already-in-use)'),
      new Error('Firebase: Error (auth/weak-password)'),
    ));
    buttonCreate.click();
    await time();
    expect(Toastify).toHaveBeenCalled();
  });
  it('cuando se registra exitosamente', async () => {
    const url = 'http://localhost:5173/muro';
    Object.defineProperty(window, 'location', {
      value: new URL(url),
    });
    registerEvent.mockImplementationOnce((email) => Promise.resolve({
      user: { userCredential: 123, email },
    }));
    buttonCreate.click();
    await time();
    expect(window.location.href).toEqual(url);
  });
});
