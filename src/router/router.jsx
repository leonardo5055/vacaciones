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

const isAuthenticated = true;

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
                path: 'perfil',
                element: <PrivateRoute isAuthenticated={isAuthenticated} element={<Perfil />} />
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />
    },
];

export default routes;
