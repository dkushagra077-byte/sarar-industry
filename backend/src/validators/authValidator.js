const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/responseFormatter');

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return errorResponse(
      res,
      'Validation failed',
      422,
      errors.array().map(err => ({ field: err.path, message: err.msg }))
    );
  };
};

const loginValidator = validate([
  body('email').isEmail().withMessage('Valid email address is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]);

module.exports = {
  loginValidator,
  validate
};
