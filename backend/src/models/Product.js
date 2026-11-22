const { supabase, isConfigured, memoryStore } = require('../config/database');
const logger = require('../utils/logger');
const crypto = require('crypto');

class Product {
  static async getAll(options = {}) {
    const {
      brand_slug = null,
      brand_id = null,
      category_slug = null,
      category_id = null,
      search = null,
      is_featured = null,
      status = 'active',
      sort = 'created_at_desc',
      page = 1,
      limit = 12
    } = options;

    if (isConfigured && supabase) {
      try {
        let query = supabase
          .from('products')
          .select('*, brands!inner(id, name, slug, logo_url), categories(id, name, slug)', { count: 'exact' });

        if (status) {
          query = query.eq('status', status);
        }
        if (brand_slug) {
          query = query.eq('brands.slug', brand_slug);
        }
        if (brand_id) {
          query = query.eq('brand_id', brand_id);
        }
        if (category_id) {
          query = query.eq('category_id', category_id);
        }
        if (is_featured !== null) {
          query = query.eq('is_featured', is_featured === 'true' || is_featured === true);
        }
        if (search) {
          query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,short_description.ilike.%${search}%`);
        }

        // Sorting
        if (sort === 'name_asc') query = query.order('name', { ascending: true });
        else if (sort === 'name_desc') query = query.order('name', { ascending: false });
        else if (sort === 'oldest') query = query.order('created_at', { ascending: true });
        else query = query.order('created_at', { ascending: false });

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, count, error } = await query;
        if (!error && data) {
          return {
            products: data,
            total: count || data.length,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil((count || data.length) / limit)
          };
        }
      } catch (err) {
        logger.warn('Supabase products getAll failed, using fallback:', err.message);
      }
    }

    // Memory Store implementation
    let results = memoryStore.products.map(p => {
      const brand = memoryStore.brands.find(b => b.id === p.brand_id);
      const category = memoryStore.categories.find(c => c.id === p.category_id);
      return {
        ...p,
        brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug, logo_url: brand.logo_url } : null,
        categories: category ? { id: category.id, name: category.name, slug: category.slug } : null
      };
    });

    if (status) {
      results = results.filter(p => p.status === status);
    }
    if (brand_slug) {
      results = results.filter(p => p.brands && p.brands.slug === brand_slug);
    }
    if (brand_id) {
      results = results.filter(p => p.brand_id === brand_id);
    }
    if (category_slug) {
      results = results.filter(p => p.categories && p.categories.slug === category_slug);
    }
    if (category_id) {
      results = results.filter(p => p.category_id === category_id);
    }
    if (is_featured !== null) {
      const featuredBool = is_featured === 'true' || is_featured === true;
      results = results.filter(p => p.is_featured === featuredBool);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.short_description && p.short_description.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.keywords && p.keywords.some(k => k.toLowerCase().includes(q)))
      );
    }

    // Sort
    if (sort === 'name_asc') results.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name_desc') results.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'oldest') results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    else results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + Number(limit));

    return {
      products: paginated,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getByBrandAndSlug(brandSlug, productSlug) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, brands!inner(id, name, slug, logo_url), categories(id, name, slug), product_images(*)')
          .eq('brands.slug', brandSlug)
          .eq('slug', productSlug)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getByBrandAndSlug failed:', err.message);
      }
    }

    const brand = memoryStore.brands.find(b => b.slug === brandSlug);
    if (!brand) return null;

    const product = memoryStore.products.find(p => p.brand_id === brand.id && p.slug === productSlug);
    if (!product) return null;

    const category = memoryStore.categories.find(c => c.id === product.category_id);
    const images = memoryStore.product_images.filter(img => img.product_id === product.id);

    return {
      ...product,
      brands: { id: brand.id, name: brand.name, slug: brand.slug, logo_url: brand.logo_url },
      categories: category ? { id: category.id, name: category.name, slug: category.slug } : null,
      product_images: images
    };
  }

  static async getById(id) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, brands(id, name, slug), categories(id, name, slug), product_images(*)')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getById failed:', err.message);
      }
    }

    const product = memoryStore.products.find(p => p.id === id);
    if (!product) return null;

    const brand = memoryStore.brands.find(b => b.id === product.brand_id);
    const category = memoryStore.categories.find(c => c.id === product.category_id);
    const images = memoryStore.product_images.filter(img => img.product_id === product.id);

    return {
      ...product,
      brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
      categories: category ? { id: category.id, name: category.name, slug: category.slug } : null,
      product_images: images
    };
  }

  static async search(term) {
    if (!term) return [];
    const q = term.toLowerCase().trim();

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, brands!inner(id, name, slug), categories(id, name, slug)')
          .eq('status', 'active')
          .or(`name.ilike.%${q}%,description.ilike.%${q}%,short_description.ilike.%${q}%`)
          .limit(20);
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase search failed:', err.message);
      }
    }

    return memoryStore.products
      .filter(p => p.status === 'active')
      .filter(p => {
        const brand = memoryStore.brands.find(b => b.id === p.brand_id);
        const category = memoryStore.categories.find(c => c.id === p.category_id);
        const matchName = p.name.toLowerCase().includes(q);
        const matchShort = p.short_description && p.short_description.toLowerCase().includes(q);
        const matchDesc = p.description && p.description.toLowerCase().includes(q);
        const matchKeywords = p.keywords && p.keywords.some(k => k.toLowerCase().includes(q));
        const matchBrand = brand && brand.name.toLowerCase().includes(q);
        const matchCat = category && category.name.toLowerCase().includes(q);
        return matchName || matchShort || matchDesc || matchKeywords || matchBrand || matchCat;
      })
      .map(p => {
        const brand = memoryStore.brands.find(b => b.id === p.brand_id);
        const category = memoryStore.categories.find(c => c.id === p.category_id);
        return {
          ...p,
          brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
          categories: category ? { id: category.id, name: category.name, slug: category.slug } : null
        };
      });
  }

  static async create(data) {
    const newProduct = {
      id: crypto.randomUUID(),
      name: data.name,
      slug: data.slug,
      brand_id: data.brand_id,
      category_id: data.category_id || null,
      short_description: data.short_description || '',
      description: data.description,
      main_image_url: data.main_image_url || '/images/products/placeholder.jpg',
      specifications: data.specifications || {},
      applications: data.applications || [],
      keywords: data.keywords || [],
      seo_title: data.seo_title || `${data.name} | SARAR INDUSTRIES`,
      seo_description: data.seo_description || data.short_description || '',
      is_featured: Boolean(data.is_featured),
      status: data.status || 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isConfigured && supabase) {
      try {
        const { data: created, error } = await supabase
          .from('products')
          .insert(newProduct)
          .select('*, brands(id, name, slug), categories(id, name, slug)')
          .single();
        if (!error && created) return created;
      } catch (err) {
        logger.warn('Supabase create product failed:', err.message);
      }
    }

    memoryStore.products.push(newProduct);
    const brand = memoryStore.brands.find(b => b.id === newProduct.brand_id);
    const category = memoryStore.categories.find(c => c.id === newProduct.category_id);
    return {
      ...newProduct,
      brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
      categories: category ? { id: category.id, name: category.name, slug: category.slug } : null
    };
  }

  static async update(id, updates) {
    const payload = { ...updates, updated_at: new Date().toISOString() };

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', id)
          .select('*, brands(id, name, slug), categories(id, name, slug)')
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase update product failed:', err.message);
      }
    }

    const index = memoryStore.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    memoryStore.products[index] = { ...memoryStore.products[index], ...payload };
    const p = memoryStore.products[index];
    const brand = memoryStore.brands.find(b => b.id === p.brand_id);
    const category = memoryStore.categories.find(c => c.id === p.category_id);
    return {
      ...p,
      brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
      categories: category ? { id: category.id, name: category.name, slug: category.slug } : null
    };
  }

  static async delete(id) {
    if (isConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        if (!error) return true;
      } catch (err) {
        logger.warn('Supabase delete product failed:', err.message);
      }
    }

    const index = memoryStore.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    memoryStore.products.splice(index, 1);
    return true;
  }

  static async addImage(productId, imageUrl, altText = '', displayOrder = 0) {
    const newImage = {
      id: crypto.randomUUID(),
      product_id: productId,
      image_url: imageUrl,
      alt_text: altText,
      display_order: displayOrder,
      created_at: new Date().toISOString()
    };

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('product_images')
          .insert(newImage)
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase add product image failed:', err.message);
      }
    }

    memoryStore.product_images.push(newImage);
    return newImage;
  }
}

module.exports = Product;
