import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Alert, Paper, Stack, LinearProgress } from '@mui/material';
import api from '../api';

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [markerFile, setMarkerFile] = useState<File | null>(null);
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!markerFile || !contentFile) {
      setError('Por favor, selecciona ambos archivos.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    // Creamos un FormData para enviar los archivos y el texto juntos
    const formData = new FormData();
    formData.append('name', projectName);
    formData.append('marker', markerFile);
    formData.append('content', contentFile);

    try {
      // Enviamos el FormData a la API. Axios se encargará de las cabeceras.
      await api.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
            <TextField required fullWidth id="projectName" label="Nombre del Proyecto" value={projectName} onChange={(e) => setProjectName(e.target.value)} disabled={isSubmitting} />
            <Box>
              <Button component="label" variant="outlined" disabled={isSubmitting}>
                Seleccionar Marcador (Imagen)
                <input type="file" hidden accept="image/*" onChange={(e) => setMarkerFile(e.target.files?.[0] || null)} />
              </Button>
              <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>{markerFile?.name || 'Ningún archivo'}</Typography>
            </Box>
            <Box>
              <Button component="label" variant="outlined" disabled={isSubmitting}>
                Seleccionar Contenido (GLB, GLTF, MP4)
                <input type="file" hidden accept=".glb,.gltf,.mp4" onChange={(e) => setContentFile(e.target.files?.[0] || null)} />
              </Button>
               <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>{contentFile?.name || 'Ningún archivo'}</Typography>
            </Box>
            {isSubmitting && <LinearProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" disabled={!projectName || !markerFile || !contentFile || isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
              </Button>
              <Button variant="text" onClick={() => navigate('/dashboard')} disabled={isSubmitting}>Cancelar</Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}