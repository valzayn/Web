import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';
import Task from './components/task.js';


function App() {
  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <div className="App">
    {/* <Task /> */}

      <h3>Самые высокие здания и сооружения</h3>
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