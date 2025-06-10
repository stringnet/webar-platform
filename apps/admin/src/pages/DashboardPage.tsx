// apps/admin/src/pages/DashboardPage.tsx

import { Container, Typography, Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Bienvenido al Dashboard!
        </Typography>
        <Typography variant="body1">
          Has iniciado sesión correctamente. Desde aquí podrás gestionar tus proyectos de Realidad Aumentada.
        </Typography>
      </Box>
    </Container>
  );
}
