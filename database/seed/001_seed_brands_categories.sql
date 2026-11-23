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
        '/logos/Saket.jpeg',
        'active'
    ),
    (
        'b2222222-2222-2222-2222-222222222222',
        'DWITECH',
        'dwitech',
        'Rubber products and engineered components designed to meet industrial requirements.',
        '/logos/Dwitech.jpeg',
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

-- Create the administrator with the private backend CLI after applying this seed.

-- 5. Replace the old SAKET catalogue, then seed SAKET & DWITECH products
DELETE FROM products WHERE brand_id = 'a1111111-1111-1111-1111-111111111111';

INSERT INTO products (
    id, name, slug, brand_id, category_id, short_description, description, 
    main_image_url, specifications, applications, keywords, seo_title, seo_description, is_featured, status
)
VALUES
    (
        '91111111-1111-4111-8111-111111111111',
        'Asbestos Handgloves',
        'asbestos-handgloves',
        'a1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Asbestos Handgloves. Contact us for verified specifications and availability.',
        'Asbestos Handgloves. Contact us for verified specifications and availability.',
        '/images/products/asbestos-handgloves.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['asbestos handgloves', 'gloves'],
        'Asbestos Handgloves | SARAR INDUSTRIES',
        'Asbestos Handgloves from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111112-1111-4111-8111-111111111112',
        'Ceramic fibre blanket',
        'ceramic-fibre-blanket',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Ceramic fibre blanket. Contact us for verified specifications and availability.',
        'Ceramic fibre blanket. Contact us for verified specifications and availability.',
        '/images/products/ceramic-fibre-blanket.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['ceramic fibre blanket', 'blanket'],
        'Ceramic fibre blanket | SARAR INDUSTRIES',
        'Ceramic fibre blanket from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111113-1111-4111-8111-111111111113',
        'Cotton gland packing',
        'cotton-gland-packing',
        'a1111111-1111-1111-1111-111111111111',
        'c3333333-3333-3333-3333-333333333333',
        'Cotton gland packing. Contact us for verified specifications and availability.',
        'Cotton gland packing. Contact us for verified specifications and availability.',
        '/images/products/cotton-gland-packing.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['cotton gland packing', 'packing'],
        'Cotton gland packing | SARAR INDUSTRIES',
        'Cotton gland packing from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111114-1111-4111-8111-111111111114',
        'Glass Fibre rope',
        'glass-fibre-rope',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Glass Fibre rope. Contact us for verified specifications and availability.',
        'Glass Fibre rope. Contact us for verified specifications and availability.',
        '/images/products/glass-fibre-rope.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['glass fibre rope', 'rope'],
        'Glass Fibre rope | SARAR INDUSTRIES',
        'Glass Fibre rope from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111115-1111-4111-8111-111111111115',
        'Glass Fibre Tape',
        'glass-fibre-tape',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Glass Fibre Tape. Contact us for verified specifications and availability.',
        'Glass Fibre Tape. Contact us for verified specifications and availability.',
        '/images/products/glass-fibre-tape.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['glass fibre tape', 'tape'],
        'Glass Fibre Tape | SARAR INDUSTRIES',
        'Glass Fibre Tape from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111116-1111-4111-8111-111111111116',
        'Ceramic tape',
        'ceramic-tape',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Ceramic tape. Contact us for verified specifications and availability.',
        'Ceramic tape. Contact us for verified specifications and availability.',
        '/images/products/ceramic-tape.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['ceramic tape', 'tape'],
        'Ceramic tape | SARAR INDUSTRIES',
        'Ceramic tape from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111117-1111-4111-8111-111111111117',
        'Asbestos tape',
        'asbestos-tape',
        'a1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Asbestos tape. Contact us for verified specifications and availability.',
        'Asbestos tape. Contact us for verified specifications and availability.',
        '/images/products/asbestos-tape.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['asbestos tape', 'tape'],
        'Asbestos tape | SARAR INDUSTRIES',
        'Asbestos tape from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111118-1111-4111-8111-111111111118',
        'Non Asbestos-Ceramic gland packing',
        'non-asbestos-ceramic-gland-packing',
        'a1111111-1111-1111-1111-111111111111',
        'c3333333-3333-3333-3333-333333333333',
        'Non Asbestos-Ceramic gland packing. Contact us for verified specifications and availability.',
        'Non Asbestos-Ceramic gland packing. Contact us for verified specifications and availability.',
        '/images/products/non-asbestos-ceramic-gland-packing.jpeg',
        '{}'::jsonb,
        '[]'::jsonb,
        ARRAY['non asbestos ceramic gland packing', 'gland packing'],
        'Non Asbestos-Ceramic gland packing | SARAR INDUSTRIES',
        'Non Asbestos-Ceramic gland packing from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111119-1111-4111-8111-111111111119',
        'Asbestos gland packing (3mm to 150mm)',
        'asbestos-gland-packing-3mm-to-150mm',
        'a1111111-1111-1111-1111-111111111111',
        'c3333333-3333-3333-3333-333333333333',
        'Asbestos gland packing (3mm to 150mm). Contact us for verified specifications and availability.',
        'Asbestos gland packing (3mm to 150mm). Contact us for verified specifications and availability.',
        '/images/products/asbestos-gland-packing-3mm-to-150mm.jpeg',
        '{"Available size":"3mm to 150mm"}'::jsonb,
        '[]'::jsonb,
        ARRAY['asbestos gland packing', 'gland packing', '3mm to 150mm'],
        'Asbestos gland packing (3mm to 150mm) | SARAR INDUSTRIES',
        'Asbestos gland packing (3mm to 150mm) from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111120-1111-4111-8111-111111111120',
        'Ceramic rope (1.5mm to 150mm)',
        'ceramic-rope-1-5mm-to-150mm',
        'a1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Ceramic rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
        'Ceramic rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
        '/images/products/ceramic-rope-1-5mm-to-150mm.jpeg',
        '{"Available size":"1.5mm to 150mm"}'::jsonb,
        '[]'::jsonb,
        ARRAY['ceramic rope', 'rope', '1.5mm to 150mm'],
        'Ceramic rope (1.5mm to 150mm) | SARAR INDUSTRIES',
        'Ceramic rope (1.5mm to 150mm) from the SAKET product catalogue.',
        FALSE,
        'active'
    ),
    (
        '91111121-1111-4111-8111-111111111121',
        'Asbestos rope (1.5mm to 150mm)',
        'asbestos-rope-1-5mm-to-150mm',
        'a1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Asbestos rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
        'Asbestos rope (1.5mm to 150mm). Contact us for verified specifications and availability.',
        '/images/products/asbestos-rope-1-5mm-to-150mm.jpeg',
        '{"Available size":"1.5mm to 150mm"}'::jsonb,
        '[]'::jsonb,
        ARRAY['asbestos rope', 'rope', '1.5mm to 150mm'],
        'Asbestos rope (1.5mm to 150mm) | SARAR INDUSTRIES',
        'Asbestos rope (1.5mm to 150mm) from the SAKET product catalogue.',
        FALSE,
        'active'
    ),    (
        '91111122-1111-4111-8111-111111111122',
        'Asbestos cloth', 'asbestos-cloth',
        'a1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111',
        'Asbestos cloth. Contact us for verified specifications and availability.',
        'Asbestos cloth. Contact us for verified specifications and availability.',
        '/images/products/asbestos-cloth.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['asbestos cloth', 'cloth'], 'Asbestos cloth | SARAR INDUSTRIES',
        'Asbestos cloth from the SAKET product catalogue.', FALSE, 'active'
    ),
    (
        '91111123-1111-4111-8111-111111111123',
        'Ceramic cloth', 'ceramic-cloth',
        'a1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222',
        'Ceramic cloth. Contact us for verified specifications and availability.',
        'Ceramic cloth. Contact us for verified specifications and availability.',
        '/images/products/ceramic-cloth.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['ceramic cloth', 'cloth'], 'Ceramic cloth | SARAR INDUSTRIES',
        'Ceramic cloth from the SAKET product catalogue.', FALSE, 'active'
    ),
    (
        '91111124-1111-4111-8111-111111111124',
        'Cut Gaskets', 'cut-gaskets',
        'a1111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333',
        'Cut Gaskets. Contact us for verified specifications and availability.',
        'Cut Gaskets. Contact us for verified specifications and availability.',
        '/images/products/cut-gaskets.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['cut gaskets', 'gaskets'], 'Cut Gaskets | SARAR INDUSTRIES',
        'Cut Gaskets from the SAKET product catalogue.', FALSE, 'active'
    ),
    (
        '91111125-1111-4111-8111-111111111125',
        'Spiral Wound Gasket', 'spiral-wound-gasket',
        'a1111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333',
        'Spiral Wound Gasket. Contact us for verified specifications and availability.',
        'Spiral Wound Gasket. Contact us for verified specifications and availability.',
        '/images/products/spiral-wound-gasket.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['spiral wound gasket', 'gasket'], 'Spiral Wound Gasket | SARAR INDUSTRIES',
        'Spiral Wound Gasket from the SAKET product catalogue.', FALSE, 'active'
    ),
(
        '91111126-1111-4111-8111-111111111126',
        'Brake Liner', 'brake-liner',
        'a1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111',
        'Brake Liner. Contact us for verified specifications and availability.',
        'Brake Liner. Contact us for verified specifications and availability.',
        '/images/products/brake-liner.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['brake liner', 'brake lining'], 'Brake Liner | SARAR INDUSTRIES',
        'Brake Liner from the SAKET product catalogue.', FALSE, 'active'
    ),    (
        '92222222-2222-4222-8222-222222222222',
        'Rubber O Rings', 'rubber-o-rings',
        'b2222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555',
        'Rubber O Rings. Contact us for verified specifications and availability.',
        'Rubber O Rings. Contact us for verified specifications and availability.',
        '/images/products/rubber-o-rings.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber o rings', 'o rings'], 'Rubber O Rings | SARAR INDUSTRIES',
        'Rubber O Rings from the DWITECH product catalogue.', FALSE, 'active'
    )
