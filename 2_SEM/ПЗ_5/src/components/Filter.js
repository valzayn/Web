const Filter = (props) => {
      const handleSubmit = (event) => {        
        event.preventDefault();   

      // создаем словарь со значениями полей формы
      const filterField = {
          "Название": event.target["title"].value.toLowerCase(),
          "Жанр": event.target["genre"].value.toLowerCase(),
          "Страна": event.target["country"].value.toLowerCase(),
          "Год": [event.target["yearMin"].value, event.target["yearMax"].value],
          "Рейтинг": [event.target["ratingMin"].value, event.target["ratingMax"].value],
          "Возраст": [event.target["ageMin"].value, event.target["ageMax"].value]
        };
        
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in filterField) {
            arr = arr.filter(item => {
              if (key === "Год") {
                const [min, max] = filterField["Год"];
                const minNum = min === "" ? -Infinity : parseInt(min, 10);
                const maxNum = max === "" ? Infinity : parseInt(max, 10);
                return item[key] >= minNum && item[key] <= maxNum;
              } else if (key === "Рейтинг") {
                const [min, max] = filterField["Рейтинг"];
                const minNum = min === "" ? -Infinity : parseFloat(min);
                const maxNum = max === "" ? Infinity : parseFloat(max);
                return item[key] >= minNum && item[key] <= maxNum;
              } else if (key === "Возраст") {
                const [min, max] = filterField["Возраст"];
                const minNum = min === "" ? -Infinity : parseInt(min, 10);
                const maxNum = max === "" ? Infinity : parseInt(max, 10);
                return item[key] >= minNum && item[key] <= maxNum;
              } else {
                const filterValue = filterField[key];
                if (filterValue === "") return true;
                return String(item[key]).toLowerCase().includes(filterValue);
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
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label>Название:</label>
          <input name="title" type="text" />
        </p>  
        <p>
          <label>Жанр:</label>    
          <input name="genre" type="text" />
        </p>
        <p>
          <label>Страна:</label>
          <input name="country" type="text" />
        </p>  
        <p>
          <label>Год от:</label>    
          <input name="yearMin" type="number" />
          <label>Год до:</label>    
          <input name="yearMax" type="number" />
        </p>
        <p>
          <label>Рейтинг от:</label>    
          <input name="ratingMin" type="number" step="0.1" />
          <label>Рейтинг до:</label>    
          <input name="ratingMax" type="number" step="0.1" />
        </p>
        <p>
          <label>Возраст от:</label>    
          <input name="ageMin" type="number" />
          <label>Возраст до:</label>    
          <input name="ageMax" type="number" />
        </p>
        <p>         
          <button type="submit">Фильтровать</button>   
          <button type="reset">Очистить фильтр</button>
        </p>  
      </form> 
    )
}

export default Filter;