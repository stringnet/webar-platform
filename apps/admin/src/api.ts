import axios from 'axios';

// Vite expone las variables de entorno en el objeto import.meta.env
// Usamos la URL de producción como fallback por si la variable no está definida.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://apiwebra.scanmee.io';

const api = axios.create({
  baseURL: baseURL,
});

// El interceptor sigue igual
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
