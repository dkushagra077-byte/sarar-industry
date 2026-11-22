const User = require('../models/User');
const { generateToken } = require('../utils/jwtHelper');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    if (user.status !== 'active') {
      return errorResponse(res, 'Account is suspended or inactive. Please contact support.', 403);
    }

    const isMatch = await User.verifyPassword(password, user.password_hash);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    const token = generateToken(payload);

    logger.info(`User logged in successfully: ${user.email} (${user.role})`);

    return successResponse(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, 'Authentication successful');
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, { user }, 'Current user profile retrieved');
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return successResponse(res, null, 'Logged out successfully');
};

module.exports = {
  login,
  getCurrentUser,
  logout
};
