import './App.css';
import Nav from './componentes/estructura/Nav';
import Login from './componentes/login/Login';
import LoginPagina from './componentes/login/LoginPagina';
import Historial from './componentes/paginas/Historial';
import Home from './componentes/paginas/Home';

function App() {
  return (
    <div>
      <Nav></Nav>
      <LoginPagina></LoginPagina>
      {/* <Home></Home> */}
      {/* <Historial></Historial> */}

    </div>
  );
}

export default App;
