import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState } from "react";

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const [originalFilteredData, setOriginalFilteredData] = useState(props.data);
    const [resetFilter, setResetFilter] = useState(false);
    const n = Math.ceil(dataTable.length / props.amountRows); 
    const [activePage, setActivePage] = useState(1);
    
    const updateDataTable = (filteredData) => {
        setOriginalFilteredData(filteredData);
        setDataTable(filteredData);
        setActivePage(1);
    };
    
    const updateSortedData = (sortedData) => {
        setDataTable(sortedData);
        setActivePage(1);
    };

    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const pages = arr.map((item, index) =>
        <span key={ index } onClick={ changeActive } className={item == activePage ? 'active' : ''}> { item } </span>
    );

    const handleFilterReset = () => {
        setResetFilter(prev => !prev);
    };

    return(
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data } onReset={ handleFilterReset }/>
        <h4>Сортировка</h4>
        <Sort 
          headers={ Object.keys(props.data[0]) } 
          data={ originalFilteredData }
          onSort={ updateSortedData }
          resetTrigger={ resetFilter }
        />
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={ props.pag ? props.amountRows : props.data.length } numPage={ props.pag ? activePage : 1 }/>
        </table>
        {props.pag ?
        <div>
            {pages}
        </div> :
        <></>
        }
      </>
    )
}

export default Table;