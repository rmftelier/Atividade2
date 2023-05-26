import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro'
import Editar from './pages/Editar'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
            path="/cadastro-carteira" 
            element={<Cadastro />}
        />
        <Route 
            path="/editar/:id" 
            element={<Editar />}
        />
      </Routes>
    </Router>
  );
};

export default App;
