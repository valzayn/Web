document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 400;      
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
    
    const arr = [15, -30, 2, 6, 34, -12];
    
    const preob = arr.map(d => d3.scaleLinear()
        .domain([d3.min(arr), d3.max(arr)])
        .range([0, 300])(d));
    
    for (let i = 0; i < preob.length; i++) {
        svg.append("circle")
            .attr("cx", 100)
            .attr("cy", preob[i] + 30)
            .attr("r", 20)
            .attr("stroke", "black")
            .attr("fill", "none");

         svg.append("text")
            .attr("x", 100)
            .attr("y", preob[i] + 30)
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .attr("font-size", "12px")
            .text(arr[i]);
    }
});