const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET || (NODE_ENV === 'production' ? '' : crypto.randomBytes(48).toString('hex'));
if (NODE_ENV === 'production' && (!JWT_SECRET || JWT_SECRET === 'sarar-industries-fallback-secret-2024' || JWT_SECRET.includes('change-in-production'))) {
  throw new Error('Set a unique, randomly generated JWT_SECRET before starting in production.');
}

module.exports = {
  NODE_ENV,
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || process.env.RENDER_EXTERNAL_URL || (NODE_ENV === 'production' ? '' : 'http://localhost:3000'),
  CORS_ORIGINS: (process.env.CORS_ORIGINS || '').split(',').map(origin => origin.trim()).filter(Boolean),
  TRUST_PROXY: process.env.TRUST_PROXY || (NODE_ENV === 'production' ? '1' : '0'),
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || 'product-media',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
  ADMIN_NAME: process.env.ADMIN_NAME || 'SARAR Administrator',
  JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  COMPANY_NAME: 'SARAR INDUSTRIES',
  CONTACT_PERSON: 'Siddharth Dwivedi',
  CONTACT_PHONE: '+919123841340',
  CONTACT_EMAIL: 'sararindustries@gmail.com',
  WHATSAPP_NUMBER: '919123841340',
};
