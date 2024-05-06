const joi = require('joi');

module.exports = {
  createAccount: {
    body: {
      userId: joi.string().required().label('User ID'),
      accountType: joi.string().required().label('Account Type'),
      balance: joi.number().positive().required().label('Balance'),
    },
  },

  updateAccount: {
    body: {
      accountType: joi.string().required().label('Account Type'),
      balance: joi.number().positive().required().label('Balance'),
    },
  },
};
