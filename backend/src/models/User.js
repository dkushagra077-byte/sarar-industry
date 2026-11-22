const { supabase, isConfigured, memoryStore } = require('../config/database');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const normalized = email.toLowerCase().trim();

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', normalized)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase user findByEmail failed:', err.message);
      }
    }

    return memoryStore.users.find(u => u.email.toLowerCase() === normalized) || null;
  }

  static async findById(id) {
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, role, status, created_at')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (err) {
        logger.warn('Supabase user findById failed:', err.message);
      }
    }

    const user = memoryStore.users.find(u => u.id === id);
    if (!user) return null;
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  static async verifyPassword(plainPassword, passwordHash) {
    return bcrypt.compare(plainPassword, passwordHash);
  }

  static async hashPassword(plainPassword) {
    return bcrypt.hash(plainPassword, 10);
  }
}

module.exports = User;
