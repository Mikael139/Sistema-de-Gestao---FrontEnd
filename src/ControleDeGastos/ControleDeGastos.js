import { useState, useEffect } from 'react';
import FormularioDeGastos from './FormularioDeGastos';
import TabelaDeGastos from './TabelaDeGastos';

function ControleDeGastos() {
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
          alert('Gasto alterado com sucesso!');
          let vetorTemp = [...controle];
          let indice = vetorTemp.findIndex((p) =>{
            return p.codigo === objControle.codigo;
          });
          vetorTemp[indice] = objControle;
          setControle(vetorTemp);
          limparFomularioControleDeGastos();
        }
      })
    }
  
    const removerGastos = () => {
      fetch('http://localhost:8080/remover/'+objControle.codigo,{
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
        <FormularioDeGastos botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrarGastos} obj={objControle} cancelar={limparFomularioControleDeGastos} remover={removerGastos} alterar={alterar}/>
        <TabelaDeGastos vetor={controle} selecionar={selecionarItemControleDeGastos}/>
      </div>
    );
  }

export default ControleDeGastos;
