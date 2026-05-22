import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {

   const [ox, setOx] = useState("Жанр");
   const [oy, setOy] = useState([true, false])
   const [chartType, setChartType] = useState("Точечная диаграмма");
   const [showError, setShowError] = useState(false);
   const [shouldDraw, setShouldDraw] = useState(true);

   const handleSubmit = (event) => {        
        event.preventDefault();
        const newOx = event.target["ox"].value;
        const maxChecked = event.target["oyMax"].checked;
        const minChecked = event.target["oyMin"].checked;
        
        setOx(newOx);
        setOy([maxChecked, minChecked]);
        setChartType(event.target["chartType"].value);
        
        if (!maxChecked && !minChecked) {
            setShowError(true);
            setShouldDraw(false);
        } else {
            setShowError(false);
            setShouldDraw(true);
        }
  }

  const handleCheckboxChange = (event) => {
        setShowError(false);
  }

  const createArrGraph = (data, key) => {   
        let dataForGroup = [...data];
        if (key === "Год") {
            dataForGroup.sort((a, b) => a[key] - b[key]);
        }
        
        const groupObj = d3.group(dataForGroup, d => d[key]);
        let arrGraph = [];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Рейтинг']));
            arrGraph.push({
                labelX: entry[0], 
                values: minMax,
                count: entry[1].length
            });
        }
        return arrGraph;
    }

   const headers = props.data.length > 0 ? Object.keys(props.data[0]) : [];
   const textFields = headers.filter(h => h !== "Год" && h !== "Рейтинг" && h !== "Возраст");
   
   return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>
        <div>
          {textFields.map(field => (
            <div key={field}>
              <input 
                type="radio" 
                name="ox" 
                value={field} 
                defaultChecked={ox === field}
              />
              {field}
            </div>
          ))}
        </div>

        <p>Значение по оси OY:</p>
        <div>
          <input 
            type="checkbox" 
            name="oyMax" 
            defaultChecked={oy[0]}
            style={{ outline: showError ? "2px solid red" : "none" }}
            onChange={handleCheckboxChange}
          />
          Максимальный рейтинг <br/>
          <input 
            type="checkbox" 
            name="oyMin" 
            defaultChecked={oy[1]}
            style={{ outline: showError ? "2px solid red" : "none" }}
            onChange={handleCheckboxChange}
          />
          Минимальный рейтинг
        </div>

        <p>Тип диаграммы:</p>
        <div>
          <select name="chartType">
            <option value="Точечная диаграмма">Точечная диаграмма</option>
            <option value="Гистограмма">Гистограмма</option>
          </select>
        </div>

        <p>  
          <button type="submit">Построить</button>
        </p>
      </form>
      {shouldDraw && (
        <ChartDraw 
          data={createArrGraph(props.data, ox)} 
          oySettings={oy} 
          chartType={chartType}
        />
      )}
    </>
    )
}

export default Chart;