const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || 'product-media',
  JWT_SECRET: process.env.JWT_SECRET || 'sarar-industries-fallback-secret-2024',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  COMPANY_NAME: 'SARAR INDUSTRIES',
  CONTACT_PERSON: 'Siddharth Dwivedi',
  CONTACT_PHONE: '+919123841340',
  CONTACT_EMAIL: 'sararindustries@gmail.com',
  WHATSAPP_NUMBER: '919123841340',
};
