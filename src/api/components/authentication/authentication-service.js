const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

const failedLoginAttempts = {};

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  const failedAttempts = failedLoginAttempts[email] || 0;

  if (failedAttempts >= 5) {
    const lastFailedAttemptTime =
      failedLoginAttempts[`${email}_lastAttempt`] || 0;
    const currentTime = Date.now();
    const timeDiffMinutes = (currentTime - lastFailedAttemptTime) / (1000 * 60);

    if (timeDiffMinutes < 30) {
      return null;
    }
  }

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (user && passwordChecked) {
    failedLoginAttempts[email] = 0;
    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  } else {
    failedLoginAttempts[email] = failedAttempts + 1;

    failedLoginAttempts[`${email}_lastAttempt`] = Date.now();
  }

  return null;
}

module.exports = {
  checkLoginCredentials,
};
