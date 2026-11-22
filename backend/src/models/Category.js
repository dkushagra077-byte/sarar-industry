const { supabase, isConfigured, memoryStore } = require('../config/database');
const logger = require('../utils/logger');
const crypto = require('crypto');

class Category {
  static async getAll(options = {}) {
    const { brand_id = null, status = 'active' } = options;

    if (isConfigured && supabase) {
      try {
        let query = supabase.from('categories').select('*, brands(id, name, slug)');
        if (status) {
          query = query.eq('status', status);
        }
        if (brand_id) {
          query = query.eq('brand_id', brand_id);
        }
        query = query.order('name', { ascending: true });
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase categories getAll failed:', err.message);
      }
    }

    let results = memoryStore.categories;
    if (status) {
      results = results.filter(c => c.status === status);
    }
    if (brand_id) {
      results = results.filter(c => c.brand_id === brand_id);
    }

    // Attach brand info
    return results.map(c => {
      const brand = memoryStore.brands.find(b => b.id === c.brand_id);
      return {
        ...c,
        brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
        product_count: memoryStore.products.filter(p => p.category_id === c.id && p.status === 'active').length
      };
    });
  }

  static async getBySlug(slug) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*, brands(id, name, slug)')
          .eq('slug', slug)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getBySlug failed:', err.message);
      }
    }

    const cat = memoryStore.categories.find(c => c.slug === slug);
    if (!cat) return null;
    const brand = memoryStore.brands.find(b => b.id === cat.brand_id);
    return {
      ...cat,
      brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null
    };
  }

  static async getById(id) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*, brands(id, name, slug)')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getById failed:', err.message);
      }
    }

    const cat = memoryStore.categories.find(c => c.id === id);
    if (!cat) return null;
    const brand = memoryStore.brands.find(b => b.id === cat.brand_id);
    return {
      ...cat,
      brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null
    };
  }

  static async create(data) {
    const newCategory = {
      id: crypto.randomUUID(),
      name: data.name,
      slug: data.slug,
      brand_id: data.brand_id,
      description: data.description || '',
      image_url: data.image_url || '',
      status: data.status || 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isConfigured && supabase) {
      try {
        const { data: created, error } = await supabase
          .from('categories')
          .insert(newCategory)
          .select()
          .single();
        if (!error && created) return created;
      } catch (err) {
        logger.warn('Supabase create category failed:', err.message);
      }
    }

    memoryStore.categories.push(newCategory);
    return newCategory;
  }

  static async update(id, updates) {
    const payload = { ...updates, updated_at: new Date().toISOString() };

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase update category failed:', err.message);
      }
    }

    const index = memoryStore.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    memoryStore.categories[index] = { ...memoryStore.categories[index], ...payload };
    return memoryStore.categories[index];
  }

  static async delete(id) {
    if (isConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);
        if (!error) return true;
      } catch (err) {
        logger.warn('Supabase delete category failed:', err.message);
      }
    }

    const index = memoryStore.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    memoryStore.categories.splice(index, 1);
    return true;
  }
}

module.exports = Category;
