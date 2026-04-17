import './CSS/App.css';
import films from './data.js';
import Table from './components/Table.js';


function App() {
  return (
    <div className="App">
       <h3>Топ фильмов</h3>
       <Table data={ films } amountRows="10" pag="1" />
    </div>
  );
}

export default App;