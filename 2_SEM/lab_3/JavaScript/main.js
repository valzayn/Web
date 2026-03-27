document.addEventListener("DOMContentLoaded", function() {
    const dataForm = document.getElementById("settings");

    const clearStyle = (e) => {
        e.target.style.outline = "none";
    }

    const maxHeightCheckbox = dataForm.querySelector("#max_height");
    maxHeightCheckbox.addEventListener("change", (e) => {
        e.target.style.outline = "none";
    });
    const minHeightCheckbox = dataForm.querySelector("#min_height");
    minHeightCheckbox.addEventListener("change", (e) => {
        e.target.style.outline = "none";
    });

    drawGraph(buildings, dataForm);
    showTable('build', buildings);

    const buildButton = document.querySelector('input[value="Построить"]');
    buildButton.addEventListener('click', () => {
        drawGraph(buildings, dataForm);
    })

    const table = document.getElementById('build');
    const toggleTableButton = document.querySelector('input[value="Скрыть таблицу"]');
    toggleTableButton.addEventListener('click', (e) => {
        table.classList.toggle('hidden');

        if (table.classList.contains('hidden')) {
            hideTable('build');
            e.target.value = 'Показать таблицу';
        } else {
            showTable('build', buildings);
            e.target.value = 'Скрыть таблицу';
        }
    });
})