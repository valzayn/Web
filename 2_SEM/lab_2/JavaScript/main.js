document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;
})

document.getElementById('draw').addEventListener("click", function() {
    draw(document.forms['setting']);
});
document.getElementById('clear').addEventListener("click", function() {
    d3.select("svg").selectAll('*').remove()
});
document.getElementById("animate").addEventListener("click", function() {
    runAnimation(document.forms["setting"]);

});
let hiden = document.getElementsByClassName("hide"); 
document.getElementsByClassName('put')[0].style.display = "none";
for (let i = 0; i < hiden.length; i++) {
    hiden[i].style.display = "none";
}
document.getElementById("put_check").addEventListener("change", function() {
    if (document.getElementById("put_check").checked) {
        document.getElementsByClassName('put')[0].style.display = "inline-block";
        document.getElementsByClassName('cord')[0].style.display = "none";
    } else {
        document.getElementsByClassName('put')[0].style.display = "none";
        document.getElementsByClassName('cord')[0].style.display = "inline-block";
    }
});
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
        document.getElementById("put_check").checked = false;
        document.getElementsByClassName('put')[0].style.display = "none";
        document.getElementsByClassName('cord')[0].style.display = "inline-block";
    }
});

const draw = (dataForm) => {
   const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.mx.value}, ${dataForm.my.value}) rotate(${dataForm.a.value})`);
}

const runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg);
    if (!document.getElementById("put_check").checked) {
        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}), scale(${dataForm.mx.value}, ${dataForm.my.value}), rotate(${dataForm.a.value})`)
        .transition()
        .duration(6000)
        .ease(d3[dataForm.anim_select.value])
        .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}), scale(${dataForm.mx_finish.value}, ${dataForm.my_finish.value}), rotate(${dataForm.a_finish.value})`);
    } else {
        let path = drawPath(dataForm.put_select.value); 
        pict.attr("transform", `scale(${dataForm.mx.value}, ${dataForm.my.value}), rotate(${dataForm.a.value})`)
        .transition()
        .ease(d3[dataForm.anim_select.value])
        .duration(6000)
        .attrTween('transform', translateAlong(path.node(), Number(dataForm.mx.value), Number(dataForm.mx_finish.value), Number(dataForm.my.value), Number(dataForm.my_finish.value), Number(dataForm.a.value), Number(dataForm.a_finish.value)));
    }
    
}