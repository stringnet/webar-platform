import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Alert, CircularProgress, Paper, Stack } from '@mui/material';
import api from '../api';

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [markerFile, setMarkerFile] = useState<File | null>(null);
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Referencias a los inputs de archivo ocultos
  const markerInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Función para subir un archivo a MinIO usando nuestra API
  const uploadFile = async (file: File): Promise<string> => {
    // 1. Pedir la URL segura a nuestra API
    const { data } = await api.post('/storage/upload-url', { fileName: file.name });
    const { presignedUrl, objectName } = data;

    // 2. Subir el archivo directamente a MinIO con la URL pre-firmada
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al subir el archivo: ${file.name}`);
    }

    // 3. Devolver el nombre final del objeto para guardarlo en la DB
    return objectName;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!markerFile || !contentFile) {
      setError('Por favor, selecciona ambos archivos.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      // Subimos ambos archivos en paralelo para más eficiencia
      const [markerObjectName, contentObjectName] = await Promise.all([
        uploadFile(markerFile),
        uploadFile(contentFile),
      ]);

      // Una vez subidos, creamos el proyecto en nuestra base de datos
      await api.post('/projects', {
        name: projectName,
        markerUrl: markerObjectName, // <-- Ahora enviamos el nombre del objeto en MinIO
        contentUrl: contentObjectName, // <-- Y el del contenido también
      });

      navigate('/dashboard');
    } catch (err) {
      setError('No se pudo crear el proyecto. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nuevo Proyecto de RA
        </Typography>
        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              id="projectName"
              label="Nombre del Proyecto"
              name="projectName"
              autoFocus
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              disabled={isSubmitting}
            />

            <Box>
              <Button variant="outlined" onClick={() => markerInputRef.current?.click()} disabled={isSubmitting}>
                Seleccionar Marcador (Imagen)
              </Button>
              <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
                {markerFile?.name || 'Ningún archivo seleccionado'}
              </Typography>
              <input
                type="file"
                ref={markerInputRef}
                hidden
                accept="image/*"
                onChange={(e) => handleFileSelect(e, setMarkerFile)}
              />
            </Box>

            <Box>
              <Button variant="outlined" onClick={() => contentInputRef.current?.click()} disabled={isSubmitting}>
                Seleccionar Contenido (GLB, GLTF, Video)
              </Button>
               <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
                {contentFile?.name || 'Ningún archivo seleccionado'}
              </Typography>
              <input
                type="file"
                ref={contentInputRef}
                hidden
                accept=".glb,.gltf,.mp4"
                onChange={(e) => handleFileSelect(e, setContentFile)}
              />
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" disabled={!projectName || !markerFile || !contentFile || isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : 'Crear Proyecto'}
              </Button>
              <Button variant="text" onClick={() => navigate('/dashboard')} disabled={isSubmitting}>
                Cancelar
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}