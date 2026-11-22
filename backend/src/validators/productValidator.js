const { body } = require('express-validator');
const { validate } = require('./authValidator');

const productValidator = validate([
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 200 }),

  body('brand_id')
    .trim()
    .notEmpty()
    .withMessage('Brand ID or brand slug is required'),

  body('short_description')
    .optional()
    .trim()
    .isLength({ max: 500 }),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required'),

  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be active or inactive')
]);

module.exports = {
  productValidator
};
