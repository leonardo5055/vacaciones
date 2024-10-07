import { Navigate } from 'react-router-dom';

// Componente para proteger rutas
const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

export default PrivateRoute;
