-- ====================================================================
-- SEED DATA FOR SARAR INDUSTRIES DATABASE
-- Brands: SAKET and DWITECH
-- Based strictly on official company & brand details
-- ====================================================================

-- 1. Insert Brands
INSERT INTO brands (id, name, slug, description, logo_url, status)
VALUES
    (
        'a1111111-1111-1111-1111-111111111111',
        'SAKET',
        'saket',
        'Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.',
        '/logos/saket-logo.svg',
        'active'
    ),
    (
        'b2222222-2222-2222-2222-222222222222',
        'DWITECH',
        'dwitech',
        'Rubber products and engineered components designed to meet industrial requirements.',
        '/logos/dwitech-logo.svg',
        'active'
    )
ON CONFLICT (slug) DO UPDATE 
SET description = EXCLUDED.description,
    logo_url = EXCLUDED.logo_url,
    status = EXCLUDED.status;

-- 2. Insert Categories for SAKET
INSERT INTO categories (id, name, slug, brand_id, description, image_url, status)
VALUES
    (
        'c1111111-1111-1111-1111-111111111111',
        'Asbestos & Non-Asbestos Products',
        'asbestos-products',
        'a1111111-1111-1111-1111-111111111111',
        'Industrial insulation millboards, yarn, cloth, and jointing sheets engineered for thermal resistance.',
        '/images/categories/asbestos-products.jpg',
        'active'
    ),
    (
        'c2222222-2222-2222-2222-222222222222',
        'Ceramic Insulation Products',
        'ceramic-insulation-products',
        'a1111111-1111-1111-1111-111111111111',
        'High-temperature ceramic blankets, ropes, boards, and textiles for industrial thermal insulation.',
        '/images/categories/ceramic-insulation.jpg',
        'active'
    ),
    (
        'c3333333-3333-3333-3333-333333333333',
        'Industrial Sealing & Gasketing',
        'industrial-sealing-gaskets',
        'a1111111-1111-1111-1111-111111111111',
        'Precision industrial gaskets, jointing sheets, and sealing materials for fluid and pressure containment.',
        '/images/categories/industrial-sealing.jpg',
        'active'
    )
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- 3. Insert Categories for DWITECH
INSERT INTO categories (id, name, slug, brand_id, description, image_url, status)
VALUES
    (
        'c4444444-4444-4444-4444-444444444444',
        'Industrial Rubber Products',
        'industrial-rubber-products',
        'b2222222-2222-2222-2222-222222222222',
        'Heavy-duty industrial rubber sheets, rolls, and mats engineered for durability and resilient wear.',
        '/images/categories/rubber-products.jpg',
        'active'
    ),
    (
        'c5555555-5555-5555-5555-555555555555',
        'Molded & Extruded Rubber Components',
        'molded-extruded-rubber',
        'b2222222-2222-2222-2222-222222222222',
        'Precision molded rubber bushes, seals, O-rings, and custom extruded rubber profiles.',
        '/images/categories/molded-rubber.jpg',
        'active'
    ),
    (
        'c6666666-6666-6666-6666-666666666666',
        'Engineered Industrial Components',
        'engineered-components',
        'b2222222-2222-2222-2222-222222222222',
        'Engineered elastomer parts, vibration dampers, and tailored components for industrial equipment.',
        '/images/categories/engineered-components.jpg',
        'active'
    )
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- 4. Insert Default Admin User
-- Email: admin@sararindustries.com
-- Default Initial Password: Admin@Sarar2024!
-- Hash generated via bcrypt (cost factor 10):
INSERT INTO users (id, name, email, password_hash, role, status)
VALUES (
    'u1111111-1111-1111-1111-111111111111',
    'Siddharth Dwivedi',
    'sararindustries@gmail.com',
    '$2a$10$3z7Yp4F0N4U7p3N2Z4d5ye7mP9K6A9xL3kX3kE7eB9d8fG7hJ1y6G',
    'superadmin',
    'active'
)
ON CONFLICT (email) DO UPDATE 
SET name = EXCLUDED.name,
    role = EXCLUDED.role,
    status = EXCLUDED.status;

