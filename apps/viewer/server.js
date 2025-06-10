// apps/viewer/server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configura EJS como el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal para el visor de RA
app.get('/view/:uniqueUrlId', async (req, res) => {
  try {
    // 1. Define la URL del API. Usamos una variable de entorno para flexibilidad.
    // En Docker Compose, 'api' es el nombre del servicio y escucha en el puerto 3000.
    const apiUrl = process.env.API_URL || 'http://api:3000';
    
    // 2. Llama a tu API para obtener los datos de la escena
    const response = await axios.get(`${apiUrl}/projects/view/${req.params.uniqueUrlId}`);
    const sceneData = response.data;

    // 3. Renderiza la plantilla de A-Frame con los datos obtenidos
    // Asegúrate de que los URLs en sceneData sean completos (ej. https://mi-minio.com/bucket/modelo.glb)
    res.render('scene', { sceneData });

  } catch (error) {
    console.error('Error fetching project data:', error.message);
    res.status(404).send('Proyecto no encontrado o error en el servidor.');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Viewer service running on port ${PORT}`));
