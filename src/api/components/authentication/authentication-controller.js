const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

const MAX_LOGIN_ATTEMPTS = 5;

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    if (
      !request.session ||
      request.session.loginAttempt >= MAX_LOGIN_ATTEMPTS
    ) {
      const now = new Date();
      const blockedUntil = new Date(now.getTime() + 30 * 60 * 1000);
      const timeDiffMilliseconds = blockedUntil.getTime() - now.getTime();
      const remainingMinutes = Math.floor(timeDiffMilliseconds / (1000 * 60)); 
      const remainingSeconds = Math.floor((timeDiffMilliseconds / 1000) % 60);
      const errorMessage = `Too many attempts. Blocked for ${remainingMinutes} minutes and ${remainingSeconds} seconds.`;

      throw errorResponder(
        errorTypes.TOO_MANY_ATTEMPTS,
        errorMessage,
        `Blocked for ${remainingMinutes} minutes`
      );
    }

    const loginAttempt = request.session.loginAttempt || 0;
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      request.session.loginAttempt = loginAttempt + 1;

      const errorMessage = `Failed login attempt ${loginAttempt + 1}`;
      throw errorResponder(
        errorTypes.TOO_MANY_ATTEMPTS,
        'Try again later',
        errorMessage
      );
    }

    request.session.loginAttempt = 0;

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
