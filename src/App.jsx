import Nav  from './componentes/Navbar/Nav';
import './App.css';
import Login from './componentes/paginas/Login';
import Historial from './componentes/paginas/HistorialUsuario';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/paginas/Home';
import Perfil from './componentes/paginas/Perfil';

function App() {
  return (
    <div>
      <Router>
      <Nav></Nav>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/solicitudes" element={<Home />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/perfil" element={<Perfil/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
