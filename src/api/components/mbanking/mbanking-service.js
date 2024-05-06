const mbankingRepository = require('./mbanking-repository');

async function getAccounts() {
  try {
    return await mbankingRepository.getAccounts();
  } catch (err) {
    return null;
  }
}

/**
 * 
 * @param {String} userId 
 * @param {String} accountType 
 * @param {Number} balance 
 * @returns {Boolean}
 */
async function createAccount(userId, accountType, balance) {
  try {
    return await mbankingRepository.createAccount(userId, accountType, balance);
  } catch (err) {
    return null;
  }
}

async function updateAccount(id, accountType, balance) {
  const account = await mbankingRepository.getAccount(id);

  if (!account) {
    return null;
  }

  try {
    await mbankingRepository.updateAccount(id, accountType, balance);
  } catch (err) {
    return null;
  }

  return true;
}

async function deleteAccount(id) {
  const account = await mbankingRepository.getAccount(id);

  if (!account) {
    return null;
  }

  try {
    await mbankingRepository.deleteAccount(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccounts,
};
