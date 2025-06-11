import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import api from '../api'; // Nuestra instancia de Axios

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Esta función se ejecuta cuando el componente se carga
    const fetchProjects = async () => {
      try {
        // Hacemos la llamada al nuevo endpoint protegido
        const response = await api.get('/projects');
        setProjects(response.data); // Guardamos la respuesta en el estado
      } catch (err) {
        setError('No se pudieron cargar los proyectos.');
        console.error(err);
      } finally {
        setLoading(false); // Dejamos de cargar, ya sea con éxito o con error
      }
    };

    fetchProjects();
  }, []); // El array vacío asegura que solo se ejecute una vez

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Bienvenido al Dashboard!
        </Typography>
        <Typography>
          Has iniciado sesión correctamente. Desde aquí podrás gestionar tus proyectos de Realidad Aumentada.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Mis Proyectos</Typography>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && !error && (
            <>
              {projects.length === 0 ? (
                <Typography sx={{ mt: 2 }}>No tienes proyectos todavía. ¡Crea uno nuevo!</Typography>
              ) : (
                <p>Aquí mostraremos la lista de proyectos...</p>
                // Aquí iría la lista o tabla de proyectos en el futuro
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}