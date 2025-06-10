import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Link, Grid, Alert } from '@mui/material';
import api from '../api'; // Nuestra instancia de Axios configurada

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previene que la página se recargue
    setError(''); // Limpia errores anteriores

    try {
      // 1. Llama al endpoint /auth/login de tu API
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // 2. Al recibir una respuesta exitosa, extrae el access_token
      const { access_token } = response.data;
      if (access_token) {
        // 3. Guárdalo en el localStorage del navegador
        localStorage.setItem('accessToken', access_token);
        
        // 4. Redirige al usuario al dashboard principal
        navigate('/dashboard');
      } else {
        setError('No se recibió el token de acceso.');
      }

    } catch (err) {
      // Si la API devuelve un error (ej. 403 Forbidden), muéstralo
      setError('Email o contraseña incorrectos.');
      console.error("Error de inicio de sesión:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* Muestra un mensaje de error si existe */}
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"¿No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
