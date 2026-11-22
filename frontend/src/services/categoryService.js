import ApiClient from './api';

export const categoryService = {
  getAll: (params = {}) => ApiClient.get('/categories', params),
  getBySlug: (slug) => ApiClient.get(`/categories/${slug}`),
  create: (data) => ApiClient.post('/categories', data),
  update: (id, data) => ApiClient.put(`/categories/${id}`, data),
  delete: (id) => ApiClient.delete(`/categories/${id}`)
};
