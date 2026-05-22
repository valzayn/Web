import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);
    
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        if (svg.node()) {
            setWidth(parseFloat(svg.style('width')) || 800);
            setHeight(parseFloat(svg.style('height')) || 600);
        }
    }, []); 
    
    const margin = {
        top: 20,
        bottom: 160, 
        left: 60,
        right: 20
    };
        
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    const [showMax, showMin] = props.oySettings;
    
    let allValues = [];
    if (showMax) allValues.push(...props.data.map(d => d.values[1]));
    if (showMin) allValues.push(...props.data.map(d => d.values[0]));
    let [min, max] = d3.extent(allValues);
    
    if (min === undefined) min = 0;
    if (max === undefined) max = 10;
    
    const r = 5;
        
    const scaleX = useMemo(() => {
        if (props.chartType === "Гистограмма") {
            return d3.scaleBand()
                .domain(props.data.map(d => String(d.labelX)))
                .range([0, boundsWidth])
                .padding(0.2);
        } else {
            return d3.scaleBand()
                .domain(props.data.map(d => String(d.labelX)))
                .range([0, boundsWidth])
                .padding(0.5);
        }
    }, [props.data, boundsWidth, props.chartType]);
  
    const scaleY = useMemo(() => {
        return d3.scaleLinear()
            .domain([Math.max(0, min - 0.5), max + 0.5])
            .range([boundsHeight, 0]);
    }, [boundsHeight, min, max]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
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
            .attr("transform", "rotate(-45)")
            .style("font-size", "11px");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        svg.append("text")
            .attr("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Рейтинг");
        
        if (props.chartType === "Точечная диаграмма") {
            if (showMax) {
                svg.selectAll(".dot-max")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", r)
                    .attr("cx", d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2)
                    .attr("cy", d => {
                        let yPos = scaleY(d.values[1]);
                        if (d.values[0] === d.values[1] && showMin) {
                            yPos += -r / 3;
                        }
                        return yPos;
                    })
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }
            if (showMin) {
                svg.selectAll(".dot-min")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", r)
                    .attr("cx", d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2)
                    .attr("cy", d => {
                        let yPos = scaleY(d.values[0]);
                        if (d.values[0] === d.values[1] && showMax) {
                            yPos += r / 3;
                        }
                        return yPos;
                    })
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
                    .attr("x", d => scaleX(String(d.labelX)) + (showMax && showMin ? 0 : barWidth / 2))
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", barWidth - 2)
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red")
                    .style("opacity", 0.8);
            }
            if (showMin) {
                svg.selectAll(".bar-min")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(String(d.labelX)) + (showMax && showMin ? barWidth : barWidth / 2))
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", barWidth - 2)
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")
                    .style("opacity", 0.8);
            }
        }

    }, [scaleX, scaleY, props.data, props.chartType, showMax, showMin, boundsHeight, height, margin]);

    return (
        <svg ref={chartRef} width="100%" height="600" style={{border: "1px solid #ccc", borderRadius: "5px", marginTop: "20px"}}></svg>
    )
}

export default ChartDraw;