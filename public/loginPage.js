'use strict';

const userForm = new UserForm();

const loginCallback = (response) => {

    if(response.success === true) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage('Неверный логин/пароль');
    };
};

const registerCallback = (response) => {
  
  if(response.success === true) {
    location.reload();
  } else {
    userForm.registerErrorMessageBox('Пользователь уже существует');
  };
  
};

userForm.loginFormCallback = (data) => {
  console.log(data);
  ApiConnector.login(data, loginCallback);
};

userForm.registerFormCallback = (data) => {
  console.log(data);
  ApiConnector.register(data, registerCallback);
};