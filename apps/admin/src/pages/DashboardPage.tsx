import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import api from '../api';
import { Link as RouterLink } from 'react-router-dom'; // <-- 1. IMPORT AÑADIDO

// Definimos un tipo para nuestros proyectos para que TypeScript sepa cómo son
interface ARProject {
  id: string;
  name: string;
  // Añade más campos aquí a medida que los necesites
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<ARProject[]>([]); // Usamos el tipo aquí
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get<ARProject[]>('/projects');
        setProjects(response.data);
      } catch (err) {
        setError('No se pudieron cargar los proyectos. Intenta recargar la página.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Bienvenido al Dashboard!
        </Typography>
        <Typography>
          Has iniciado sesión correctamente. Desde aquí podrás gestionar tus proyectos de Realidad Aumentada.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Mis Proyectos</Typography>
          {/* --- 2. BOTÓN ACTUALIZADO --- */}
          <Button
            component={RouterLink}
            to="/projects/new"
            variant="contained"
            color="primary"
          >
            Crear Nuevo Proyecto
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {loading && <CircularProgress />}
        
        {error && <Alert severity="error">{error}</Alert>}
        
        {!loading && !error && (
          <List>
            {projects.length === 0 ? (
               <ListItem>
                <ListItemText primary="No tienes proyectos todavía. ¡Haz clic en el botón para crear el primero!" />
              </ListItem>
            ) : (
              projects.map((project) => (
                <ListItem key={project.id} disablePadding>
                  <ListItemText primary={project.name} secondary={`ID: ${project.id}`} />
                </ListItem>
              ))
            )}
          </List>
        )}
      </Box>
    </Container>
  );
}