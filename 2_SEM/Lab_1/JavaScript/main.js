let buffTable = document.getElementById('list');
document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');
    setSortSelects(buildings, document.forms['sort']);
});
document.getElementById('search').addEventListener("click", function() {
    filterTable(buildings, 'list', document.forms['filter']);
    buffTable = document.getElementById('list');
});
document.getElementById('clear').addEventListener("click", function() {
    document.forms['filter'].reset();
    document.forms['sort'].reset();
    document.forms['sort'].getElementsByTagName('select')[1].disabled = true;
    filterTable(buildings, 'list', document.forms['filter']);
});
document.getElementById('fieldsFirst').addEventListener('change', function() {
    changeNextSelect(document.getElementById('fieldsFirst'), 'fieldsSecond');
});
document.getElementById('sort_button').addEventListener("click", function() {
    sortTable(buildings, 'list', document.forms['sort'], document.forms['filter']);
});
document.getElementById('clear_sort').addEventListener("click", function() {
    document.forms['sort'].reset();
    document.forms['sort'].getElementsByTagName('select')[1].disabled = true;
    filterTable(buildings, 'list', document.forms['filter']);
});

// формирование полей элемента списка с заданным текстом и значением

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select

const setSortSelect = (arr, sortSelect) => {
    
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    // перебираем массив со значениями опций
     arr.forEach((item, index) => {
       // создаем OPTION из очередного ключа и добавляем в SELECT
       // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(item, index + 1));
    });
}

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => { 

    // выделяем ключи словаря в массив
    const head = Object.keys(data[0]);

    // находим все SELECT в форме
    const allSelect = dataForm.getElementsByTagName('select');
    
    for(let i = 0; i < allSelect.length; i++) {
        // формируем очередной SELECT
        setSortSelect(head, allSelect[i]);
        
        if (i > 0) {
            allSelect[i].disabled = true;
        }
    }
}

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    
    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
       nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}