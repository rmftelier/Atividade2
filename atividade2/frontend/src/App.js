import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
//import CarteiraCadastro from './components/CarteiraCadastro';
//import Transferencia from './components/Transferencia';
//<Route path="/carteira/cadastro" component={CarteiraCadastro} />
//<Route path="/transferencia" component={Transferencia} />

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
