const { createClient } = require('@supabase/supabase-js');
const config = require('./environment');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

let supabase = null;
let isConfigured = false;

// Check if valid Supabase URL & Key are provided
const hasValidConfig = () => {
  return (
    Boolean(config.SUPABASE_URL) &&
    Boolean(config.SUPABASE_SERVICE_ROLE_KEY || config.SUPABASE_ANON_KEY) &&
    !config.SUPABASE_URL.includes('your-project-id') &&
    !config.SUPABASE_URL.includes('example.com')
  );
};

if (hasValidConfig()) {
  try {
    const key = config.SUPABASE_SERVICE_ROLE_KEY || config.SUPABASE_ANON_KEY;
    supabase = createClient(config.SUPABASE_URL, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    isConfigured = true;
    logger.info(`Connected to Supabase PostgreSQL at: ${config.SUPABASE_URL}`);
  } catch (error) {
    logger.warn('Failed to initialize Supabase client:', error.message);
  }
} else {
  logger.warn('Supabase URL or Key not set or using placeholder. Running with initialized high-fidelity seed store.');
}

// Built-in seed state adhering strictly to prompt requirements
const memoryStore = {
  brands: [
    {
      id: 'a1111111-1111-1111-1111-111111111111',
      name: 'SAKET',
      slug: 'saket',
      description: 'Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.',
      logo_url: '/logos/saket-logo.svg',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'b2222222-2222-2222-2222-222222222222',
      name: 'DWITECH',
      slug: 'dwitech',
      description: 'Rubber products and engineered components designed to meet industrial requirements.',
      logo_url: '/logos/dwitech-logo.svg',
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
      id: 'p1111111-1111-1111-1111-111111111111',
      name: 'SAKET Asbestos Millboard Sheet',
      slug: 'saket-asbestos-millboard-sheet',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c1111111-1111-1111-1111-111111111111',
      short_description: 'Dense, heat-resistant industrial insulation millboard engineered for thermal barriers and gaskets.',
      description: 'SAKET Asbestos Millboard is manufactured using select high-grade asbestos fibers and heat-resistant binders. Engineered for high thermal insulation, flange gasketing, furnace linings, and industrial heat shielding. Produced with over 50 years of manufacturing experience for consistent density, thermal stability, and mechanical strength.',
      main_image_url: '/images/products/saket-millboard.jpg',
      specifications: {
        "Thickness": "1.5 mm to 12.0 mm",
        "Standard Size": "1000 mm x 1000 mm",
        "Thermal Resistance": "Up to 500°C",
        "Density": "0.90 to 1.10 g/cm³"
      },
      applications: [
        "Furnace and boiler insulation",
        "Industrial heat shielding",
        "Exhaust manifold gaskets",
        "Foundry and metallurgical protection"
      ],
      keywords: ["asbestos millboard", "thermal insulation", "saket millboard", "industrial insulation"],
      seo_title: "SAKET Asbestos Millboard Sheet | SARAR INDUSTRIES",
      seo_description: "High-performance industrial asbestos millboard sheet for high-temperature thermal barriers and gasketing by SARAR INDUSTRIES.",
      is_featured: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p2222222-2222-2222-2222-222222222222',
      name: 'SAKET Ceramic Fiber Insulation Blanket',
      slug: 'saket-ceramic-fiber-blanket',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Spun ceramic fiber blanket delivering exceptional thermal stability and low thermal conductivity.',
      description: 'SAKET Ceramic Fiber Blanket is produced from high-purity alumina-silica spun ceramic fibers, double needle-punched for high tensile strength and integrity under extreme thermal cycling. Designed for furnace linings, kiln insulation, pipe wraps, and expansion joints.',
      main_image_url: '/images/products/saket-ceramic-blanket.jpg',
      specifications: {
        "Temperature Classification": "1260°C to 1425°C",
        "Density Range": "64, 96, 128 kg/m³",
        "Standard Thickness": "12.5 mm, 25 mm, 50 mm",
        "Width": "610 mm / 1220 mm"
      },
      applications: [
        "Industrial furnace and kiln lining",
        "Pipe and duct high-temp insulation",
        "Expansion joints and heat seals",
        "Power generation boiler insulation"
      ],
      keywords: ["ceramic fiber blanket", "high temperature insulation", "saket ceramic", "furnace lining"],
      seo_title: "SAKET Ceramic Fiber Insulation Blanket | SARAR INDUSTRIES",
      seo_description: "High-temperature spun ceramic fiber blanket for industrial kilns, furnaces, and pipelines by SARAR INDUSTRIES.",
      is_featured: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p3333333-3333-3333-3333-333333333333',
      name: 'SAKET Ceramic Fiber Braided Rope & Packing',
      slug: 'saket-ceramic-fiber-rope',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c2222222-2222-2222-2222-222222222222',
      short_description: 'Dense square and round braided ceramic rope for industrial door sealing, expansion joints, and caulking.',
      description: 'SAKET Ceramic Fiber Rope is manufactured by braiding high-temperature ceramic yarns, reinforced for structural stability. It serves as an optimal industrial seal for furnace doors, oven seals, boiler inspection doors, and high-temperature expansion joint packing.',
      main_image_url: '/images/products/saket-ceramic-rope.jpg',
      specifications: {
        "Cross Section": "Round / Square Braided",
        "Diameter / Size": "6 mm to 50 mm",
        "Service Temperature": "Up to 1260°C",
        "Reinforcement": "Fiberglass / SS Wire Insertion"
      },
      applications: [
        "Furnace door seals",
        "Coke oven door packing",
        "Boiler seal gaskets",
        "High-temperature pipe wrapping"
      ],
      keywords: ["ceramic rope", "gland packing", "braided rope", "furnace seal", "saket rope"],
      seo_title: "SAKET Ceramic Fiber Braided Rope & Packing | SARAR INDUSTRIES",
      seo_description: "Industrial ceramic fiber square and round braided ropes for high-temperature door seals and joint packing.",
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p4444444-4444-4444-4444-444444444444',
      name: 'SAKET Compressed Asbestos & Jointing Sheet',
      slug: 'saket-compressed-jointing-sheet',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      category_id: 'c3333333-3333-3333-3333-333333333333',
      short_description: 'High-grade compressed jointing sheets for flange gaskets under steam, gas, water, and chemical lines.',
      description: 'SAKET Compressed Jointing Sheets are formulated with reinforced fibers and resilient elastomeric binders, calendered under intense pressure. Engineered to provide reliable leak-proof sealing across industrial pipe flanges, valves, pumps, and engine assemblies.',
      main_image_url: '/images/products/saket-jointing-sheet.jpg',
      specifications: {
        "Sheet Dimensions": "1500 mm x 1500 mm / 1500 mm x 2000 mm",
        "Thickness": "0.5 mm to 5.0 mm",
        "Pressure Rating": "Up to 100 bar",
        "Max Temperature": "Up to 450°C"
      },
      applications: [
        "Steam pipelines and boilers",
        "Petrochemical and process plant flanges",
        "Automotive and marine engine gasketing",
        "Water and gas distribution systems"
      ],
      keywords: ["compressed jointing sheet", "gasket sheet", "flange gasket", "saket jointing", "sealing sheet"],
      seo_title: "SAKET Compressed Jointing Gasket Sheet | SARAR INDUSTRIES",
      seo_description: "Premium compressed industrial jointing sheets for flange sealing and pressure containment by SARAR INDUSTRIES.",
      is_featured: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p5555555-5555-5555-5555-555555555555',
      name: 'DWITECH Industrial Grade Rubber Sheets',
      slug: 'dwitech-industrial-rubber-sheets',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c4444444-4444-4444-4444-444444444444',
      short_description: 'Heavy-duty industrial rubber sheeting in Neoprene, Nitrile, EPDM, Natural, and Silicone polymers.',
      description: 'DWITECH Industrial Rubber Sheets are engineered for abrasion resistance, chemical tolerance, weathering resistance, and mechanical resilience. Manufactured to strict tolerances for industrial lining, gasket cutting, vibration dampening, and workbench surfacing.',
      main_image_url: '/images/products/dwitech-rubber-sheet.jpg',
      specifications: {
        "Elastomer Types": "Natural Rubber, Neoprene, Nitrile (NBR), EPDM, Silicone",
        "Standard Width": "1.0 m, 1.2 m, 1.5 m",
        "Thickness": "1.0 mm to 25.0 mm",
        "Hardness": "45 to 80 Shore A"
      },
      applications: [
        "Chute and hopper lining",
        "Flange gaskets and washers",
        "Electrical insulation and flooring",
        "Heavy machinery vibration isolation"
      ],
      keywords: ["industrial rubber sheets", "dwitech rubber", "neoprene sheet", "nitrile rubber", "epdm sheet"],
      seo_title: "DWITECH Industrial Rubber Sheets | SARAR INDUSTRIES",
      seo_description: "Heavy-duty industrial rubber sheets manufactured in Neoprene, Nitrile, EPDM, and Natural Rubber by SARAR INDUSTRIES.",
      is_featured: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p6666666-6666-6666-6666-666666666666',
      name: 'DWITECH Precision Molded Rubber Components',
      slug: 'dwitech-precision-molded-rubber-components',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Custom precision molded rubber bushes, bellows, diaphragms, and specialized industrial seals.',
      description: 'DWITECH Precision Molded Components are engineered to exact dimensional specifications using compression, transfer, and injection molding techniques. Designed to withstand mechanical stress, dynamic loading, and fluid exposure in heavy engineering and industrial machinery.',
      main_image_url: '/images/products/dwitech-molded-components.jpg',
      specifications: {
        "Materials": "NBR, EPDM, Neoprene, Viton (FKM), Natural Rubber",
        "Manufacturing Process": "Compression & Transfer Molding",
        "Hardness Tolerance": "± 5 Shore A",
        "Finish": "Smooth Industrial"
      },
      applications: [
        "Industrial valves and pumps",
        "Heavy engineering machinery",
        "Automotive and hydraulic assemblies",
        "Dynamic fluid sealing"
      ],
      keywords: ["molded rubber", "rubber bushes", "dwitech molded", "rubber bellows", "custom rubber seals"],
      seo_title: "DWITECH Precision Molded Rubber Components | SARAR INDUSTRIES",
      seo_description: "Custom precision molded industrial rubber components, bushes, and seals engineered by SARAR INDUSTRIES.",
      is_featured: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p7777777-7777-7777-7777-777777777777',
      name: 'DWITECH Extruded Rubber Profiles & Gaskets',
      slug: 'dwitech-extruded-rubber-profiles',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c5555555-5555-5555-5555-555555555555',
      short_description: 'Continuous extruded rubber profiles, U-channels, D-sections, P-profiles, and sponge cord seals.',
      description: 'DWITECH Extruded Rubber Profiles provide dependable weatherproofing, acoustic damping, and enclosure sealing for industrial cabinets, machinery housings, transport infrastructure, and architectural assemblies.',
      main_image_url: '/images/products/dwitech-extruded-profiles.jpg',
      specifications: {
        "Profiles": "U-Channel, D-Section, P-Section, Square, Round Cords",
        "Compounds": "EPDM, Neoprene, Silicone, Nitrile",
        "Forms": "Solid and Closed-Cell Sponge Rubber"
      },
      applications: [
        "Industrial enclosure sealing",
        "Machinery inspection doors",
        "HVAC duct and hatch sealing",
        "Infrastructure expansion seals"
      ],
      keywords: ["extruded rubber", "rubber profiles", "u channel rubber", "sponge cord", "dwitech seals"],
      seo_title: "DWITECH Extruded Rubber Profiles & Seals | SARAR INDUSTRIES",
      seo_description: "Continuous industrial extruded rubber profiles and custom sealing sections by SARAR INDUSTRIES.",
      is_featured: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'p8888888-8888-8888-8888-888888888888',
      name: 'DWITECH Heavy-Duty Anti-Vibration Mounts',
      slug: 'dwitech-anti-vibration-mounts',
      brand_id: 'b2222222-2222-2222-2222-222222222222',
      category_id: 'c6666666-6666-6666-6666-666666666666',
      short_description: 'Engineered elastomer-to-metal bonded mounts for damping structural vibrations and impact shock.',
      description: 'DWITECH Anti-Vibration Mounts utilize high-strength elastomeric compounds bonded with steel hardware to isolate heavy industrial equipment from floor vibration, reduce structural noise, and extend machinery operational life.',
      main_image_url: '/images/products/dwitech-vibration-mounts.jpg',
      specifications: {
        "Mount Types": "Cylindrical Bobbins, Sandwich Mounts, Flanged Machine Mounts",
        "Load Capacities": "50 kg to 5000 kg per mount",
        "Elastomer": "High-resilience Natural & Neoprene Rubber"
      },
      applications: [
        "Gensets, compressors, and pumps",
        "Industrial presses and mills",
        "HVAC chillers and air handling units",
        "Heavy industrial processing plant"
      ],
      keywords: ["anti vibration mounts", "rubber to metal bonded", "dwitech mounts", "shock dampers"],
      seo_title: "DWITECH Heavy-Duty Anti-Vibration Mounts | SARAR INDUSTRIES",
      seo_description: "Industrial rubber-to-metal bonded anti-vibration mounts for compressors, generators, and heavy machinery by SARAR INDUSTRIES.",
      is_featured: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  product_images: [],
  enquiries: [
    {
      id: 'e1111111-1111-1111-1111-111111111111',
      customer_name: 'Industrial Procurement Lead',
      company_name: 'Apex Heavy Engineering Works',
      phone: '+919876543210',
      email: 'procurement@apexengineering.example',
      brand_id: 'a1111111-1111-1111-1111-111111111111',
      product_id: 'p2222222-2222-2222-2222-222222222222',
      quantity: '50 Rolls (128 kg/m³)',
      message: 'Kindly send commercial quotation and technical specification sheet for SAKET Ceramic Fiber Blankets for our boiler refurbishment project.',
      status: 'New',
      internal_notes: 'Initial enquiry received via website. Call scheduled.',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ],
  users: [
    {
      id: 'u1111111-1111-1111-1111-111111111111',
      name: 'Siddharth Dwivedi',
      email: 'sararindustries@gmail.com',
      // Password hash for: Admin@Sarar2024!
      password_hash: bcrypt.hashSync('Admin@Sarar2024!', 10),
      role: 'superadmin',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

module.exports = {
  supabase,
  isConfigured,
  memoryStore
};
