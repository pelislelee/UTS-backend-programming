const { mbanking } = require('../../../models');

async function getAccount() {
  return mbanking.find();
}

/**
 * Create new user
 * @param {string} userId
 * @param {string} accountType
 * @param {number} balance
 * @returns {Promise}
 */
async function createAccount(userId, accountType, balance) {
  return mbanking.create({
    userId,
    accountType,
    balance,
  });
}

async function updateAccount(id, accountType, balance) {
  return mbanking.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accountType,
        balance,
      },
    }
  );
}

async function deleteAccount(id) {
  return mbanking.deleteOne({ _id: id });
}

module.exports = {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccount,
};
