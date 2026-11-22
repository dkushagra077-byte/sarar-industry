const jwt = require('jsonwebtoken');
const config = require('../config/environment');

const generateToken = (payload, expiresIn = config.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
