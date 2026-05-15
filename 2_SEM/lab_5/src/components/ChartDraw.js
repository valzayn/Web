import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);
    
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    }); 
    
    const margin = {
        top:10, 
        bottom:60, 
        left:40, 
        right:10
    };
        
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    const [showMax, showMin] = props.oySettings;
    
    // Если ничего не выбрано, уведомляем родителя и очищаем svg
    useEffect(() => {
        if (!showMax && !showMin && props.onError) {
            props.onError();
        }
    }, [showMax, showMin]);
    
    let allValues = [];
    if (showMax) allValues.push(...props.data.map(d => d.values[1]));
    if (showMin) allValues.push(...props.data.map(d => d.values[0]));
    let [min, max] = d3.extent(allValues);
    
    if (min === undefined) min = 0;
    if (max === undefined) max = 100;
        
    const scaleX = useMemo(() => {
        if (props.chartType === "Гистограмма") {
            return d3.scaleBand()
                .domain(props.data.map(d => d.labelX))
                .range([0, boundsWidth])
                .padding(0.2);
        } else {
            return d3.scaleBand()
                .domain(props.data.map(d => d.labelX))
                .range([0, boundsWidth]);
        }
    }, [props.data, boundsWidth, props.chartType]);
  
    const scaleY = useMemo(() => {
        return d3.scaleLinear()
            .domain([min * 0.85, max * 1.1])
            .range([boundsHeight, 0]);
    }, [boundsHeight, min, max]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // Если ничего не выбрано, просто очищаем svg и выходим
        if (!showMax && !showMin) {
            return;
        }
        
        const xAxis = d3.axisBottom(scaleX);     
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        if (props.chartType === "Точечная диаграмма") {
            if (showMax) {
                svg.selectAll(".dot-max")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }
            if (showMin) {
                svg.selectAll(".dot-min")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        } else if (props.chartType === "Гистограмма") {
            const barWidth = scaleX.bandwidth() / (showMax && showMin ? 2 : 1);
            
            if (showMax) {
                svg.selectAll(".bar-max")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + (showMax && showMin ? 0 : barWidth / 2))
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", barWidth - 2)
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }
            if (showMin) {
                svg.selectAll(".bar-min")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + (showMax && showMin ? barWidth : barWidth / 2))
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", barWidth - 2)
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        }

    }, [scaleX, scaleY, props.data, props.chartType, showMax, showMin, boundsHeight, height, margin]);

    return (
      <svg ref={chartRef}></svg>
    )
}

export default ChartDraw;