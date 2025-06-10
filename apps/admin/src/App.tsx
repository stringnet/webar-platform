import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Ruta por defecto podría ser el login o el dashboard si ya está logueado */}
        <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

// Crea los archivos para las páginas que faltan
// pages/LoginPage.tsx, pages/RegisterPage.tsx, pages/DashboardPage.tsx

export default App;
