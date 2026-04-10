import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {

    const [dataTable, setDataTable] = useState(props.data);
    const n = Math.ceil(dataTable.length / props.amountRows); 
    const [activePage, setActivePage] = useState(n);
    const updateDataTable = (value) =>  {
        setDataTable(value);
        setActivePage(Math.ceil(value.length / props.amountRows));
    };

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>
        <span key={ index } onClick={ changeActive } className={item == activePage ? 'active' : ''}> { item } </span>
    );

    return(
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
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