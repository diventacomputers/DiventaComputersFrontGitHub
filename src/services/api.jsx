import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL + '/api') || 'http://localhost:4000/api',

  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // Errores 4xx/5xx
      console.error('Error de API:', {
        status: error.response.status,
        message: error.response.data?.message || 'Error desconocido',
      });
      
      // Manejo específico para no autorizado (401)
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export const createProduct = (productData, token) => {
  return fetch('/api/products', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
};
export default api;