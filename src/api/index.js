const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const mbanking = require('./components/mbanking/mbanking-route'); // Pastikan impor telah diperbarui

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  mbanking(app); // Pastikan mbanking juga ditambahkan ke app

  return app;
};
