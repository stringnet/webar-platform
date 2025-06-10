import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.webra.scanmee.io', // La URL de tu API desplegada
});

export default api;
