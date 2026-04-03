
const correspond = {
    "Название": "title",
    "Жанр": "genre",
    "Страна": "country",
    "Год": ["yearFrom", "yearTo"],
    "Рейтинг": ["ratFrom", "ratTo"],
    "Возраст": ["ageFrom", "ageTo"]
}

const dataFilter = (dataForm) => {
    let dictFilter = {};
    for (const item of dataForm.elements) {
        let valInput = item.value;
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }
        if (valInput == '' && item.id.includes("From")) {
            valInput = -Infinity;
        }
        if (valInput == '' && item.id.includes("To")) {
            valInput = Infinity;
        }
        if (item.type === "number") {
            valInput = Number(valInput);
        }
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    let tableFilter = data.filter(item => {
        let result = true;
         Object.entries(item).map(([key, val]) => {
            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
            }
            if (typeof val == 'number') {
                result &&= (val >= datafilter[correspond[key][0]]) && (val <= datafilter[correspond[key][1]]);
            }
         });

         return result;
    });

    hideTable(idTable);

    if (Object.keys(tableFilter).length === 0) {
        const table = document.getElementById(idTable);
        const header = Object.keys(data[0]);
        const headerRow = createHeaderRow(header);
        table.append(headerRow);
    } else {
        showTable(idTable, tableFilter);
    }
}