'use strict';

const logoutCallback = (logout) => {
  if(logout.success === true) {
    location.reload();
  }
};

const logout = new LogoutButton();

logout.action = () => {
  ApiConnector.logout(logoutCallback);
};