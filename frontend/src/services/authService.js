import ApiClient from './api';

export const authService = {
  login: async (email, password) => {
    const res = await ApiClient.post('/auth/login', { email, password });
    if (res.data && res.data.token) {
      localStorage.setItem('sarar_admin_token', res.data.token);
      localStorage.setItem('sarar_admin_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },
  getCurrentUser: () => ApiClient.get('/auth/me'),
  logout: async () => {
    try {
      await ApiClient.post('/auth/logout');
    } catch (e) {
      // Ignore error on logout
    } finally {
      localStorage.removeItem('sarar_admin_token');
      localStorage.removeItem('sarar_admin_user');
    }
  },
  getStoredUser: () => {
    const userStr = localStorage.getItem('sarar_admin_user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  },
  isAuthenticated: () => {
    return Boolean(localStorage.getItem('sarar_admin_token'));
  }
};
