/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/
// создаем массив точек, расположенных буквой "Г"
/*function createPathG() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")

    let data = [];
    const padding = 100;
    //начальное положение рисунка
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY > padding) {
        data.push( {x: posX, y: posY});
        posY -= h;
    }
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    return data
}*/

function createPathG() {
    const svg = d3.select("svg.main")
    const width = svg.attr("width")
    const height = svg.attr("height")

    let data = [];
    const padding = 500;
    //начальное положение рисунка
    let posX = 500;
    let posY = 50;
    const h = 5;
    while (posX > width - padding) {
        data.push( {x: posX, y: posY});
        posX -= h;
    }
    while (posY < 250) {
        data.push( {x: posX, y: posY});
        posY += h;
    }
    while (posX < padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    while (posY <= 450) {
        data.push( {x: posX, y: posY});
        posY += h;
    }
    while (posX > width - padding) {
        data.push( {x: posX, y: posY});
        posX -= h;
    }

    return data
}


function translateAlong(path, mx, my, a, mx_to = mx, my_to = my, a_to = a) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y}) scale(${mx + (mx_to - mx) * t},${my + (my_to - my) * t}) rotate(${a + (a_to - a) * t})`;
        }
    }
}

const drawPath = (typePath) => {
    // создаем массив точек
    const dataPoints = (typePath == 0)? createPathG() : createPathCircle();

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg.main")
    // создаем путь на основе массива точек   
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'black')
        .attr('fill', 'none');
        
    return path;    
}