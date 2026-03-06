const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    const header = Object.keys(data[0]);
    const headerRow = createHeaderRow(header);
    table.append(headerRow);
	const bodyRows = createBodyRows(data);
    table.append(bodyRows);
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');
    data.forEach(elem => {
        const tr = document.createElement('tr');
        Object.values(elem).forEach(value => {
            const td = document.createElement('td');
            td.innerHTML = value;
            tr.append(td);
        });
        tbody.append(tr);
    });
    return tbody;
};

const clearTable = (idTable) => {
    document.getElementById(idTable).innerHTML = '';
}