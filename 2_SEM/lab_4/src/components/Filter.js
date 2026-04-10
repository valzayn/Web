/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
    filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
      const handleSubmit= (event) => {        
        event.preventDefault();   

      // создаем словарь со значениями полей формы
      const filterField = {
          "Название": event.target["structure"].value.toLowerCase(),
          "Тип": event.target["type"].value.toLowerCase(),
          "Страна": event.target["country"].value.toLowerCase(),
          "Город": event.target["city"].value.toLowerCase(),
          "Год": [event.target["yearMin"].value, event.target["yearMax"].value],
          "Высота": [event.target["heightMin"].value, event.target["heightMax"].value]
        };
        
          //фильтруем данные по значениям всех полей формы
          let arr = props.fullData;
          for(const key in  filterField) {
            arr = arr.filter(item => {
              if (key == "Год") {
                const [min, max] = filterField["Год"];
                const minNum = min === "" ? -Infinity : parseInt(min, 10);
                const maxNum = max === "" ? Infinity : parseInt(max, 10);
                return item[key] >= minNum && item[key] <= maxNum;
              } else if (key == "Высота") {
                const [min, max] = filterField["Высота"];
                const minNum = min === "" ? -Infinity : parseFloat(min);
                const maxNum = max === "" ? Infinity : parseFloat(max);
                return item[key] >= minNum && item[key] <= maxNum;
              } else {
                const filterValue = filterField[key];
                if (filterValue === "") return true;
                return item[key].toLowerCase().includes(filterValue);
              }
              });
          }
          //передаем родительскому компоненту новое состояние - отфильтрованный массив
          props.filtering(arr);
    }

    const handleReset = (event) => {
        props.filtering(props.fullData);
    }
    return (
      <form onSubmit={ handleSubmit } onReset={ handleReset }>
        <p>
          <label>Название:</label>
          <input name="structure" type="text" />
        </p>  
        <p>
          <label>Type:</label>		
          <input name="type" type="text" />
        </p>
        <p>
          <label>Страна:</label>
          <input name="country" type="text" />
        </p>  
        <p>
          <label>Город:</label>    
          <input name="city" type="text" />
        </p>
        <p>
          <label>Год от:</label>    
          <input name="yearMin" type="number" />
          <label>Год до:</label>    
          <input name="yearMax" type="number" />
        </p>
        <p>
          <label>Высота от:</label>    
          <input name="heightMin" type="number" />
          <label>Высота до:</label>    
          <input name="heightMax" type="number" />
        </p>
        <p>         
          <button type="submit">Фильтровать</button>   
		  <button type="reset">Очистить фильтр</button>
		</p>  
      </form> 
    )
}

export default Filter;