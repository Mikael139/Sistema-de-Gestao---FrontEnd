function FormularioDeGastos({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu">
            <input type="date" value={obj.dataGasto} onChange={eventoTeclado} name="dataGasto" placeholder="Data do gasto..." className="form-control"/>
            <input type="number" value={obj.valorGasto} onChange={eventoTeclado} name="valorGasto" placeholder="Valor gasto" className="form-control"/>
            <input type="text" value={obj.descricao} onChange={eventoTeclado} name="descricao" placeholder="Descrição" className="form-control descricao"/>

        
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

export default FormularioDeGastos;