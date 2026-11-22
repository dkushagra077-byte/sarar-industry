import ApiClient from './api';

export const brandService = {
  getAll: (all = false) => ApiClient.get('/brands', { all }),
  getBySlug: (slug) => ApiClient.get(`/brands/${slug}`),
  update: (id, data) => ApiClient.put(`/brands/${id}`, data)
};
