const { body } = require('express-validator');
const { validate } = require('./authValidator');

const categoryValidator = validate([
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 150 }),

  body('brand_id')
    .trim()
    .notEmpty()
    .withMessage('Brand ID is required'),

  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be active or inactive')
]);

module.exports = {
  categoryValidator
};
