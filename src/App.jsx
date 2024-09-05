import './App.css';
import Nav from './componentes/estructura/Nav';
import Login from './componentes/login/Login';
import Home from './componentes/paginas/Home';

function App() {
  return (
    <div>
      <Nav></Nav>
      {/* <Login></Login> */}
      <Home></Home>
    </div>
  );
}

export default App;
