import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroCarteira from './pages/Cadastro'


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
            path="/cadastro-carteira" 
            element={<CadastroCarteira />}
        />

      </Routes>
    </Router>
  );
};

export default App;
