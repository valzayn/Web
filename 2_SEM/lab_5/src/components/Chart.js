import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {

   const [ox, setOx] = useState("Страна");
   const [oy, setOy] = useState([true, false])
   const [chartType, setChartType] = useState("Точечная диаграмма");
   const [error, setError] = useState(false);

   const handleSubmit = (event) => {        
        event.preventDefault();
        setOx(event.target["ox"].value); 
        const maxChecked = event.target["oyMax"].checked;
        const minChecked = event.target["oyMin"].checked;
        setOy([maxChecked, minChecked]);
        setChartType(event.target["chartType"].value);
        setError(false);
  }

  const handleError = () => {
        setError(true);
  }
  const handleCheckboxChange = () => {
        setError(false);
  }

  const createArrGraph =(data, key)=>{   
        let dataForGroup = [...data];
        if (key === "Год") {
            dataForGroup.sort((a, b) => a[key] - b[key]);
        }
        
        const groupObj = d3.group(dataForGroup, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        return arrGraph;
    }

   return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p> Значение по оси OX: </p>
    <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" }/>
      Страна
      <br/>   
          <input type="radio" name="ox" value="Год" />
      Год
    </div>

        <p> Значение по оси OY </p>
    <div>
          <input 
            type="checkbox" 
            name="oyMax" 
            defaultChecked={ oy[0] === true }
            style={{ outline: error && !oy[0] && !oy[1] ? "2px solid red" : "none" }}
            onChange={ handleCheckboxChange }
          />
      Максимальная высота <br/>
          <input 
            type="checkbox"
            name="oyMin"
            defaultChecked={ oy[1] === true }
            style={{ outline: error && !oy[0] && !oy[1] ? "2px solid red" : "none" }}
            onChange={ handleCheckboxChange }
          />
      Минимальная высота
    </div>

        <p> Тип диаграммы: </p>
        <div>
          <select name="chartType">
            <option value="Точечная диаграмма">Точечная диаграмма</option>
            <option value="Гистограмма">Гистограмма</option>
          </select>
        </div>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>
      <ChartDraw 
        data={ createArrGraph(props.data, ox) } 
        oySettings={oy} 
        chartType={chartType}
        onError={handleError}
      />
  </>
    )
}

export default Chart;