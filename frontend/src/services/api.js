const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class ApiClient {
  static getAuthToken() {
    return localStorage.getItem('sarar_admin_token') || null;
  }

  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // If sending FormData (multipart for images), remove Content-Type so browser sets boundary
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);

      // Handle file downloads like CSV
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/csv')) {
        const blob = await response.blob();
        return blob;
      }

      const data = await response.json();

      if (!response.ok) {
        // If unauthorized, clear token
        if (response.status === 401 && window.location.pathname.startsWith('/admin')) {
          localStorage.removeItem('sarar_admin_token');
          localStorage.removeItem('sarar_admin_user');
          if (window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
          }
        }
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error.message);
      throw error;
    }
  }

  static get(endpoint, params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });
    const queryString = query.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  static post(endpoint, data) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      method: 'POST',
      body
    });
  }

  static put(endpoint, data) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      method: 'PUT',
      body
    });
  }

  static delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export default ApiClient;
