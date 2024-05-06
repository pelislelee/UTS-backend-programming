const express = require('express');
const mbankingControllers = require('./mbanking-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/mbanking', route);

  route.post('/create', mbankingControllers.createAccount);
  route.put('/:id', mbankingControllers.updateAccount);
  route.delete('/:id', mbankingControllers.deleteAccount);
  route.get('/accounts', mbankingControllers.getAccounts);
};
