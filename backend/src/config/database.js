const { createClient } = require('@supabase/supabase-js');
const config = require('./environment');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let supabase = null;
let isConfigured = false;

// Check if valid Supabase URL & Key are provided
const hasValidConfig = () => {
  const key = config.SUPABASE_SECRET_KEY || config.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(config.SUPABASE_URL && key) &&
    !config.SUPABASE_URL.includes('your-project-id') &&
    !config.SUPABASE_URL.includes('example.com') &&
    !key.includes('your-');
};
if (hasValidConfig()) {
  try {
    const key = config.SUPABASE_SECRET_KEY || config.SUPABASE_SERVICE_ROLE_KEY;
    supabase = createClient(config.SUPABASE_URL, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    isConfigured = true;
    logger.info('Supabase client initialized. Verifying database connectivity before serving production traffic.');
  } catch (error) {
    logger.warn('Failed to initialize Supabase client:', error.message);
  }
} else {
  if (config.NODE_ENV === 'production') {
    throw new Error('Production requires a valid SUPABASE_URL and server-side SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY).');
  }
  logger.warn('Supabase URL or Key not set or using placeholder. Running with initialized local seed data; enquiries are persisted to backend/data/enquiries.json.');
}

// Built-in seed state adhering strictly to prompt requirements
const memoryStore = {
  brands: [
    {
      id: 'a1111111-1111-1111-1111-111111111111',
      name: 'SAKET',
      slug: 'saket',
      description: 'Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.',
      logo_url: '/logos/Saket.jpeg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'b2222222-2222-2222-2222-222222222222',
      name: 'DWITECH',
      slug: 'dwitech',
      description: 'Rubber products and engineered components designed to meet industrial requirements.',
      logo_url: '/logos/Dwitech.jpeg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  categories: [
    {
      id: 'c1111111-1111-1111-1111-111111111111',
      name: 'Asbestos & Non-Asbestos Products',
      slug: 'asbestos-products',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      description: 'Industrial insulation millboards, yarn, cloth, and jointing sheets engineered for thermal resistance.',
      image_url: '/images/categories/asbestos-products.jpg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'c2222222-2222-2222-2222-222222222222',
      name: 'Ceramic Insulation Products',
      slug: 'ceramic-insulation-products',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      description: 'High-temperature ceramic blankets, ropes, boards, and textiles for industrial thermal insulation.',
      image_url: '/images/categories/ceramic-insulation.jpg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'c3333333-3333-3333-3333-333333333333',
      name: 'Industrial Sealing & Gasketing',
      slug: 'industrial-sealing-gaskets',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      description: 'Precision industrial gaskets, jointing sheets, and sealing materials for fluid and pressure containment.',
      image_url: '/images/categories/industrial-sealing.jpg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'c4444444-4444-4444-4444-444444444444',
      name: 'Industrial Rubber Products',
      slug: 'industrial-rubber-products',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      description: 'Heavy-duty industrial rubber sheets, rolls, and mats engineered for durability and resilient wear.',
      image_url: '/images/categories/rubber-products.jpg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'c5555555-5555-5555-5555-555555555555',
      name: 'Molded & Extruded Rubber Components',
      slug: 'molded-extruded-rubber',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      description: 'Precision molded rubber bushes, seals, O-rings, and custom extruded rubber profiles.',
      image_url: '/images/categories/molded-rubber.jpg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'c6666666-6666-6666-6666-666666666666',
      name: 'Engineered Industrial Components',
      slug: 'engineered-components',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      description: 'Engineered elastomer parts, vibration dampers, and tailored components for industrial equipment.',
      image_url: '/images/categories/engineered-components.jpg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  products: [
    {
      id: '91111111-1111-4111-8111-111111111111',
      name: 'Asbestos Handgloves',
      slug: 'asbestos-handgloves',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c1111111-1111-1111-1111-111111111111',
      short_description: 'Asbestos Handgloves. Contact us for verified specifications and availability.',
      description: 'Asbestos Handgloves. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/asbestos-handgloves.jpeg',
      specifications: {},
      applications: [],
      keywords: ['asbestos handgloves', 'gloves'],
      seo_title: 'Asbestos Handgloves | SARAR INDUSTRIES',
      seo_description: 'Asbestos Handgloves from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111112-1111-4111-8111-111111111112',
      name: 'Ceramic fibre blanket',
      slug: 'ceramic-fibre-blanket',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Ceramic fibre blanket. Contact us for verified specifications and availability.',
      description: 'Ceramic fibre blanket. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/ceramic-fibre-blanket.jpeg',
      specifications: {},
      applications: [],
      keywords: ['ceramic fibre blanket', 'blanket'],
      seo_title: 'Ceramic fibre blanket | SARAR INDUSTRIES',
      seo_description: 'Ceramic fibre blanket from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111113-1111-4111-8111-111111111113',
      name: 'Cotton gland packing',
      slug: 'cotton-gland-packing',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c3333333-3333-3333-3333-333333333333',
      short_description: 'Cotton gland packing. Contact us for verified specifications and availability.',
      description: 'Cotton gland packing. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/cotton-gland-packing.jpeg',
      specifications: {},
      applications: [],
      keywords: ['cotton gland packing', 'packing'],
      seo_title: 'Cotton gland packing | SARAR INDUSTRIES',
      seo_description: 'Cotton gland packing from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111114-1111-4111-8111-111111111114',
      name: 'Glass Fibre rope',
      slug: 'glass-fibre-rope',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Glass Fibre rope. Contact us for verified specifications and availability.',
      description: 'Glass Fibre rope. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/glass-fibre-rope.jpeg',
      specifications: {},
      applications: [],
      keywords: ['glass fibre rope', 'rope'],
      seo_title: 'Glass Fibre rope | SARAR INDUSTRIES',
      seo_description: 'Glass Fibre rope from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111115-1111-4111-8111-111111111115',
      name: 'Glass Fibre Tape',
      slug: 'glass-fibre-tape',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Glass Fibre Tape. Contact us for verified specifications and availability.',
      description: 'Glass Fibre Tape. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/glass-fibre-tape.jpeg',
      specifications: {},
      applications: [],
      keywords: ['glass fibre tape', 'tape'],
      seo_title: 'Glass Fibre Tape | SARAR INDUSTRIES',
      seo_description: 'Glass Fibre Tape from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111116-1111-4111-8111-111111111116',
      name: 'Ceramic tape',
      slug: 'ceramic-tape',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Ceramic tape. Contact us for verified specifications and availability.',
      description: 'Ceramic tape. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/ceramic-tape.jpeg',
      specifications: {},
      applications: [],
      keywords: ['ceramic tape', 'tape'],
      seo_title: 'Ceramic tape | SARAR INDUSTRIES',
      seo_description: 'Ceramic tape from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111117-1111-4111-8111-111111111117',
      name: 'Asbestos tape',
      slug: 'asbestos-tape',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c1111111-1111-1111-1111-111111111111',
      short_description: 'Asbestos tape. Contact us for verified specifications and availability.',
      description: 'Asbestos tape. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/asbestos-tape.jpeg',
      specifications: {},
      applications: [],
      keywords: ['asbestos tape', 'tape'],
      seo_title: 'Asbestos tape | SARAR INDUSTRIES',
      seo_description: 'Asbestos tape from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111118-1111-4111-8111-111111111118',
      name: 'Non Asbestos-Ceramic gland packing',
      slug: 'non-asbestos-ceramic-gland-packing',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c3333333-3333-3333-3333-333333333333',
      short_description: 'Non Asbestos-Ceramic gland packing. Contact us for verified specifications and availability.',
      description: 'Non Asbestos-Ceramic gland packing. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/non-asbestos-ceramic-gland-packing.jpeg',
      specifications: {},
      applications: [],
      keywords: ['non asbestos ceramic gland packing', 'gland packing'],
      seo_title: 'Non Asbestos-Ceramic gland packing | SARAR INDUSTRIES',
      seo_description: 'Non Asbestos-Ceramic gland packing from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111119-1111-4111-8111-111111111119',
      name: 'Asbestos gland packing (3mm to 150mm)',
      slug: 'asbestos-gland-packing-3mm-to-150mm',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c3333333-3333-3333-3333-333333333333',
      short_description: 'Asbestos gland packing (3mm to 150mm). Contact us for verified specifications and availability.',
      description: 'Asbestos gland packing (3mm to 150mm). Contact us for verified specifications and availability.',
      main_image_url: '/images/products/asbestos-gland-packing-3mm-to-150mm.jpeg',
      specifications: { 'Available size': '3mm to 150mm' },
      applications: [],
      keywords: ['asbestos gland packing', 'gland packing', '3mm to 150mm'],
      seo_title: 'Asbestos gland packing (3mm to 150mm) | SARAR INDUSTRIES',
      seo_description: 'Asbestos gland packing (3mm to 150mm) from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111120-1111-4111-8111-111111111120',
      name: 'Ceramic rope (1.5mm to 150mm)',
      slug: 'ceramic-rope-1-5mm-to-150mm',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Ceramic rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
      description: 'Ceramic rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
      main_image_url: '/images/products/ceramic-rope-1-5mm-to-150mm.jpeg',
      specifications: { 'Available size': '1.5mm to 150mm' },
      applications: [],
      keywords: ['ceramic rope', 'rope', '1.5mm to 150mm'],
      seo_title: 'Ceramic rope (1.5mm to 150mm) | SARAR INDUSTRIES',
      seo_description: 'Ceramic rope (1.5mm to 150mm) from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '91111121-1111-4111-8111-111111111121',
      name: 'Asbestos rope (1.5mm to 150mm)',
      slug: 'asbestos-rope-1-5mm-to-150mm',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c1111111-1111-1111-1111-111111111111',
      short_description: 'Asbestos rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
      description: 'Asbestos rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
      main_image_url: '/images/products/asbestos-rope-1-5mm-to-150mm.jpeg',
      specifications: { 'Available size': '1.5mm to 150mm' },
      applications: [],
      keywords: ['asbestos rope', 'rope', '1.5mm to 150mm'],
      seo_title: 'Asbestos rope (1.5mm to 150mm) | SARAR INDUSTRIES',
      seo_description: 'Asbestos rope (1.5mm to 150mm) from the SAKET product catalogue.',
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
{
      id: '91111122-1111-4111-8111-111111111122',
      name: 'Asbestos cloth',
      slug: 'asbestos-cloth',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c1111111-1111-1111-1111-111111111111',
      short_description: 'Asbestos cloth. Contact us for verified specifications and availability.',
      description: 'Asbestos cloth. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/asbestos-cloth.jpeg',
      specifications: {}, applications: [], keywords: ['asbestos cloth', 'cloth'],
      seo_title: 'Asbestos cloth | SARAR INDUSTRIES',
      seo_description: 'Asbestos cloth from the SAKET product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
    {
      id: '91111123-1111-4111-8111-111111111123',
      name: 'Ceramic cloth', slug: 'ceramic-cloth',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Ceramic cloth. Contact us for verified specifications and availability.',
      description: 'Ceramic cloth. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/ceramic-cloth.jpeg',
      specifications: {}, applications: [], keywords: ['ceramic cloth', 'cloth'],
      seo_title: 'Ceramic cloth | SARAR INDUSTRIES',
      seo_description: 'Ceramic cloth from the SAKET product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
    {
      id: '91111124-1111-4111-8111-111111111124',
      name: 'Cut Gaskets', slug: 'cut-gaskets',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c3333333-3333-3333-3333-333333333333',
      short_description: 'Cut Gaskets. Contact us for verified specifications and availability.',
      description: 'Cut Gaskets. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/cut-gaskets.jpeg',
      specifications: {}, applications: [], keywords: ['cut gaskets', 'gaskets'],
      seo_title: 'Cut Gaskets | SARAR INDUSTRIES',
      seo_description: 'Cut Gaskets from the SAKET product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
    {
      id: '91111125-1111-4111-8111-111111111125',
      name: 'Spiral Wound Gasket', slug: 'spiral-wound-gasket',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c3333333-3333-3333-3333-333333333333',
      short_description: 'Spiral Wound Gasket. Contact us for verified specifications and availability.',
      description: 'Spiral Wound Gasket. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/spiral-wound-gasket.jpeg',
      specifications: {}, applications: [], keywords: ['spiral wound gasket', 'gasket'],
      seo_title: 'Spiral Wound Gasket | SARAR INDUSTRIES',
      seo_description: 'Spiral Wound Gasket from the SAKET product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },{
      id: '91111126-1111-4111-8111-111111111126',
      name: 'Brake Liner',
      slug: 'brake-liner',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c1111111-1111-1111-1111-111111111111',
      short_description: 'Brake Liner. Contact us for verified specifications and availability.',
      description: 'Brake Liner. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/brake-liner.jpeg',
      specifications: {}, applications: [], keywords: ['brake liner', 'brake lining'],
      seo_title: 'Brake Liner | SARAR INDUSTRIES',
      seo_description: 'Brake Liner from the SAKET product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },{
      id: '92222222-2222-4222-8222-222222222222',
      name: 'Rubber O Rings',
      slug: 'rubber-o-rings',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Rubber O Rings. Contact us for verified specifications and availability.',
      description: 'Rubber O Rings. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-o-rings.jpeg',
      specifications: {}, applications: [], keywords: ['rubber o rings', 'o rings'],
      seo_title: 'Rubber O Rings | SARAR INDUSTRIES',
      seo_description: 'Rubber O Rings from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222223-2222-4222-8222-222222222223',
      name: 'Rubber Sheet', slug: 'rubber-sheet',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c4444444-4444-4444-4444-444444444444',
      short_description: 'Rubber Sheet. Contact us for verified specifications and availability.',
      description: 'Rubber Sheet. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-sheet.jpeg',
      specifications: {}, applications: [], keywords: ['rubber sheet', 'rubber sheets'],
      seo_title: 'Rubber Sheet | SARAR INDUSTRIES',
      seo_description: 'Rubber Sheet from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222224-2222-4222-8222-222222222224',
      name: 'Conveyer Belts', slug: 'conveyer-belts',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c4444444-4444-4444-4444-444444444444',
      short_description: 'Conveyer Belts. Contact us for verified specifications and availability.',
      description: 'Conveyer Belts. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/conveyer-belts.jpeg',
      specifications: {}, applications: [], keywords: ['conveyer belts', 'conveyor belts'],
      seo_title: 'Conveyer Belts | SARAR INDUSTRIES',
      seo_description: 'Conveyer Belts from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222225-2222-4222-8222-222222222225',
      name: 'Rubber Gaskets', slug: 'rubber-gaskets',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Rubber Gaskets. Contact us for verified specifications and availability.',
      description: 'Rubber Gaskets. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-gaskets.jpeg',
      specifications: {}, applications: [], keywords: ['rubber gaskets', 'gaskets'],
      seo_title: 'Rubber Gaskets | SARAR INDUSTRIES',
      seo_description: 'Rubber Gaskets from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222226-2222-4222-8222-222222222226',
      name: 'Rubber Cord', slug: 'rubber-cord',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Rubber Cord. Contact us for verified specifications and availability.',
      description: 'Rubber Cord. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-cord.jpeg',
      specifications: {}, applications: [], keywords: ['rubber cord', 'rubber cords'],
      seo_title: 'Rubber Cord | SARAR INDUSTRIES',
      seo_description: 'Rubber Cord from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222227-2222-4222-8222-222222222227',
      name: 'Rubber Liner', slug: 'rubber-liner',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c4444444-4444-4444-4444-444444444444',
      short_description: 'Rubber Liner. Contact us for verified specifications and availability.',
      description: 'Rubber Liner. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-liner.jpeg',
      specifications: {}, applications: [], keywords: ['rubber liner', 'rubber lining'],
      seo_title: 'Rubber Liner | SARAR INDUSTRIES',
      seo_description: 'Rubber Liner from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222228-2222-4222-8222-222222222228',
      name: 'Rubber Hose', slug: 'rubber-hose',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c4444444-4444-4444-4444-444444444444',
      short_description: 'Rubber Hose. Contact us for verified specifications and availability.',
      description: 'Rubber Hose. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-hose.jpeg',
      specifications: {}, applications: [], keywords: ['rubber hose', 'rubber hoses'],
      seo_title: 'Rubber Hose | SARAR INDUSTRIES',
      seo_description: 'Rubber Hose from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222229-2222-4222-8222-222222222229',
      name: 'Rubber Diaphragm', slug: 'rubber-diaphragm',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Rubber Diaphragm. Contact us for verified specifications and availability.',
      description: 'Rubber Diaphragm. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/rubber-diaphragm.jpeg',
      specifications: {}, applications: [], keywords: ['rubber diaphragm', 'rubber diaphragms'],
      seo_title: 'Rubber Diaphragm | SARAR INDUSTRIES',
      seo_description: 'Rubber Diaphragm from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222230-2222-4222-8222-222222222230',
      name: 'Custom Rubber Mouldings', slug: 'custom-rubber-mouldings',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Custom Rubber Mouldings. Contact us for verified specifications and availability.',
      description: 'Custom Rubber Mouldings. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/custom-rubber-mouldings.jpeg',
      specifications: {}, applications: [], keywords: ['custom rubber mouldings', 'rubber mouldings'],
      seo_title: 'Custom Rubber Mouldings | SARAR INDUSTRIES',
      seo_description: 'Custom Rubber Mouldings from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },    {
      id: '92222231-2222-4222-8222-222222222231',
      name: 'Expansion Joints', slug: 'expansion-joints',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c6666666-6666-6666-6666-666666666666',
      short_description: 'Expansion Joints. Contact us for verified specifications and availability.',
      description: 'Expansion Joints. Contact us for verified specifications and availability.',
      main_image_url: '/images/products/expansion-joints.jpeg',
      specifications: {}, applications: [], keywords: ['expansion joints', 'rubber expansion joints'],
      seo_title: 'Expansion Joints | SARAR INDUSTRIES',
      seo_description: 'Expansion Joints from the DWITECH product catalogue.',
      is_featured: false, status: 'active',
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },  ],
  product_images: [],
  enquiries: [],
  users: []
};

if (!isConfigured && config.ADMIN_EMAIL && config.ADMIN_PASSWORD) {
  if (config.ADMIN_PASSWORD.length < 16) {
    throw new Error('ADMIN_PASSWORD must be at least 16 characters when using the local development admin.');
  }
  memoryStore.users.push({
    id: crypto.randomUUID(),
    name: config.ADMIN_NAME,
    email: config.ADMIN_EMAIL.toLowerCase().trim(),
    password_hash: bcrypt.hashSync(config.ADMIN_PASSWORD, 12),
    role: 'superadmin',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
}
// Keep locally stored enquiries across restarts when Supabase is not configured
// or temporarily unavailable. Supabase remains the primary store when available.
const localEnquiriesPath = path.resolve(__dirname, '../../data/enquiries.json');
try {
  if (fs.existsSync(localEnquiriesPath)) {
    const storedEnquiries = JSON.parse(fs.readFileSync(localEnquiriesPath, 'utf8'));
    if (!Array.isArray(storedEnquiries)) throw new Error('Enquiry store must contain an array');
    memoryStore.enquiries = storedEnquiries;
    logger.info(`Loaded ${storedEnquiries.length} enquiries from local persistent storage.`);
  }
} catch (error) {
  logger.error('Could not load locally stored enquiries; using seed data instead:', error.message);
}

const persistEnquiries = () => {
  fs.mkdirSync(path.dirname(localEnquiriesPath), { recursive: true });
  const temporaryPath = `${localEnquiriesPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(memoryStore.enquiries, null, 2), 'utf8');
  fs.renameSync(temporaryPath, localEnquiriesPath);
};

const verifyDatabaseConnection = async () => {
  if (!isConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const tables = ['brands', 'categories', 'products', 'users', 'enquiries'];
  const checks = await Promise.all(tables.map(async (table) => {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (error) throw new Error(`Supabase table check failed for ${table}: ${error.message}`);
  }));
  logger.info('Supabase connection and required tables verified.');
  return checks;
};

module.exports = {
  supabase,
  isConfigured,
  memoryStore,
  persistEnquiries,
  verifyDatabaseConnection
};
