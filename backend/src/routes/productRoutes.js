const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidator } = require('../validators/productValidator');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// Search endpoint (placed before :id / :brandSlug)
router.get('/search', productController.searchProducts);

// Public routes
router.get('/', productController.getProducts);
router.get('/brand/:brandSlug/:productSlug', productController.getProductByBrandAndSlug);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', authenticate, requireAdmin, productValidator, productController.createProduct);
router.put('/:id', authenticate, requireAdmin, productController.updateProduct);
router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

module.exports = router;
