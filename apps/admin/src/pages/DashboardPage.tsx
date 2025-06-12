import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import api from '../api';

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
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        setError('No se pudieron cargar los proyectos.');
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
          <Button variant="contained" color="primary">Crear Nuevo Proyecto</Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        
        {!loading && !error && (
          <List>
            {projects.length === 0 ? (
              <Typography sx={{ mt: 2 }}>No tienes proyectos todavía. ¡Crea uno nuevo!</Typography>
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