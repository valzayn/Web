import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <div className="App">
      <h3>Топ фильмов</h3>
      <Chart data={filteredData} />
      <Table 
        data={buildings} 
        amountRows={10} 
        pag={true} 
        onFilterChange={setFilteredData}
      />
    </div>
  );
}

export default App;