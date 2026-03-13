document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg.main")
       .attr("width", width)
	   .attr("height", height) ;
})

document.getElementById('clear').addEventListener("click", function() {
    d3.select("svg").selectAll('*').remove()
});
document.getElementById("animate").addEventListener("click", function() {
    runAnimation(document.forms["setting"]);
});
let hiden = document.getElementsByClassName("hide"); 
for (let i = 0; i < hiden.length; i++) {
    hiden[i].style.display = "none";
}
document.getElementById('check_anim').addEventListener("change", function() {
    let check = document.getElementById("check_anim");
    if (check.checked) {
        for (let i = 0; i < hiden.length; i++) {
            hiden[i].style.display = "inline-block";
        }
        document.getElementById("animate").style.display = "block";
    } else {
        for (let i = 0; i < hiden.length; i++) {
            hiden[i].style.display = "none";
        }
    }
});

const runAnimation = (dataForm) => {
    const pict = d3.select("svg.pict")
    let xSm = 20;
    let ySm = 50;
    pict.append("rect")
     .attr("x", 20 - xSm)
     .attr("y", 50 - ySm)
     .attr("width", 50)
     .attr("height", 50)
     .style("fill", "none")
     .style("stroke", "black")
     .style("stroke-width", "2");
     pict.append("circle")
     .attr("cx", 35 - xSm)
     .attr("cy", 65 - ySm)
     .attr("r", 4)
     .style("stroke", "black")
     .style("stroke-width", "2");
      pict.append("circle")
     .attr("cx", 55 - xSm)
     .attr("cy", 65 - ySm)
     .attr("r", 4)
     .style("stroke", "black")
     .style("stroke-width", "2");
     pict.append("circle")
     .attr("cx", 55 - xSm)
     .attr("cy", 85 - ySm)
     .attr("r", 4)
     .style("stroke", "black")
     .style("stroke-width", "2");
     pict.append("circle")
     .attr("cx", 35 - xSm)
     .attr("cy", 85 - ySm)
     .attr("r", 4)
     .style("stroke", "black")
     .style("stroke-width", "2");
      pict.append("circle")
     .attr("cx", 45 - xSm)
     .attr("cy", 75 - ySm)
     .attr("r", 4)
     .style("stroke", "black")
     .style("stroke-width", "2");

    if (dataForm.check_anim.checked) {
        let path = drawPath(0); 
        pict.attr("transform", `scale(${dataForm.mx.value}, ${dataForm.my.value}), rotate(${dataForm.a.value})`)
        .transition()
        .ease(d3[dataForm.anim_select.value])
        .duration(dataForm.time.value)
        .attrTween('transform', translateAlong(path.node(), Number(dataForm.mx.value), Number(dataForm.my.value), Number(dataForm.a.value), Number(dataForm.mx_finish.value), Number(dataForm.my_finish.value), Number(dataForm.a_finish.value)));   
    } else {
        let path = drawPath(0); 
        pict.attr("transform", `scale(${dataForm.mx.value}, ${dataForm.my.value}), rotate(${dataForm.a.value})`)
        .transition()
        .ease(d3[dataForm.anim_select.value])
        .duration(dataForm.time.value)
        .attrTween('transform', translateAlong(path.node(), Number(dataForm.mx.value), Number(dataForm.my.value), Number(dataForm.a.value)));   
    }
    
}