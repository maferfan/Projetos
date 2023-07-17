import './Table.css'
import { TableType } from '../../Data/table'

export const Table = ({ tableList }: { tableList: TableType[] }) => {

    return (
        <div className='table'>
            <table>
                <thead>
                    <tr className='tr-head'>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {tableList.map((exp, index) => (
                        <tr key={index} className='tr-body'>
                            <td>{exp.title}</td>
                            <td style={{ color: exp.categories === 'Despesa' ? 'red' : 'green' }}>{(exp.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                            <td>{exp.categories}</td>
                            <td>{exp.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}