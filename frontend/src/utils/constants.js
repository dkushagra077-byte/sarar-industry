export const COMPANY_INFO = {
  name: 'SARAR INDUSTRIES',
  type: 'Manufacturers of Industrial Insulation & Sealing Products',
  contactPerson: 'Siddharth Dwivedi',
  phone: '+91 9123841340',
  phoneRaw: '919123841340',
  email: 'sararindustries@gmail.com',
  experienceYears: '50+',
  brands: {
    saket: {
      name: 'SAKET',
      slug: 'saket',
      tagline: 'Industrial Insulation & Sealing Solutions',
      description: 'Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.',
      path: '/brands/saket',
      color: '#b45309'
    },
    dwitech: {
      name: 'DWITECH',
      slug: 'dwitech',
      tagline: 'Rubber & Engineered Industrial Components',
      description: 'Rubber products and engineered components designed to meet industrial requirements.',
      path: '/brands/dwitech',
      color: '#1d4ed8'
    }
  },
  industriesServed: [
    { title: 'Manufacturing', desc: 'High-temperature thermal barriers, furnace seals, and custom gasketing for heavy manufacturing operations.' },
    { title: 'Engineering', desc: 'Precision engineered elastomer components, vibration mounts, and mechanical fluid seals.' },
    { title: 'Power Generation', desc: 'Thermal boiler insulation, high-pressure steam jointing, and ceramic expansion wraps.' },
    { title: 'Industrial Processing', desc: 'Chemical-resistant rubber sheeting, pipe flange gaskets, and process sealing materials.' },
    { title: 'Infrastructure', desc: 'Continuous extruded elastomer profiles, architectural expansion joints, and equipment mountings.' },
    { title: 'Heavy Industries', desc: 'Abrasion-resistant rubber liners, furnace door seals, and extreme-duty industrial packing.' }
  ],
  whyChooseUs: [
    { title: '50+ Years of Manufacturing Experience', desc: 'Over five decades of deep technical knowledge, craftsmanship, and reliable industrial production.' },
    { title: 'Two Specialized Product Brands', desc: 'Dedicated focus through SAKET for insulation and sealing, and DWITECH for rubber and engineered products.' },
    { title: 'Industrial Product Expertise', desc: 'In-depth engineering understanding of thermal barriers, fluid containment, and mechanical damping.' },
    { title: 'Quality and Reliability', desc: 'Rigorous manufacturing focus delivering consistent performance across harsh industrial environments.' },
    { title: 'Customer-Focused Approach', desc: 'Direct engagement with engineers, procurement heads, and plant managers to solve specific operational challenges.' },
    { title: 'Direct Manufacturer Enquiries', desc: 'Eliminate intermediary delays and markup with direct access to Siddharth Dwivedi and our manufacturing team.' }
  ]
};

export const getWhatsAppLink = (productName = null, brandName = null) => {
  const number = COMPANY_INFO.phoneRaw;
  let text = '';
  if (productName && brandName) {
    text = `Hello SARAR INDUSTRIES, I am interested in ${productName} under the ${brandName} brand. Please share its specifications, availability and quotation.`;
  } else {
    text = 'Hello SARAR INDUSTRIES, I would like to enquire about your industrial products. Please share the product details and quotation.';
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};
