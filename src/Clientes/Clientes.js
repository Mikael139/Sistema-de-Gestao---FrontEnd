// Login.js
import { useState, useEffect } from 'react';
import FormularioClientes from './FormularioClientes';
import TabelaClientes from './TabelaClientes';

function Clientes() {
    const controles = {
        codigo: 0,
        nome:"",
        data_nascimento: "",
        data_cadastro:"",
        obs:"",
        endereco: "",
        telefone: "",
        genero: ""
      }
    
      const [btnCadastrar, setBtnCadastrar] = useState(true);
      const [controle, setControle] = useState([]);
      const [objControle, setObjControle] = useState(controles);
    
      useEffect(() => {
        fetch("http://localhost:8080/listarclientes")
          .then(retorno => retorno.json())
          .then(retorno_convertido => setControle(retorno_convertido));
      }, []);
    
      const aoDigitar = (e) => {
        setObjControle({...objControle, [e.target.name]:e.target.value});
      }
    
      const cadastrarClientes = () => {
        fetch('http://localhost:8080/cadastrarClientes', {
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
            alert('Cliente cadastrado com sucesso!');
            limparFomularioCliente();
          }
        })
      }
    
      const alterarClientes = () => {
        fetch('http://localhost:8080/alterarClientes',{
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
            alert('Cliente alterado com sucesso!');
            let vetorTemp = [...controle];
            let indice = vetorTemp.findIndex((p) =>{
              return p.codigo === objControle.codigo;
            });
            vetorTemp[indice] = objControle;
            setControle(vetorTemp);
            limparFomularioCliente();
          }
        })
      }
    
      const removerCliente = () => {
        fetch('http://localhost:8080/removerClientes/'+objControle.codigo,{
          method:'delete',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          alert(retorno_convertido.mensagem);
          let vetorTemp = [...controle];
          let indice = vetorTemp.findIndex((p) =>{
            return p.codigo === objControle.codigo;
          });
          vetorTemp.splice(indice, 1);
          setControle(vetorTemp);
          limparFomularioCliente();
        })
      }
    
      const limparFomularioCliente = () => {
        setObjControle(controles);
        setBtnCadastrar(true);
      }
    
      const selecionarItemCliente = (indice) => {
        setObjControle(controle[indice]);
        setBtnCadastrar(false);
      }
    
      return (
        <div className="container mt-5">
          <FormularioClientes botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrarClientes} obj={objControle} cancelar={limparFomularioCliente} remover={removerCliente} alterar={alterarClientes}/>
          <TabelaClientes vetor={controle} selecionar={selecionarItemCliente}/>
        </div>
      );
    }

export default Clientes;
