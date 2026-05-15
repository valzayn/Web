import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";

const Table = (props) => {

    const [dataTable, setDataTable] = useState(props.data);
    const n = Math.ceil(dataTable.length / props.amountRows); 
    const [activePage, setActivePage] = useState(1);

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage(1);
        if (props.onFilterChange) {
            props.onFilterChange(value);
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