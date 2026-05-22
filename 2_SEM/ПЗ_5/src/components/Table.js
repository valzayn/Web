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

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage(1);
        if (props.onFilterChange) {
            props.onFilterChange(value);
        }
    };

    const updateSortedData = (sortedData) => {
        setDataTable(sortedData);
        setActivePage(1);
        if (props.onFilterChange) {
            props.onFilterChange(sortedData);
        }
    };

    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const changeActive = (event) => {
        setActivePage(Number(event.target.innerHTML));
    };

    const pages = arr.map((item, index) =>
        <span key={index} onClick={changeActive} className={item === activePage ? 'active' : ''}> {item} </span>
    );

    return(
      <>
        <h4>Фильтры</h4>
        <Filter filtering={updateDataTable} data={dataTable} fullData={props.data}/>
        <h4>Сортировка</h4>
        <Sort 
          headers={ Object.keys(props.data[0]) } 
          data={ dataTable }
          onSort={ updateSortedData }
          resetTrigger={ resetFilter }
        />
        <h4>Таблица фильмов</h4>
        <table>
            <TableHead head={Object.keys(props.data[0])} />
            <TableBody 
                body={dataTable} 
                amountRows={props.pag ? props.amountRows : props.data.length} 
                numPage={props.pag ? activePage : 1}
            />
        </table>
        {props.pag && n > 1 &&
            <div style={{marginTop: "10px"}}>
                {pages}
            </div>
        }
      </>
    )
}

export default Table;