
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import './App.css'
import { Table } from './components/Table/Table';
import { useState} from 'react';
import { TableType, table } from './Data/table';

function App() {
  const [tableList, setTableList] = useState<TableType[]>(table)

  return (
    <div className={`pai`}>
      <Header tableList={tableList} setTableList={setTableList} />
      <div className='filho'>
        <Main tableList={tableList} />
        <Table tableList={tableList} />
      </div>
    </div>
  );
}

export default App;


