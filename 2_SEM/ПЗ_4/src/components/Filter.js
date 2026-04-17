import { useState } from "react";

const Filter = (props) => {
  const [resetFilter, setResetFilter] = useState(props.stateFilter);
  const handleSubmit = (event) => {        
    event.preventDefault();   

    const filterField = {
      "Название": event.target["title"].value.toLowerCase(),
      "Жанр": event.target["genre"].value.toLowerCase(),
      "Страна": event.target["country"].value.toLowerCase(),
      "Год": [event.target["yearMin"].value, event.target["yearMax"].value],
      "Рейтинг": [event.target["ratingMin"].value, event.target["ratingMax"].value],
      "Возраст": [event.target["ageMin"].value, event.target["ageMax"].value]
    };
    
    const filteredData = props.fullData.filter(item => {
      if (filterField["Название"] && 
          !String(item["Название"]).toLowerCase().includes(filterField["Название"])) {
        return false;
      }

      if (filterField["Жанр"] && 
          !String(item["Жанр"]).toLowerCase().includes(filterField["Жанр"])) {
        return false;
      }

      if (filterField["Страна"] && 
          !String(item["Страна"]).toLowerCase().includes(filterField["Страна"])) {
        return false;
      }

      const [yearMin, yearMax] = filterField["Год"];
      const minYear = yearMin === "" ? -Infinity : parseInt(yearMin, 10);
      const maxYear = yearMax === "" ? Infinity : parseInt(yearMax, 10);
      if (item["Год"] < minYear || item["Год"] > maxYear) {
        return false;
      }

      const [ratingMin, ratingMax] = filterField["Рейтинг"];
      const minRating = ratingMin === "" ? -Infinity : parseFloat(ratingMin);
      const maxRating = ratingMax === "" ? Infinity : parseFloat(ratingMax);
      if (item["Рейтинг"] < minRating || item["Рейтинг"] > maxRating) {
        return false;
      }
      
      const [ageMin, ageMax] = filterField["Возраст"];
      const minAge = ageMin === "" ? -Infinity : parseFloat(ageMin);
      const maxAge = ageMax === "" ? Infinity : parseFloat(ageMax);
      if (item["Возраст"] < minAge || item["Возраст"] > maxAge) {
        return false;
      }
      
      return true;
    });
    
    props.filtering(filteredData);
  }

    const handleReset = (event) => {
      setResetFilter(true);
      props.filtering(props.fullData);
      if (props.onReset) {
        props.onReset();
      }
    }
    return (
      <form onSubmit={ handleSubmit } onReset={ handleReset }>
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
          <input name="ratingMin" type="number" />
          <label>Рейтинг до:</label>    
          <input name="ratingMax" type="number" />
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