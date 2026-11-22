const { verifyToken } = require('../utils/jwtHelper');
const { errorResponse } = require('../utils/responseFormatter');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token required. Please sign in.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse(res, 'Session expired or invalid token. Please sign in again.', 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Authentication failed.', 401);
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
    return errorResponse(res, 'Access denied. Administrator privileges required.', 403);
  }
  next();
};

module.exports = {
  authenticate,
  requireAdmin
};
