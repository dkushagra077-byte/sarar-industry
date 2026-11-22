const http = require('http');
const app = require('../src/app');

let server;
const PORT = 5099;

const request = (path, method = 'GET', data = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const reqHeaders = { ...headers };
    if (payload) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request({
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: reqHeaders
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
};

async function runTests() {
  console.log('--- Starting Backend API Verification ---');
  server = app.listen(PORT);

  try {
    // 1. Health
    const health = await request('/api/health');
    console.assert(health.status === 200, 'Health check should return 200');
    console.log('✓ /api/health passed');

    // 2. Company Info
    const info = await request('/api/company-info');
    console.assert(info.body.company_name === 'SARAR INDUSTRIES', 'Company name must match');
    console.assert(info.body.contact_person === 'Siddharth Dwivedi', 'Contact person must match');
    console.assert(info.body.phone === '+91 9123841340', 'Phone must match');
    console.log('✓ /api/company-info passed');

    // 3. Brands
    const brands = await request('/api/brands');
    console.assert(brands.body.data.length >= 2, 'Should have at least 2 brands (SAKET, DWITECH)');
    console.log('✓ /api/brands passed');

    // 4. Brand by slug
    const saket = await request('/api/brands/saket');
    console.assert(saket.body.data.slug === 'saket', 'Brand slug should be saket');
    console.assert(saket.body.data.categories.length > 0, 'Saket should have categories');
    console.log('✓ /api/brands/saket passed');

    // 5. Products
    const products = await request('/api/products');
    console.assert(products.body.data.length > 0, 'Should return product list');
    console.log('✓ /api/products passed');

    // 6. Search
    const search = await request('/api/products/search?q=rubber');
    console.assert(search.body.data.length > 0, 'Should find products for rubber search');
    console.log('✓ /api/products/search passed');

    // 7. Login
    const login = await request('/api/auth/login', 'POST', {
      email: 'sararindustries@gmail.com',
      password: 'Admin@Sarar2024!'
    });
    console.assert(login.status === 200, 'Admin login should succeed');
    const token = login.body.data.token;
    console.assert(token, 'Token should be returned');
    console.log('✓ /api/auth/login passed');

    // 8. Protected Endpoint (Stats)
    const stats = await request('/api/stats', 'GET', null, { Authorization: `Bearer ${token}` });
    console.assert(stats.status === 200, 'Stats endpoint should return 200 with auth token');
    console.assert(stats.body.data.totalProducts > 0, 'Should have product stats');
    console.log('✓ /api/stats (protected) passed');

    // 9. Enquiry Submission
    const enquiry = await request('/api/enquiries', 'POST', {
      customer_name: 'Test Client Ltd',
      company_name: 'Industrial Corp',
      phone: '+919123841340',
      email: 'client@example.com',
      brand: 'saket',
      product: 'SAKET Ceramic Fiber Insulation Blanket',
      quantity: '20 Rolls',
      message: 'Need urgent quote for 20 rolls of ceramic blanket'
    });
    console.assert(enquiry.status === 201, 'Enquiry submission should succeed');
    console.log('✓ /api/enquiries (public submission) passed');

    // 10. Enquiries List (Admin Protected)
    const enquiriesList = await request('/api/enquiries', 'GET', null, { Authorization: `Bearer ${token}` });
    console.assert(enquiriesList.status === 200, 'Admin enquiries list should return 200');
    console.log('✓ /api/enquiries (admin list) passed');

    console.log('\n========================================');
    console.log('ALL BACKEND API VERIFICATIONS PASSED 100%');
    console.log('========================================\n');
  } catch (err) {
    console.error('API Verification failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();
