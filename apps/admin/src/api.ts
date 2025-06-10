// apps/admin/src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.webra.scanmee.io', // La URL de tu API desplegada
});

// ¡Esto es un interceptor! Se ejecuta ANTES de cada petición.
api.interceptors.request.use(
  (config) => {
    // 1. Obtiene el token del localStorage
    const token = localStorage.getItem('accessToken');

    // 2. Si el token existe, lo añade a las cabeceras (headers)
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
