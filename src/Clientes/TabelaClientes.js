
function TabelaClientes({vetor, selecionar}) {
    return(
        <table className="table">
            <thead>
                <tr className="table-informacao">
                    <th>#</th>
                    <th>Nome</th>
                    <th>Data do nascimento</th>
                    <th>Data do cadastro</th>
                    <th>Observacao</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                    <th>Gênero</th>
                </tr>
            </thead>
        
            <tbody>
                {
                   vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{indice+1}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.dt_nascimento}</td>
                        <td>{obj.dt_cadastro}</td>
                        <td>{obj.obs}</td>
                        <td>{obj.endereco_cliente}</td>
                        <td>{obj.cliente_contato}</td>
                        <td>{obj.genero}</td>
                        <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                    </tr>
                   )) 
                }
            </tbody>
        </table>
    )
}

export default TabelaClientes;