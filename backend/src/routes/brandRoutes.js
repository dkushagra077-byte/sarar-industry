const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', brandController.getBrands);
router.get('/:slug', brandController.getBrandBySlug);

// Admin routes
router.put('/:id', authenticate, requireAdmin, brandController.updateBrand);

module.exports = router;