-- 5. Insert Core Products for SAKET & DWITECH
INSERT INTO products (
    id, name, slug, brand_id, category_id, short_description, description, 
    main_image_url, specifications, applications, keywords, seo_title, seo_description, is_featured, status
)
VALUES
    (
        'p1111111-1111-1111-1111-111111111111',
        'SAKET Asbestos Millboard Sheet',
        'saket-asbestos-millboard-sheet',
        'a1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Dense, heat-resistant industrial insulation millboard engineered for thermal barriers and gaskets.',
        'SAKET Asbestos Millboard is manufactured using select high-grade asbestos fibers and heat-resistant binders. Engineered for high thermal insulation, flange gasketing, furnace linings, and industrial heat shielding. Produced with over 50 years of manufacturing experience for consistent density, thermal stability, and mechanical strength.',
        '/images/products/saket-millboard.jpg',
        '{"Thickness": "1.5 mm to 12.0 mm", "Standard Size": "1000 mm x 1000 mm", "Thermal Resistance": "Up to 500°C", "Density": "0.90 to 1.10 g/cm³"}'::jsonb,
        '["Furnace and boiler insulation", "Industrial heat shielding", "Exhaust manifold gaskets", "Foundry and metallurgical protection"]'::jsonb,
        ARRAY['asbestos millboard', 'thermal insulation', 'saket millboard', 'industrial insulation'],
        'SAKET Asbestos Millboard Sheet | SARAR INDUSTRIES',
        'High-performance industrial asbestos millboard sheet for high-temperature thermal barriers and gasketing by SARAR INDUSTRIES.',
        TRUE,
        'active'
    ),
    (
        'p2222222-2222-2222-2222-222222222222',
        'SAKET Ceramic Fiber Insulation Blanket',
        'saket-ceramic-fiber-blanket',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Spun ceramic fiber blanket delivering exceptional thermal stability and low thermal conductivity.',
        'SAKET Ceramic Fiber Blanket is produced from high-purity alumina-silica spun ceramic fibers, double needle-punched for high tensile strength and integrity under extreme thermal cycling. Designed for furnace linings, kiln insulation, pipe wraps, and expansion joints.',
        '/images/products/saket-ceramic-blanket.jpg',
        '{"Temperature Classification": "1260°C to 1425°C", "Density Range": "64, 96, 128 kg/m³", "Standard Thickness": "12.5 mm, 25 mm, 50 mm", "Width": "610 mm / 1220 mm"}'::jsonb,
        '["Industrial furnace and kiln lining", "Pipe and duct high-temp insulation", "Expansion joints and heat seals", "Power generation boiler insulation"]'::jsonb,
        ARRAY['ceramic fiber blanket', 'high temperature insulation', 'saket ceramic', 'furnace lining'],
        'SAKET Ceramic Fiber Insulation Blanket | SARAR INDUSTRIES',
        'High-temperature spun ceramic fiber blanket for industrial kilns, furnaces, and pipelines by SARAR INDUSTRIES.',
        TRUE,
        'active'
    ),
    (
        'p3333333-3333-3333-3333-333333333333',
        'SAKET Ceramic Fiber Braided Rope & Packing',
        'saket-ceramic-fiber-rope',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Dense square and round braided ceramic rope for industrial door sealing, expansion joints, and caulking.',
        'SAKET Ceramic Fiber Rope is manufactured by braiding high-temperature ceramic yarns, reinforced for structural stability. It serves as an optimal industrial seal for furnace doors, oven seals, boiler inspection doors, and high-temperature expansion joint packing.',
        '/images/products/saket-ceramic-rope.jpg',
        '{"Cross Section": "Round / Square Braided", "Diameter / Size": "6 mm to 50 mm", "Service Temperature": "Up to 1260°C", "Reinforcement": "Fiberglass / SS Wire Insertion"}'::jsonb,
        '["Furnace door seals", "Coke oven door packing", "Boiler seal gaskets", "High-temperature pipe wrapping"]'::jsonb,
        ARRAY['ceramic rope', 'gland packing', 'braided rope', 'furnace seal', 'saket rope'],
        'SAKET Ceramic Fiber Braided Rope & Packing | SARAR INDUSTRIES',
        'Industrial ceramic fiber square and round braided ropes for high-temperature door seals and joint packing.',
        FALSE,
        'active'
    ),
    (
        'p4444444-4444-4444-4444-444444444444',
        'SAKET Compressed Asbestos & Jointing Sheet',
        'saket-compressed-jointing-sheet',
        'a1111111-1111-1111-1111-111111111111',
        'c3333333-3333-3333-3333-333333333333',
        'High-grade compressed jointing sheets for flange gaskets under steam, gas, water, and chemical lines.',
        'SAKET Compressed Jointing Sheets are formulated with reinforced fibers and resilient elastomeric binders, calendered under intense pressure. Engineered to provide reliable leak-proof sealing across industrial pipe flanges, valves, pumps, and engine assemblies.',
        '/images/products/saket-jointing-sheet.jpg',
        '{"Sheet Dimensions": "1500 mm x 1500 mm / 1500 mm x 2000 mm", "Thickness": "0.5 mm to 5.0 mm", "Pressure Rating": "Up to 100 bar", "Max Temperature": "Up to 450°C"}'::jsonb,
        '["Steam pipelines and boilers", "Petrochemical and process plant flanges", "Automotive and marine engine gasketing", "Water and gas distribution systems"]'::jsonb,
        ARRAY['compressed jointing sheet', 'gasket sheet', 'flange gasket', 'saket jointing', 'sealing sheet'],
        'SAKET Compressed Jointing Gasket Sheet | SARAR INDUSTRIES',
        'Premium compressed industrial jointing sheets for flange sealing and pressure containment by SARAR INDUSTRIES.',
        TRUE,
        'active'
    ),
    (
        'p5555555-5555-5555-5555-555555555555',
        'DWITECH Industrial Grade Rubber Sheets',
        'dwitech-industrial-rubber-sheets',
        'b2222222-2222-2222-2222-222222222222',
        'c4444444-4444-4444-4444-444444444444',
        'Heavy-duty industrial rubber sheeting in Neoprene, Nitrile, EPDM, Natural, and Silicone polymers.',
        'DWITECH Industrial Rubber Sheets are engineered for abrasion resistance, chemical tolerance, weathering resistance, and mechanical resilience. Manufactured to strict tolerances for industrial lining, gasket cutting, vibration dampening, and workbench surfacing.',
        '/images/products/dwitech-rubber-sheet.jpg',
        '{"Elastomer Types": "Natural Rubber, Neoprene, Nitrile (NBR), EPDM, Silicone", "Standard Width": "1.0 m, 1.2 m, 1.5 m", "Thickness": "1.0 mm to 25.0 mm", "Hardness": "45 to 80 Shore A"}'::jsonb,
        '["Chute and hopper lining", "Flange gaskets and washers", "Electrical insulation and flooring", "Heavy machinery vibration isolation"]'::jsonb,
        ARRAY['industrial rubber sheets', 'dwitech rubber', 'neoprene sheet', 'nitrile rubber', 'epdm sheet'],
        'DWITECH Industrial Rubber Sheets | SARAR INDUSTRIES',
        'Heavy-duty industrial rubber sheets manufactured in Neoprene, Nitrile, EPDM, and Natural Rubber by SARAR INDUSTRIES.',
        TRUE,
        'active'
    ),
    (
        'p6666666-6666-6666-6666-666666666666',
        'DWITECH Precision Molded Rubber Components',
        'dwitech-precision-molded-rubber-components',
        'b2222222-2222-2222-2222-222222222222',
        'c5555555-5555-5555-5555-555555555555',
        'Custom precision molded rubber bushes, bellows, diaphragms, and specialized industrial seals.',
        'DWITECH Precision Molded Components are engineered to exact dimensional specifications using compression, transfer, and injection molding techniques. Designed to withstand mechanical stress, dynamic loading, and fluid exposure in heavy engineering and industrial machinery.',
        '/images/products/dwitech-molded-components.jpg',
        '{"Materials": "NBR, EPDM, Neoprene, Viton (FKM), Natural Rubber", "Manufacturing Process": "Compression & Transfer Molding", "Hardness Tolerance": "± 5 Shore A", "Finish": "Smooth Industrial"}'::jsonb,
        '["Industrial valves and pumps", "Heavy engineering machinery", "Automotive and hydraulic assemblies", "Dynamic fluid sealing"]'::jsonb,
        ARRAY['molded rubber', 'rubber bushes', 'dwitech molded', 'rubber bellows', 'custom rubber seals'],
        'DWITECH Precision Molded Rubber Components | SARAR INDUSTRIES',
        'Custom precision molded industrial rubber components, bushes, and seals engineered by SARAR INDUSTRIES.',
        TRUE,
        'active'
    ),
    (
        'p7777777-7777-7777-7777-777777777777',
        'DWITECH Extruded Rubber Profiles & Gaskets',
        'dwitech-extruded-rubber-profiles',
        'b2222222-2222-2222-2222-222222222222',
        'c5555555-5555-5555-5555-555555555555',
        'Continuous extruded rubber profiles, U-channels, D-sections, P-profiles, and sponge cord seals.',
        'DWITECH Extruded Rubber Profiles provide dependable weatherproofing, acoustic damping, and enclosure sealing for industrial cabinets, machinery housings, transport infrastructure, and architectural assemblies.',
        '/images/products/dwitech-extruded-profiles.jpg',
        '{"Profiles": "U-Channel, D-Section, P-Section, Square, Round Cords", "Compounds": "EPDM, Neoprene, Silicone, Nitrile", "Forms": "Solid and Closed-Cell Sponge Rubber"}'::jsonb,
        '["Industrial enclosure sealing", "Machinery inspection doors", "HVAC duct and hatch sealing", "Infrastructure expansion seals"]'::jsonb,
        ARRAY['extruded rubber', 'rubber profiles', 'u channel rubber', 'sponge cord', 'dwitech seals'],
        'DWITECH Extruded Rubber Profiles & Seals | SARAR INDUSTRIES',
        'Continuous industrial extruded rubber profiles and custom sealing sections by SARAR INDUSTRIES.',
        FALSE,
        'active'
    ),
    (
        'p8888888-8888-8888-8888-888888888888',
        'DWITECH Heavy-Duty Anti-Vibration Mounts',
        'dwitech-anti-vibration-mounts',
        'b2222222-2222-2222-2222-222222222222',
        'c6666666-6666-6666-6666-666666666666',
        'Engineered elastomer-to-metal bonded mounts for damping structural vibrations and impact shock.',
        'DWITECH Anti-Vibration Mounts utilize high-strength elastomeric compounds bonded with steel hardware to isolate heavy industrial equipment from floor vibration, reduce structural noise, and extend machinery operational life.',
        '/images/products/dwitech-vibration-mounts.jpg',
        '{"Mount Types": "Cylindrical Bobbins, Sandwich Mounts, Flanged Machine Mounts", "Load Capacities": "50 kg to 5000 kg per mount", "Elastomer": "High-resilience Natural & Neoprene Rubber"}'::jsonb,
        '["Gensets, compressors, and pumps", "Industrial presses and mills", "HVAC chillers and air handling units", "Heavy industrial processing plant"]'::jsonb,
        ARRAY['anti vibration mounts', 'rubber to metal bonded', 'dwitech mounts', 'shock dampers'],
        'DWITECH Heavy-Duty Anti-Vibration Mounts | SARAR INDUSTRIES',
        'Industrial rubber-to-metal bonded anti-vibration mounts for compressors, generators, and heavy machinery by SARAR INDUSTRIES.',
        TRUE,
        'active'
    )
ON CONFLICT (brand_id, slug) DO UPDATE
SET name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    main_image_url = EXCLUDED.main_image_url,
    specifications = EXCLUDED.specifications,
    applications = EXCLUDED.applications,
    keywords = EXCLUDED.keywords,
    is_featured = EXCLUDED.is_featured,
    status = EXCLUDED.status;
