// router/router.jsx
import { lazy } from 'react';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import Nav from '../componentes/Navbar/Nav';
import { Outlet } from 'react-router-dom';

const Login = lazy(() => import('../componentes/paginas/Login'));
const Home = lazy(() => import('../componentes/paginas/Home'));
const Historial = lazy(() => import('../componentes/paginas/HistorialUsuario'));
const Perfil = lazy(() => import('../componentes/paginas/Perfil'));
const Calendario = lazy(() => import('../componentes/paginas/Calendario'));
const SolicitudesAdmin = lazy(() => import('../componentes/paginas/SolicitudesAdmin'));
const HistorialAdmin = lazy(() => import('../componentes/paginas/HistorialAdmin'));
const CrearUsuarios = lazy(() => import ('../componentes/paginas/CrearUsuarios'));
const DatosPersonales = lazy(() => import ('../componentes/paginas/DatosPersonales'));

const isAuthenticated = () => {
    const token = localStorage.getItem('Token');
    return token !== null;
};

const routes = [
    {
        path: '/',
        element: <Login />,
        exact: true
    },
    {
        path: '/',
        element: (
            <>
                <Nav />
                <Outlet />
            </>
        ),
        children: [
            {
                path: 'solicitudes',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />
            },
            {
                path: 'historial',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<Historial />} />
            },
            {
                path: 'calendario',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<Calendario />} />
            },
            {
                path: 'perfil',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<Perfil />} />
            },
            {
                path: 'solicitudes-admin',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<SolicitudesAdmin />} />
            },
            {
                path: 'historial-admin',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<HistorialAdmin />} />
            },
            {
                path: 'crear-usuario',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<CrearUsuarios />} />
            },
            {
                path: 'datos-personales',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<DatosPersonales />} />
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />
    },
];

export default routes;
