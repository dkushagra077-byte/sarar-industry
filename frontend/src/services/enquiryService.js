import ApiClient from './api';

export const enquiryService = {
  submit: (data) => ApiClient.post('/enquiries', data),
  getAll: (params = {}) => ApiClient.get('/enquiries', params),
  getById: (id) => ApiClient.get(`/enquiries/${id}`),
  updateStatus: (id, status, notes = null) => ApiClient.put(`/enquiries/${id}/status`, { status, internal_notes: notes }),
  exportCSV: async () => {
    const blob = await ApiClient.request('/enquiries/export/csv', { method: 'GET' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sarar_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};
