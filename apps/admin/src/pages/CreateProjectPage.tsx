import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Alert, CircularProgress, Paper, Stack, LinearProgress } from '@mui/material';
import api from '../api';

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [markerFile, setMarkerFile] = useState<File | null>(null);
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Para mostrar el progreso

  const navigate = useNavigate();

  const markerInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Función para subir un archivo a MinIO usando nuestra API
  const uploadFile = async (file: File): Promise<string> => {
    const { data } = await api.post('/storage/upload-url', { fileName: file.name });
    const { presignedUrl, objectName } = data;

    await api.put(presignedUrl, file, {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // Actualizaremos el progreso total (aproximado, 50% por cada archivo)
            setUploadProgress(prev => prev + (percentCompleted / 2));
        }
      },
    });
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
    setUploadProgress(0); // Reinicia el progreso

    try {
      console.log('Iniciando subida de archivos...');
      const [markerObjectName, contentObjectName] = await Promise.all([
        uploadFile(markerFile),
        uploadFile(contentFile),
      ]);
      console.log('Archivos subidos. Creando proyecto en la base de datos...');

      // --- ¡ESTE ES EL PASO CRÍTICO QUE FALTABA! ---
      // Una vez subidos los archivos, creamos el proyecto en nuestra base de datos
      await api.post('/projects', {
        name: projectName,
        markerUrl: markerObjectName,
        contentUrl: contentObjectName,
      });
      console.log('Proyecto creado exitosamente.');

      navigate('/dashboard');
    } catch (err) {
      setError('No se pudo crear el proyecto. Revisa la consola para más detalles.');
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
              <Button variant="outlined" onClick={() => markerInputRef.current?.click()} disabled={isSubmitting}>
                Seleccionar Marcador (Imagen)
              </Button>
              <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>{markerFile?.name || 'Ningún archivo'}</Typography>
              <input type="file" ref={markerInputRef} hidden accept="image/*" onChange={(e) => handleFileSelect(e, setMarkerFile)} />
            </Box>
            <Box>
              <Button variant="outlined" onClick={() => contentInputRef.current?.click()} disabled={isSubmitting}>
                Seleccionar Contenido (GLB, GLTF, MP4)
              </Button>
              <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>{contentFile?.name || 'Ningún archivo'}</Typography>
              <input type="file" ref={contentInputRef} hidden accept=".glb,.gltf,.mp4" onChange={(e) => handleFileSelect(e, setContentFile)} />
            </Box>
            {isSubmitting && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>Subiendo archivos... {Math.round(uploadProgress)}%</Typography>
              </Box>
            )}
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