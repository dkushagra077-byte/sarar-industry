const Product = require('../models/Product');
const Brand = require('../models/Brand');
const slugify = require('../utils/slugify');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getProducts = async (req, res, next) => {
  try {
    const {
      brand,
      brand_id,
      category,
      category_id,
      search,
      is_featured,
      status,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const result = await Product.getAll({
      brand_slug: brand,
      brand_id,
      category_slug: category,
      category_id,
      search,
      is_featured,
      status: status !== undefined ? status : 'active',
      sort,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    });

    return successResponse(res, result.products, 'Products retrieved successfully', 200, {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages
    });
  } catch (error) {
    next(error);
  }
};

const getProductByBrandAndSlug = async (req, res, next) => {
  try {
    const { brandSlug, productSlug } = req.params;
    const product = await Product.getByBrandAndSlug(brandSlug, productSlug);

    if (!product) {
      return errorResponse(res, `Product not found under brand '${brandSlug}'`, 404);
    }

    // Retrieve related products in the same brand or category
    const { products: related } = await Product.getAll({
      brand_slug: brandSlug,
      category_id: product.category_id,
      status: 'active',
      limit: 4
    });

    const filteredRelated = related.filter(p => p.id !== product.id).slice(0, 3);

    return successResponse(res, {
      ...product,
      related_products: filteredRelated
    }, 'Product details retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    return successResponse(res, product, 'Product retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    if (!query.trim()) {
      return successResponse(res, [], 'Search query is empty');
    }

    const results = await Product.search(query);
    return successResponse(res, results, `Found ${results.length} products matching '${query}'`);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand_id,
      category_id,
      short_description,
      description,
      main_image_url,
      specifications,
      applications,
      keywords,
      seo_title,
      seo_description,
      is_featured,
      status
    } = req.body;

    // Check brand exists
    const brand = await Brand.getById(brand_id);
    if (!brand) {
      return errorResponse(res, 'Invalid brand ID provided', 400);
    }

    const slug = slugify(name);

    const created = await Product.create({
      name,
      slug,
      brand_id,
      category_id,
      short_description,
      description,
      main_image_url,
      specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications,
      applications: typeof applications === 'string' ? JSON.parse(applications) : applications,
      keywords: Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(s => s.trim()) : []),
      seo_title,
      seo_description,
      is_featured: Boolean(is_featured),
      status: status || 'active'
    });

    return successResponse(res, created, 'Product created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      brand_id,
      category_id,
      short_description,
      description,
      main_image_url,
      specifications,
      applications,
      keywords,
      seo_title,
      seo_description,
      is_featured,
      status
    } = req.body;

    const updates = {};
    if (name) {
      updates.name = name;
      updates.slug = slugify(name);
    }
    if (brand_id !== undefined) updates.brand_id = brand_id;
    if (category_id !== undefined) updates.category_id = category_id;
    if (short_description !== undefined) updates.short_description = short_description;
    if (description !== undefined) updates.description = description;
    if (main_image_url !== undefined) updates.main_image_url = main_image_url;
    if (specifications !== undefined) {
      updates.specifications = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
    }
    if (applications !== undefined) {
      updates.applications = typeof applications === 'string' ? JSON.parse(applications) : applications;
    }
    if (keywords !== undefined) {
      updates.keywords = Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(s => s.trim()) : []);
    }
    if (seo_title !== undefined) updates.seo_title = seo_title;
    if (seo_description !== undefined) updates.seo_description = seo_description;
    if (is_featured !== undefined) updates.is_featured = Boolean(is_featured);
    if (status !== undefined) updates.status = status;

    const updated = await Product.update(id, updates);
    if (!updated) {
      return errorResponse(res, 'Product not found', 404);
    }

    return successResponse(res, updated, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Product.delete(id);
    if (!deleted) {
      return errorResponse(res, 'Product not found', 404);
    }
    return successResponse(res, null, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductByBrandAndSlug,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
