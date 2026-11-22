import ApiClient from './api';

export const productService = {
  getAll: (params = {}) => ApiClient.get('/products', params),
  getByBrandAndSlug: (brandSlug, productSlug) => ApiClient.get(`/products/brand/${brandSlug}/${productSlug}`),
  getById: (id) => ApiClient.get(`/products/${id}`),
  search: (query) => ApiClient.get('/products/search', { q: query }),
  create: (data) => ApiClient.post('/products', data),
  update: (id, data) => ApiClient.put(`/products/${id}`, data),
  delete: (id) => ApiClient.delete(`/products/${id}`),
  uploadImage: (formData) => ApiClient.post('/upload', formData)
};
