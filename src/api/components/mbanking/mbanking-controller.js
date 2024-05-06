const mbankingService = require('./mbanking-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAccounts(request, response, next) {
  try {
    const accounts = await mbankingService.getAccounts();
    return response.status(200).json(accounts);
  } catch (error) {
    return next(error);
  }
}

/**
 *
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object}
 */
async function createAccount(request, response, next) {
  try {
    const userId = request.body.userId;
    const accountType = request.body.accountType;
    const balance = request.body.balance;

    const success = await mbankingService.createAccount(
      userId,
      accountType,
      balance
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create account'
      );
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

async function updateAccount(request, response, next) {
  try {
    const id = request.params.id;
    const accountType = request.body.accountType;
    const balance = request.body.balance;

    const success = await mbankingService.updateAccount(
      id,
      accountType,
      balance
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update account'
      );
    }

    return response.status(200).json({ id, accountType, balance });
  } catch (error) {
    return next(error);
  }
}

async function deleteAccount(request, response, next) {
  try {
    const id = request.params.id;

    const success = await mbankingService.deleteAccount(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete account'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccounts,
};
