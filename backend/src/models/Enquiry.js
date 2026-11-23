const { supabase, isConfigured, memoryStore, persistEnquiries } = require('../config/database');
const logger = require('../utils/logger');
const crypto = require('crypto');

class Enquiry {
  static async create(data) {
    const newEnquiry = {
      id: crypto.randomUUID(),
      customer_name: data.customer_name,
      company_name: data.company_name || null,
      phone: data.phone,
      email: data.email,
      brand_id: data.brand_id || null,
      product_id: data.product_id || null,
      quantity: data.quantity || null,
      message: data.message,
      status: 'New',
      internal_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isConfigured && supabase) {
      try {
        const { data: created, error } = await supabase
          .from('enquiries')
          .insert(newEnquiry)
          .select('*, brands(name), products(name)')
          .single();
        if (!error && created) return created;
      } catch (err) {
        logger.warn('Supabase create enquiry failed:', err.message);
      }
    }

    memoryStore.enquiries.unshift(newEnquiry);
    persistEnquiries();
    const brand = newEnquiry.brand_id ? memoryStore.brands.find(b => b.id === newEnquiry.brand_id) : null;
    const product = newEnquiry.product_id ? memoryStore.products.find(p => p.id === newEnquiry.product_id) : null;

    return {
      ...newEnquiry,
      brands: brand ? { name: brand.name } : null,
      products: product ? { name: product.name } : null
    };
  }

  static async getAll(options = {}) {
    const { status = null, search = null, page = 1, limit = 20 } = options;

    if (isConfigured && supabase) {
      try {
        let query = supabase
          .from('enquiries')
          .select('*, brands(id, name, slug), products(id, name, slug)', { count: 'exact' });

        if (status && status !== 'all') {
          query = query.eq('status', status);
        }
        if (search) {
          query = query.or(`customer_name.ilike.%${search}%,company_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
        }
        query = query.order('created_at', { ascending: false });

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, count, error } = await query;
        if (!error && data) {
          return {
            enquiries: data,
            total: count || data.length,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil((count || data.length) / limit)
          };
        }
      } catch (err) {
        logger.warn('Supabase enquiries getAll failed:', err.message);
      }
    }

    let results = memoryStore.enquiries.map(e => {
      const brand = e.brand_id ? memoryStore.brands.find(b => b.id === e.brand_id) : null;
      const product = e.product_id ? memoryStore.products.find(p => p.id === e.product_id) : null;
      return {
        ...e,
        brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
        products: product ? { id: product.id, name: product.name, slug: product.slug } : null
      };
    });

    if (status && status !== 'all') {
      results = results.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(e =>
        e.customer_name.toLowerCase().includes(q) ||
        (e.company_name && e.company_name.toLowerCase().includes(q)) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q)
      );
    }

    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + Number(limit));

    return {
      enquiries: paginated,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getById(id) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*, brands(id, name, slug), products(id, name, slug)')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getById failed:', err.message);
      }
    }

    const enquiry = memoryStore.enquiries.find(e => e.id === id);
    if (!enquiry) return null;
    const brand = enquiry.brand_id ? memoryStore.brands.find(b => b.id === enquiry.brand_id) : null;
    const product = enquiry.product_id ? memoryStore.products.find(p => p.id === enquiry.product_id) : null;

    return {
      ...enquiry,
      brands: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
      products: product ? { id: product.id, name: product.name, slug: product.slug } : null
    };
  }

  static async updateStatus(id, status, internal_notes = null) {
    const payload = {
      status,
      updated_at: new Date().toISOString()
    };
    if (internal_notes !== null) {
      payload.internal_notes = internal_notes;
    }

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .update(payload)
          .eq('id', id)
          .select('*, brands(name), products(name)')
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase update status failed:', err.message);
      }
    }

    const index = memoryStore.enquiries.findIndex(e => e.id === id);
    if (index === -1) return null;
    memoryStore.enquiries[index] = { ...memoryStore.enquiries[index], ...payload };
    persistEnquiries();
    const updated = memoryStore.enquiries[index];
    const brand = updated.brand_id ? memoryStore.brands.find(b => b.id === updated.brand_id) : null;
    const product = updated.product_id ? memoryStore.products.find(p => p.id === updated.product_id) : null;

    return {
      ...updated,
      brands: brand ? { name: brand.name } : null,
      products: product ? { name: product.name } : null
    };
  }

  static async getStats() {
    if (isConfigured && supabase) {
      try {
        const { data: allEnquiries } = await supabase.from('enquiries').select('status');
        const { count: totalProducts } = await supabase.from('products').select('*', { count: 'exact', head: true });
        const { count: activeProducts } = await supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active');

        if (allEnquiries) {
          const totalEnquiries = allEnquiries.length;
          const newEnquiries = allEnquiries.filter(e => e.status === 'New').length;
          const statusCounts = allEnquiries.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
          }, {});

          return {
            totalProducts: totalProducts || 0,
            activeProducts: activeProducts || 0,
            totalEnquiries,
            newEnquiries,
            statusCounts
          };
        }
      } catch (err) {
        logger.warn('Supabase getStats failed:', err.message);
      }
    }

    const totalProducts = memoryStore.products.length;
    const activeProducts = memoryStore.products.filter(p => p.status === 'active').length;
    const totalEnquiries = memoryStore.enquiries.length;
    const newEnquiries = memoryStore.enquiries.filter(e => e.status === 'New').length;
    const statusCounts = memoryStore.enquiries.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalProducts,
      activeProducts,
      totalEnquiries,
      newEnquiries,
      statusCounts
    };
  }
}

module.exports = Enquiry;
