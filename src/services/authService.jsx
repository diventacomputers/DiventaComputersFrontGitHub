import api from './api';

export const AuthService = {
  async login(credentials) {
    try {
      const data = await api.post('/auth/login', credentials);
      console.log(data.token);
      console.log(data.user);
      // Guardar token y datos de usuario
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message );
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('authToken');
  }
};
export const checkUserRole = () => {
  const user = AuthService.getCurrentUser();
  return user?.role || null; // 'admin' o 'cliente'
};

export const isAdmin = () => checkUserRole() === 'admin';
export const isClient = () => checkUserRole() === 'cliente';
