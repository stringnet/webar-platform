import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateProjectPage from './pages/CreateProjectPage'; // <-- 1. Importa la nueva página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects/new" element={<CreateProjectPage />} /> // <-- 2. Añade la nueva ruta
        <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;