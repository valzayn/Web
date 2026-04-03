function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];
    for(let entry of groupObj) {
        const ratings = entry[1].map(d => d['Рейтинг']);
        const minMax = d3.extent(ratings);
        const avg = ratings.reduce((sum, val) => sum + val, 0) / ratings.length;
        arrGraph.push({
            labelX : entry[0], 
            values : minMax,
            avgRating : avg
        });
    }
    return arrGraph;
}

function drawGraph(data, dataForm) {
    const keyX = document.querySelector('input[name="axis_selection"]:checked').value;
    let arrGraph = createArrGraph(data, keyX);

    if (keyX === "Год") {
        arrGraph.sort((a, b) => a.labelX <= b.labelX ? -1 : 1);
    }

    const svg = d3.select("svg")
    svg.selectAll('*').remove();

    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    const svgNode = svg.nodes()[0];
    const maxCheckbox = dataForm.querySelector("#max_rating");
    const minCheckbox = dataForm.querySelector("#min_rating");
    const avgCheckbox = dataForm.querySelector("#avg_rating");
    const isMax = maxCheckbox.checked;
    const isMin = minCheckbox.checked;
    const isAvg = avgCheckbox.checked;

    if(!isMax && !isMin && !isAvg) {
        maxCheckbox.style.outline = "2px solid red";
        minCheckbox.style.outline = "2px solid red";
        avgCheckbox.style.outline = "2px solid red";
        svgNode.style.display = "none";
        return;
    } else {
        svgNode.style.display = "block";
        maxCheckbox.style.outline = "none";
        minCheckbox.style.outline = "none";
        if(avgCheckbox) avgCheckbox.style.outline = "none";
    }

    const selectedOption = dataForm.querySelector("#type").value;

    let allValues = [];
    if(isMax) allValues = allValues.concat(arrGraph.map(d => d.values[1]));
    if(isMin) allValues = allValues.concat(arrGraph.map(d => d.values[0]));
    if(isAvg) allValues = allValues.concat(arrGraph.map(d => d.avgRating));
    const [minVal, maxVal] = d3.extent(allValues);

    const [scX, scY] = createAxis(svg, arrGraph, attr_area, minVal, maxVal);

    if(isMax) {
        if(selectedOption === "Точечная диаграмма") {
            createChart(svg, arrGraph, scX, scY, attr_area, "red", true);
        } else if(selectedOption === "График") {

            createLineChart(svg, arrGraph, scX, scY, attr_area, "red", true);
        } else if(selectedOption === "Гистограмма") {
            createHistogram(svg, arrGraph, scX, scY, attr_area, "red", true);
        }
    }
    if(isMin) {
        if(selectedOption === "Точечная диаграмма") {
            createChart(svg, arrGraph, scX, scY, attr_area, "blue", false);
        } else if(selectedOption === "График") {
            createLineChart(svg, arrGraph, scX, scY, attr_area, "blue", false);
        } else if(selectedOption === "Гистограмма") {
            createHistogram(svg, arrGraph, scX, scY, attr_area, "blue", false);
        }
    }
    if(isAvg) {
        if(selectedOption === "Точечная диаграмма") {
            createAvgChart(svg, arrGraph, scX, scY, attr_area, "green");
        } else if(selectedOption === "График") {
            createAvgLineChart(svg, arrGraph, scX, scY, attr_area, "green");
        } else if(selectedOption === "Гистограмма") {
            createAvgHistogram(svg, arrGraph, scX, scY, attr_area, "green");
        }
    }
}

function createAxis(svg, data, attr_area, minVal, maxVal) {
    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
        .domain([Math.max(0, minVal * 0.85), Math.min(10, maxVal * 1.1)])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, is_max) {
    const r = 4;

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => {
            let yPos = scaleY(d.values[is_max ? 1 : 0])
            if (d.values[0] === d.values[1]) {
                yPos += is_max ? -r / 2 : r / 2
            }
            return yPos;
        })
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, color, is_max) {
    const w = 8;

    svg.selectAll(".rects")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - (is_max ? 0 : w))
        .attr("y", d => scaleY(d.values[is_max ? 1 : 0]))
        .attr("width", w)
        .attr("height", d => attr_area.height - scaleY(d.values[is_max ? 1 : 0]) - 2 * attr_area.marginY)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createLineChart(svg, data, scaleX, scaleY, attr_area, color, is_max) {
    const domainOrder = scaleX.domain();

    const sortedData = [...data].sort((a, b) => {
        const indexA = domainOrder.indexOf(a.labelX);
        const indexB = domainOrder.indexOf(b.labelX);
        return indexA - indexB;
    });
    for (let i = 0; i < data.length; i++) {
        alert(data[i]['values']);
    }

    const line = d3.line()
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .y(d => scaleY(d.values[is_max ? 1 : 0]));

    svg.append("path")
        .datum(sortedData)
        .attr("d", line)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "none")
        .style("stroke", color)
        .style("stroke-width", 2);

    svg.selectAll(".dot-line")
        .data(sortedData)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[is_max ? 1 : 0]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color);
}

function createAvgChart(svg, data, scaleX, scaleY, attr_area, color) {
    const r = 4;

    svg.selectAll(".dot-avg")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.avgRating))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createAvgLineChart(svg, data, scaleX, scaleY, attr_area, color) {
    const sortedData = [...data].sort((a, b) => {
        if (typeof a.labelX === 'number') return a.labelX - b.labelX;
        return String(a.labelX).localeCompare(String(b.labelX));
    });

    const line = d3.line()
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .y(d => scaleY(d.avgRating))
        .curve(d3.curveMonotoneX);

    svg.append("path")
        .datum(sortedData)
        .attr("d", line)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "none")
        .style("stroke", color)
        .style("stroke-width", 2);

    svg.selectAll(".dot-avg-line")
        .data(sortedData)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.avgRating))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color);
}

function createAvgHistogram(svg, data, scaleX, scaleY, attr_area, color) {
    const w = 8;

    svg.selectAll(".rects-avg")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - w/2)
        .attr("y", d => scaleY(d.avgRating))
        .attr("width", w)
        .attr("height", d => attr_area.height - scaleY(d.avgRating) - 2 * attr_area.marginY)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}