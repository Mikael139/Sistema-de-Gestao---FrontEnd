import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ControleDeGastos from './ControleDeGastos/ControleDeGastos';
import Clientes from './Clientes/Clientes';
import './App.css';

function FolhaDePagamento() {
  return <h2>Folha de Pagamento</h2>;
}

function Orcamento() {
  return <h2>Orçamento</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="./beta.html">Sistema de Gastos</a>
            <nav className="navbar-nav">
              <Link to="/clientes" className="nav-link">Clientes</Link>
              <Link to="/controle-de-gastos" className="nav-link">Controle de gastos</Link>
              <Link to="/folha-de-pagamento" className="nav-link">Folha de pagamento</Link>
              <Link to="/orcamento" className="nav-link">Orçamento</Link>
            </nav>
          </div>
        </nav>
        <div className="conteudo">
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/controle-de-gastos" element={<ControleDeGastos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
