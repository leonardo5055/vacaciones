// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;

