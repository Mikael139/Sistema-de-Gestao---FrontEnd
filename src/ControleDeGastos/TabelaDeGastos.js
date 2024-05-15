
function TabelaDeGastos({vetor, selecionar}) {
    return(
        <table className="table">
            <thead>
                <tr className="table-informacao">
                    <th>#</th>
                    <th>Data do gasto</th>
                    <th>Descrição</th>
                    <th>Valor gasto</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
        
            <tbody>
                {
                   vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{indice+1}</td>
                        <td>{obj.dataGasto}</td>
                        <td>{obj.descricao}</td>
                        <td>R$ {obj.valorGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                    </tr>
                   )) 
                }
            </tbody>
        </table>
    )
}

export default TabelaDeGastos;