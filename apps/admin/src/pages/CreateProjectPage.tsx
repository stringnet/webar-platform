import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import api from '../api';

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    // --- Lógica para llamar a la API (la implementaremos después) ---
    console.log('Nombre del proyecto a crear:', projectName);
    // Por ahora, solo simulamos que funciona y volvemos al dashboard
    alert('Proyecto creado (simulación). Ahora implementaremos la llamada a la API.');
    navigate('/dashboard');
    // -----------------------------------------------------------

    // En el futuro, aquí iría la llamada a la API:
    /*
    try {
      // await api.post('/projects', { name: projectName, ...otrosDatos });
      navigate('/dashboard'); // Volver al dashboard si es exitoso
    } catch (err) {
      setError('No se pudo crear el proyecto.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nuevo Proyecto de RA
        </Typography>
        <Typography gutterBottom>
          Completa los detalles de tu nuevo proyecto. Por ahora, solo el nombre.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="projectName"
            label="Nombre del Proyecto"
            name="projectName"
            autoFocus
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}