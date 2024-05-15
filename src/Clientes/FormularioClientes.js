function FormularioClientes({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu">
            <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome..." className="form-control descricao"/>
            <input type="date" value={obj.data_nascimento} onChange={eventoTeclado} name="dataNascimento" placeholder="Data do seu nascimento..." className="form-control"/>
            <input type="date" value={obj.data_cadastro} onChange={eventoTeclado} name="dataCadastro" placeholder="Data do cadastro..." className="form-control"/>
            <input type="text" value={obj.obs} onChange={eventoTeclado} name="observacao" placeholder="Observação..." className="form-control descricao"/>
            <input type="text" value={obj.endereco_cliente} onChange={eventoTeclado} name="endereco" placeholder="Endereço..." className="form-control descricao"/>
            <input type="number" value={obj.cliente_contato} onChange={eventoTeclado} name="telefone" placeholder="TeLEFONE..." className="form-control descricao"/>
            <select value={obj.genero} onChange={eventoTeclado} name="genero" className="form-control">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
                <option value="N">Prefiro não informar</option>
            </select>
            {
                botao 
                //Se botão for igual a true mostra o cadastrar
                ? 
                <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
                //Caso contrário, mostra os demais botões
                :
                <div>
                    <input type="button" value="Alterar" onClick={alterar} className="btn btn-warning"/>
                    <input type="button" value="Remover" onClick={remover} className="btn btn-danger"/>
                    <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-secondary"/>
                </div>
            }
        </form>
    )
}

export default FormularioClientes;