let buffTable = document.getElementById('list');
document.addEventListener("DOMContentLoaded", function() {
    createTable(films, 'list');
    setSortSelects(films, document.forms['sort']);
});
document.getElementById('search').addEventListener("click", function() {
    filterTable(films, 'list', document.forms['filter']);
    buffTable = document.getElementById('list');
});
document.getElementById('clear').addEventListener("click", function() {
    document.forms['filter'].reset();
    document.forms['sort'].reset();
    document.forms['sort'].getElementsByTagName('select')[1].disabled = true;
    document.forms['sort'].getElementsByTagName('select')[2].disabled = true;
    filterTable(films, 'list', document.forms['filter']);
});
document.getElementById('fieldsFirst').addEventListener('change', function() {
    changeNextSelect(document.getElementById('fieldsFirst'), 'fieldsSecond');
    changeNextSelect(document.getElementById('fieldsSecond'), 'fieldsThird');
});
document.getElementById('fieldsSecond').addEventListener('change', function() {
    changeNextSelect(document.getElementById('fieldsSecond'), 'fieldsThird');
});
document.getElementById('sort_button').addEventListener("click", function() {
    sortTable(films, 'list', document.forms['sort'], document.forms['filter']);
});
document.getElementById('clear_sort').addEventListener("click", function() {
    document.forms['sort'].reset();
    document.forms['sort'].getElementsByTagName('select')[1].disabled = true;
    document.forms['sort'].getElementsByTagName('select')[2].disabled = true;
    filterTable(films, 'list', document.forms['filter']);
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
     arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}
const setSortSelects = (data, dataForm) => { 
    const head = Object.keys(data[0]);
    const allSelect = dataForm.getElementsByTagName('select');
    
    for(let i = 0; i < allSelect.length; i++) {
        setSortSelect(head, allSelect[i]);
        if (i > 0) {
            allSelect[i].disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
        //nextSelect.remove(curSelect.value);
        let remove = Array.from(nextSelect.options).find(option => option.value === curSelect.value);
        remove.remove();
    } else {
        nextSelect.disabled = true;
    }
}