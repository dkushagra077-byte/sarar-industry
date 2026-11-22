const Enquiry = require('../models/Enquiry');
const { successResponse } = require('../utils/responseFormatter');

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await Enquiry.getStats();
    return successResponse(res, stats, 'Dashboard statistics retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
