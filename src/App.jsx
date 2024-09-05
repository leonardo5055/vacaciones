import './App.css';
import Nav from './componentes/estructura/Nav';
import Login from './componentes/login/Login';
import Historial from './componentes/paginas/Historial';
import Home from './componentes/paginas/Home';

function App() {
  return (
    <div>
      <Nav></Nav>
      {/* <Login></Login> */}
      {/* <Home></Home> */}
      <Historial></Historial>

    </div>
  );
}

export default App;
