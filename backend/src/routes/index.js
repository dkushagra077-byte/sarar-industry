const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const brandRoutes = require('./brandRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const statsRoutes = require('./statsRoutes');
const uploadRoutes = require('./uploadRoutes');

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'SARAR INDUSTRIES API',
    timestamp: new Date().toISOString()
  });
});

// Company Info Endpoint
router.get('/company-info', (req, res) => {
  res.status(200).json({
    company_name: 'SARAR INDUSTRIES',
    company_type: 'Manufacturers of Industrial Insulation & Sealing Products',
    contact_person: 'Siddharth Dwivedi',
    phone: '+91 9123841340',
    email: 'sararindustries@gmail.com',
    whatsapp: '919123841340',
    experience_years: 50,
    brands: ['SAKET', 'DWITECH']
  });
});

// Mount Routes
router.use('/auth', authRoutes);
router.use('/brands', brandRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/stats', statsRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
