const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidator } = require('../validators/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/login', authLimiter, loginValidator, authController.login);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
