const Category = require('../models/Category');
const slugify = require('../utils/slugify');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getCategories = async (req, res, next) => {
  try {
    const { brand_id, status } = req.query;
    const categories = await Category.getAll({
      brand_id,
      status: status || 'active'
    });
    return successResponse(res, categories, 'Categories retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.getBySlug(slug);
    if (!category) {
      return errorResponse(res, `Category '${slug}' not found`, 404);
    }
    return successResponse(res, category, 'Category retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, brand_id, description, image_url, status } = req.body;
    const slug = slugify(name);

    // Verify slug uniqueness
    const existing = await Category.getBySlug(slug);
    if (existing) {
      return errorResponse(res, 'A category with this name or slug already exists', 409);
    }

    const created = await Category.create({
      name,
      slug,
      brand_id,
      description,
      image_url,
      status: status || 'active'
    });

    return successResponse(res, created, 'Category created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, brand_id, description, image_url, status } = req.body;

    const updates = { brand_id, description, image_url, status };
    if (name) {
      updates.name = name;
      updates.slug = slugify(name);
    }

    const updated = await Category.update(id, updates);
    if (!updated) {
      return errorResponse(res, 'Category not found', 404);
    }

    return successResponse(res, updated, 'Category updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await Category.delete(id);
    if (!success) {
      return errorResponse(res, 'Category not found', 404);
    }
    return successResponse(res, null, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};
