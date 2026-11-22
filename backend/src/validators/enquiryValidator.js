const { body } = require('express-validator');
const { validate } = require('./authValidator');

const enquiryValidator = validate([
  body('customer_name')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2, max: 150 })
    .withMessage('Customer name must be between 2 and 150 characters'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Contact phone number is required')
    .matches(/^[+0-9\s-]{8,20}$/)
    .withMessage('Please provide a valid contact phone number'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email address is required')
    .normalizeEmail(),

  body('company_name')
    .optional()
    .trim()
    .isLength({ max: 200 }),

  body('brand')
    .optional()
    .trim(),

  body('product')
    .optional()
    .trim(),

  body('quantity')
    .optional()
    .trim(),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Enquiry message is required')
    .isLength({ min: 5, max: 3000 })
    .withMessage('Message must be between 5 and 3000 characters')
]);

module.exports = {
  enquiryValidator
};
