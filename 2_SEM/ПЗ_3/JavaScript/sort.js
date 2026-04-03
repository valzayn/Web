const createSortArr = (data) => {
    let sortArr = [];
    
    const sortSelects = data.getElementsByTagName('select');
    
    for (const item of sortSelects) {   
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }
        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           direction: desc}
        ); 
    }
    return sortArr; 
};

const sortTable = (data, idTable, formDataSort, formDataFilter) => {
    const sortArr = createSortArr(formDataSort);
    if (sortArr.length === 0) {
      filterTable(data, idTable, formDataFilter);
      return false;
    }
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift();
    const headers = Array.from(headerRow.cells).map(cell => cell.innerHTML);
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
           const firstCell = first.cells[column].innerHTML;
           const secondCell = second.cells[column].innerHTML;

            const headerText = headers[column];
            let comparison;
            
            if (headerText === 'Год' || headerText === 'Рейтинг' || headerText === 'Возраст') {
                const firstNum = parseFloat(firstCell) || 0;
                const secondNum = parseFloat(secondCell) || 0;
                
                if (firstNum > secondNum) {
                    comparison = 1;
                } else if (firstNum < secondNum) {
                    comparison = -1;
                } else {
                    comparison = 0;
                }
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }
           if (comparison !== 0) {
             return (direction ? -comparison : comparison);
          }
        }
        return 0; 
    });
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    table.append(headerRow);
    rowData.forEach(row => {
        table.append(row);
    });
}