,
    (
        '92222223-2222-4222-8222-222222222223',
        'Rubber Sheet', 'rubber-sheet',
        'b2222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444',
        'Rubber Sheet. Contact us for verified specifications and availability.',
        'Rubber Sheet. Contact us for verified specifications and availability.',
        '/images/products/rubber-sheet.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber sheet', 'rubber sheets'], 'Rubber Sheet | SARAR INDUSTRIES',
        'Rubber Sheet from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222224-2222-4222-8222-222222222224',
        'Conveyer Belts', 'conveyer-belts',
        'b2222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444',
        'Conveyer Belts. Contact us for verified specifications and availability.',
        'Conveyer Belts. Contact us for verified specifications and availability.',
        '/images/products/conveyer-belts.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['conveyer belts', 'conveyor belts'], 'Conveyer Belts | SARAR INDUSTRIES',
        'Conveyer Belts from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222225-2222-4222-8222-222222222225',
        'Rubber Gaskets', 'rubber-gaskets',
        'b2222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555',
        'Rubber Gaskets. Contact us for verified specifications and availability.',
        'Rubber Gaskets. Contact us for verified specifications and availability.',
        '/images/products/rubber-gaskets.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber gaskets', 'gaskets'], 'Rubber Gaskets | SARAR INDUSTRIES',
        'Rubber Gaskets from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222226-2222-4222-8222-222222222226',
        'Rubber Cord', 'rubber-cord',
        'b2222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555',
        'Rubber Cord. Contact us for verified specifications and availability.',
        'Rubber Cord. Contact us for verified specifications and availability.',
        '/images/products/rubber-cord.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber cord', 'rubber cords'], 'Rubber Cord | SARAR INDUSTRIES',
        'Rubber Cord from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222227-2222-4222-8222-222222222227',
        'Rubber Liner', 'rubber-liner',
        'b2222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444',
        'Rubber Liner. Contact us for verified specifications and availability.',
        'Rubber Liner. Contact us for verified specifications and availability.',
        '/images/products/rubber-liner.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber liner', 'rubber lining'], 'Rubber Liner | SARAR INDUSTRIES',
        'Rubber Liner from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222228-2222-4222-8222-222222222228',
        'Rubber Hose', 'rubber-hose',
        'b2222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444',
        'Rubber Hose. Contact us for verified specifications and availability.',
        'Rubber Hose. Contact us for verified specifications and availability.',
        '/images/products/rubber-hose.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber hose', 'rubber hoses'], 'Rubber Hose | SARAR INDUSTRIES',
        'Rubber Hose from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222229-2222-4222-8222-222222222229',
        'Rubber Diaphragm', 'rubber-diaphragm',
        'b2222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555',
        'Rubber Diaphragm. Contact us for verified specifications and availability.',
        'Rubber Diaphragm. Contact us for verified specifications and availability.',
        '/images/products/rubber-diaphragm.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['rubber diaphragm', 'rubber diaphragms'], 'Rubber Diaphragm | SARAR INDUSTRIES',
        'Rubber Diaphragm from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222230-2222-4222-8222-222222222230',
        'Custom Rubber Mouldings', 'custom-rubber-mouldings',
        'b2222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555',
        'Custom Rubber Mouldings. Contact us for verified specifications and availability.',
        'Custom Rubber Mouldings. Contact us for verified specifications and availability.',
        '/images/products/custom-rubber-mouldings.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['custom rubber mouldings', 'rubber mouldings'], 'Custom Rubber Mouldings | SARAR INDUSTRIES',
        'Custom Rubber Mouldings from the DWITECH product catalogue.', FALSE, 'active'
    ),
    (
        '92222231-2222-4222-8222-222222222231',
        'Expansion Joints', 'expansion-joints',
        'b2222222-2222-2222-2222-222222222222', 'c6666666-6666-6666-6666-666666666666',
        'Expansion Joints. Contact us for verified specifications and availability.',
        'Expansion Joints. Contact us for verified specifications and availability.',
        '/images/products/expansion-joints.jpeg', '{}'::jsonb, '[]'::jsonb,
        ARRAY['expansion joints', 'rubber expansion joints'], 'Expansion Joints | SARAR INDUSTRIES',
        'Expansion Joints from the DWITECH product catalogue.', FALSE, 'active'
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
