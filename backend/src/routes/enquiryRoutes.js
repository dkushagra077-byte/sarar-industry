const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { enquiryValidator } = require('../validators/enquiryValidator');
const { enquiryLimiter } = require('../middleware/rateLimiter');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// Public route to submit an enquiry (rate limited & validated)
router.post('/', enquiryLimiter, enquiryValidator, enquiryController.createEnquiry);

// Admin routes
router.get('/export/csv', authenticate, requireAdmin, enquiryController.exportEnquiriesCSV);
router.get('/', authenticate, requireAdmin, enquiryController.getEnquiries);
router.get('/:id', authenticate, requireAdmin, enquiryController.getEnquiryById);
router.put('/:id/status', authenticate, requireAdmin, enquiryController.updateEnquiryStatus);

module.exports = router;
