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



const currentCallback = (current) => {
  if(current.success === true) {
    ProfileWidget.showProfile(current.data);
  };
};
ApiConnector.current(currentCallback);



const rateBoard = new RatesBoard();
const stocksCallback = (stocks) => {
  if(stocks.success === true) {
    rateBoard.clearTable();
    rateBoard.fillTable(stocks.data);
  };
};

ApiConnector.getStocks(stocksCallback);
const stocksInterval = setInterval(() => {
  ApiConnector.getStocks(stocksCallback);
}, 60000);




const moneyManage = new MoneyManager();
const moneyCallback = (money) => {
  if(money.success === true) {
    ProfileWidget.showProfile(money.data);
    moneyManage.setMessage(money.success, 'Пополнение успешно');
  } else {
    moneyManage.setMessage(money.success, money.error);
  };
};

moneyManage.addMoneyCallback = (money) => {
  ApiConnector.addMoney(money, moneyCallback);
};


const conversionCallback = (conversion) => {
  if(conversion.success === true) {
    ProfileWidget.showProfile(conversion.data);
    moneyManage.setMessage(conversion.success, 'Конвертация прошла успешно');
  } else {
    moneyManage.setMessage(conversion.success, conversion.error);
  };
};

moneyManage.conversionMoneyCallback = (conversion) => {
  ApiConnector.convertMoney(conversion, conversionCallback);
};


const sendCallback = (send) => {
  if(send.success === true) {
    ProfileWidget.showProfile(send.data);
    moneyManage.setMessage(send.success, 'Перевод прошёл успешно');
  } else {
    moneyManage.setMessage(send.success, send.error);
  };
};

moneyManage.sendMoneyCallback = (send) => {
  ApiConnector.transferMoney(send, sendCallback);
};




const favorites = new FavoritesWidget();

const takeFavoritesCallback = (favor) => {
  if(favor.success === true) {
    favorites.clearTable();
    favorites.fillTable(favor.data);
    moneyManage.updateUsersList(favor.data);
  };
};

ApiConnector.getFavorites(takeFavoritesCallback);


const addUserFav = (user) => {
  if(user.success === true) {
    favorites.clearTable();
    favorites.fillTable(user.data);
    moneyManage.updateUsersList(user.data);
    moneyManage.setMessage(user.success, 'Пользователь добавлен в список избранных');
  } else {
    moneyManage.setMessage(user.success, user.error);
  };
};

favorites.addUserCallback = (user) => {
  ApiConnector.addUserToFavorites(user, addUserFav);
};


const removeCallback = (remove) => {
  if(remove.success === true) {
    favorites.clearTable();
    favorites.fillTable(remove.data);
    moneyManage.updateUsersList(remove.data);
    moneyManage.setMessage(remove.success, 'Пользователь удалён');
  } else {
    moneyManage.setMessage(remove.success, remove.error);
  };
};

favorites.removeUserCallback = (remove) => {
  ApiConnector.removeUserFromFavorites(remove, removeCallback);
};