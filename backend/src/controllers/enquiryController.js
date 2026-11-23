const Enquiry = require('../models/Enquiry');
const Brand = require('../models/Brand');
const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const createEnquiry = async (req, res, next) => {
  try {
    const {
      customer_name,
      company_name,
      phone,
      email,
      brand,
      brand_id,
      product,
      product_id,
      quantity,
      message
    } = req.body;

    let resolvedBrandId = brand_id || null;
    let resolvedProductId = product_id || null;

    // Resolve brand if slug or name is passed
    if (!resolvedBrandId && brand) {
      const b = await Brand.getBySlug(brand.toLowerCase());
      if (b) resolvedBrandId = b.id;
    }

    // Resolve product if passed
    if (!resolvedProductId && product) {
      const searchRes = await Product.search(product);
      if (searchRes.length > 0) resolvedProductId = searchRes[0].id;
    }

    const created = await Enquiry.create({
      customer_name,
      company_name,
      phone,
      email,
      brand_id: resolvedBrandId,
      product_id: resolvedProductId,
      quantity,
      message
    });

    logger.info(`New Enquiry received from ${customer_name} (${company_name || 'Individual'}) - Phone: ${phone}`);
    return successResponse(
      res,
      created,
      'Your industrial enquiry has been submitted successfully. Siddharth Dwivedi / SARAR INDUSTRIES will review your requirements and respond promptly.',
      201
    );
  } catch (error) {
    next(error);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const result = await Enquiry.getAll({
      status,
      search,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    });

    return successResponse(res, result.enquiries, 'Enquiries retrieved successfully', 200, {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages
    });
  } catch (error) {
    next(error);
  }
};

const getEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.getById(id);
    if (!enquiry) {
      return errorResponse(res, 'Enquiry not found', 404);
    }
    return successResponse(res, enquiry, 'Enquiry details retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, internal_notes } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed', 'Closed'];
    if (status && !validStatuses.includes(status)) {
      return errorResponse(res, `Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
    }

    const updated = await Enquiry.updateStatus(id, status, internal_notes);
    if (!updated) {
      return errorResponse(res, 'Enquiry not found', 404);
    }

    return successResponse(res, updated, 'Enquiry status updated successfully');
  } catch (error) {
    next(error);
  }
};

const exportEnquiriesCSV = async (req, res, next) => {
  try {
    const { enquiries } = await Enquiry.getAll({ limit: 1000 });

    const headers = [
      'Enquiry ID',
      'Date & Time',
      'Customer Name',
      'Company Name',
      'Phone',
      'Email',
      'Brand',
      'Product',
      'Quantity',
      'Status',
      'Message',
      'Internal Notes'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = enquiries.map(e => [
      escapeCsv(e.id),
      escapeCsv(new Date(e.created_at).toLocaleString()),
      escapeCsv(e.customer_name),
      escapeCsv(e.company_name || ''),
      escapeCsv(e.phone),
      escapeCsv(e.email),
      escapeCsv(e.brands?.name || ''),
      escapeCsv(e.products?.name || ''),
      escapeCsv(e.quantity || ''),
      escapeCsv(e.status),
      escapeCsv(e.message),
      escapeCsv(e.internal_notes || '')
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="sarar_enquiries_${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  exportEnquiriesCSV
};
