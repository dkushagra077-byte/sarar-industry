const { supabase, isConfigured, memoryStore } = require('../config/database');
const logger = require('../utils/logger');
const crypto = require('crypto');

class Brand {
  static async getAll(options = {}) {
    const { status = 'active' } = options;

    if (isConfigured && supabase) {
      try {
        let query = supabase.from('brands').select('*');
        if (status) {
          query = query.eq('status', status);
        }
        query = query.order('name', { ascending: true });
        const { data, error } = await query;
        if (!error && data) return data;
        logger.warn('Supabase query error on brands, falling back to memory store:', error?.message);
      } catch (err) {
        logger.warn('Supabase request failed:', err.message);
      }
    }

    return memoryStore.brands.filter(b => (!status || b.status === status));
  }

  static async getBySlug(slug) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('slug', slug)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getBySlug failed:', err.message);
      }
    }

    return memoryStore.brands.find(b => b.slug === slug) || null;
  }

  static async getById(id) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase getById failed:', err.message);
      }
    }

    return memoryStore.brands.find(b => b.id === id) || null;
  }

  static async update(id, updates) {
    const payload = { ...updates, updated_at: new Date().toISOString() };

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('brands')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase update brand failed:', err.message);
      }
    }

    const index = memoryStore.brands.findIndex(b => b.id === id);
    if (index === -1) return null;
    memoryStore.brands[index] = { ...memoryStore.brands[index], ...payload };
    return memoryStore.brands[index];
  }
}

module.exports = Brand;
