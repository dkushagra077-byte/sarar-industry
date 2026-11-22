const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryValidator } = require('../validators/categoryValidator');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

// Admin routes
router.post('/', authenticate, requireAdmin, categoryValidator, categoryController.createCategory);
router.put('/:id', authenticate, requireAdmin, categoryController.updateCategory);
router.delete('/:id', authenticate, requireAdmin, categoryController.deleteCategory);

module.exports = router;
