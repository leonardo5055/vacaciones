// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './router/router'; // Asegúrate de que esta ruta sea correcta
import { Suspense, useEffect } from 'react';
import Cargando from './componentes/Cargando/Cargando';

// Componente principal de la aplicación
function App() {
  // Preloading de las rutas
  useEffect(() => {
    // Función para manejar el preloading
    const preloadRoutes = (routeList) => {
      routeList.forEach((route) => {
        // Comprobamos si la ruta tiene una función de preload y la llamamos
        if (route.element.type?.preload) {
          route.element.type.preload();
        }

        // Preloading para rutas hijas si existen
        if (route.children) {
          preloadRoutes(route.children);
        }
      });
    };

    preloadRoutes(routes);
  }, []);

  return (
    <Router>
      <Suspense fallback={<Cargando/>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route key={childIndex} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
