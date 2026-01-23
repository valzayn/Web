function calculate(data) {
	/* находим на странице элемент для вывода данных */
	let output = document.getElementById('output');
	/* читаем входные данные */
	if (data.var.value == 1) {
		output.innerHTML = '';
		let osn = 2*data.input1.value * Math.cos(data.input2.value);
		let bokMed = (Math.sqrt(2*(Math.pow(data.input1.value, 2) + Math.pow(osn, 2)) + Math.pow(data.input1.value, 2)))/2;
		let h = Math.sqrt(Math.pow(data.input1.value, 2) - Math.pow(osn/2, 2));
		let p = 2*data.input1.value + osn;
		if (data.task1.checked || data.task2.checked || data.task3.checked) {
			output.innerHTML = "<p>Результат:</p>";
		}
		if (data.task1.checked) {
			let newElement1 = document.createElement('p')
			newElement1.innerHTML = `Периметр: ${ Math.round(p*1000)/1000 }`;
			output.appendChild(newElement1);
		}
		if (data.task2.checked) {
			let newElement2 = document.createElement('p')
			newElement2.innerHTML = `Боковые медианы: ${ Math.round(bokMed*1000)/1000 }`;
			output.appendChild(newElement2);
			let newElement3 = document.createElement('p')
			newElement3.innerHTML = `Высота(медиана к основанию): ${ Math.round(h*1000)/1000 }`;
			output.appendChild(newElement3);
		}
		if (data.task3.checked) {
			let newElement4 = document.createElement('p')
			newElement4.innerHTML = `Основание: ${ Math.round(osn*1000)/1000 }`;
			output.appendChild(newElement4);
		}
		return true;
	} else {
		output.innerHTML = '';
		let bok = data.input3.value/(2*Math.sin(data.input4.value/2));
		let bokMed = (Math.sqrt(2*(Math.pow(bok, 2) + Math.pow(data.input3.value, 2)) + Math.pow(bok, 2)))/2;
		let h = Math.sqrt(Math.pow(bok, 2) - Math.pow(data.input3.value/2, 2));
		let p = 2*bok + data.input3.value;
		if (data.task1.checked || data.task2.checked || data.task3.checked) {
			output.innerHTML = "<p>Результат:</p>";
		}
		if (data.task1.checked) {
			let newElement1 = document.createElement('p')
			newElement1.innerHTML = `Периметр: ${ Math.round(p*1000)/1000 }`;
			output.appendChild(newElement1);
		}
		if (data.task2.checked) {
			let newElement2 = document.createElement('p')
			newElement2.innerHTML = `Боковые медианы: ${ Math.round(bokMed*1000)/1000 }`;
			output.appendChild(newElement2);
			let newElement3 = document.createElement('p')
			newElement3.innerHTML = `Высота(медиана к основанию): ${ Math.round(h*1000)/1000 }`;
			output.appendChild(newElement3);
		}
		if (data.task3.checked) {
			let newElement4 = document.createElement('p')
			newElement4.innerHTML = `Боковые стороны: ${ Math.round(bok*1000)/1000 }`;
			output.appendChild(newElement4);
		}
		return true;
	}
}
document.getElementById("var1").style.display = "block";
document.getElementById("var2").style.display = "none";
let radios = document.forms[0].var;
let button = document.forms[0].submit;
radios[0].addEventListener('click', function(event) {
	document.getElementById('output').innerHTML = '';
	document.getElementById("var1").style.display = "block";
	document.getElementById("var2").style.display = "none";
});
radios[1].addEventListener('click', function(event) {
	document.getElementById('output').innerHTML = '';
	document.getElementById("var2").style.display = "block";
	document.getElementById("var1").style.display = "none";
});

let input1 = document.forms[0].input1;
input1.addEventListener('blur', function(event) {
	if (input1.value < 0) {
		input1.style.color = "red";
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});
input1.addEventListener('focus', function(event) {
	input1.style.color = "black";
});

let input2 = document.forms[0].input2;
input2.addEventListener('blur', function(event) {
	if (input2.value < 0 || input2.value > 90) {
		input2.style.color = "red";
			button.disabled = true;
	} else {
		button.disabled = false;
	}
});
input2.addEventListener('focus', function(event) {
	input2.style.color = "black";
});

let input3 = document.forms[0].input3;
input3.addEventListener('blur', function(event) {
	if (input3.value < 0) {
		input3.style.color = "red";
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});
input3.addEventListener('focus', function(event) {
	input3.style.color = "black";
});

let input4 = document.forms[0].input4;
input4.addEventListener('blur', function(event) {
	if (input4.value < 0 || input4.value > 90) {
		input4.style.color = "red";
		button.disabled = true;
	} else {
		button.disabled = false;
	}
});
input4.addEventListener('focus', function(event) {
	input4.style.color = "black";
});