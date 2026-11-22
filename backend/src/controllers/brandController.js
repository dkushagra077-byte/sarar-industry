const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getBrands = async (req, res, next) => {
  try {
    // If not admin, only fetch active brands
    const status = req.query.all === 'true' && req.user ? null : 'active';
    const brands = await Brand.getAll({ status });
    return successResponse(res, brands, 'Brands retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getBrandBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const brand = await Brand.getBySlug(slug);

    if (!brand) {
      return errorResponse(res, `Brand '${slug}' not found`, 404);
    }

    // Attach brand categories and top products
    const categories = await Category.getAll({ brand_id: brand.id, status: 'active' });
    const { products } = await Product.getAll({ brand_slug: brand.slug, status: 'active', limit: 100 });

    return successResponse(res, {
      ...brand,
      categories,
      products
    }, `Brand details for ${brand.name} retrieved`);
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, logo_url, status } = req.body;

    const updated = await Brand.update(id, { description, logo_url, status });
    if (!updated) {
      return errorResponse(res, 'Brand not found', 404);
    }

    return successResponse(res, updated, 'Brand updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBrands,
  getBrandBySlug,
  updateBrand
};
