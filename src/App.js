import { useEffect, useState } from 'react';
import './App.css';
import FormularioDeGastos from './ControleDeGastos/FormularioDeGastos';
import TabelaDeGastos from './ControleDeGastos/TabelaDeGastos';

function App() {
  const controles = {
    codigo: 0,
    dataGasto: "",
    descricao:"",
    valorGasto:""
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [controle, setControle] = useState([]);
  const [objControle, setObjControle] = useState(controles);

  useEffect(() => {
    fetch("http://localhost:8080/listarcontroledegastos")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setControle(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjControle({...objControle, [e.target.name]:e.target.value});
  }

  const cadastrarGastos = () => {
    fetch('http://localhost:8080/cadastrarGastos', {
      method:'post',
      body:JSON.stringify(objControle),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem)
      } else {
        setControle([...controle, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFomularioControleDeGastos();
      }
    })
  }

// Alterar produto
const alterar = () => {
  fetch('http://localhost:8080/alterar',{
    method:'put',
    body:JSON.stringify(objControle),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    
    if(retorno_convertido.mensagem !== undefined){
      alert(retorno_convertido.mensagem);
    }else{
      
      // Mensagem
      alert('Gasto alterado com sucesso!');

      // Cópia do vetor de produtos
      let vetorTemp = [...controle];

      // Índice
      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objControle.codigo;
      });

      // Alterar produto do vetorTemp
      vetorTemp[indice] = objControle;

      // Atualizar o vetor de produtos
      setControle(vetorTemp);

      // Limpar o formulário
      limparFomularioControleDeGastos();
    }
    
  })
}

// Remover produto
// Remover produto
const removerGastos = () => {
  console.log(objControle.codigo);
  fetch('http://localhost:8080/remover/'+objControle.codigo,{
    method:'delete',
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
  
    // Mensagem
    alert(retorno_convertido.mensagem);

    // Cópia do vetor de produtos
    let vetorTemp = [...controle];

    // Índice
    let indice = vetorTemp.findIndex((p) =>{
      return p.codigo === objControle.codigo;
    });

    // Remover produto do vetorTemp
    vetorTemp.splice(indice, 1);

    // Atualizar o vetor de produtos
    setControle(vetorTemp);

    // Limpar formulário
    limparFomularioControleDeGastos();
    
  })
}

  const limparFomularioControleDeGastos = () => {
    setObjControle(controles);
    setBtnCadastrar(true);
  }

  const selecionarItemControleDeGastos = (indice) => {
    setObjControle(controle[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand mx-auto" href="#">Sistema de Gastos</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Clientes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Controle de Gastos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Folha de Pagamento</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Orçamento</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <FormularioDeGastos botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrarGastos} obj={objControle} cancelar={limparFomularioControleDeGastos} remover={removerGastos} alterar={alterar}/>
        <TabelaDeGastos vetor={controle} selecionar={selecionarItemControleDeGastos}/>
      </div>
    </div>
  );
}

export default App;