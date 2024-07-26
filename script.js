// Variables para almacenar las respuestas
var responses = {
    yes: 0,
    no: 0
};

// Función para crear un gráfico con D3.js
function createBarChart(data) {
    var svg = d3.select("#chart").append("svg")
        .attr("width", 500)
        .attr("height", 300);

    var x = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, 500])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([300, 0]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => 300 - y(d.value))
        .attr("fill", (d, i) => i === 0 ? "#36a2eb" : "#ff6384");
}

document.getElementById('next-button').addEventListener('click', function() {
    console.log("Botón 'Next' clickeado");
    // Lógica para moverse al siguiente paso basado en las respuestas
});

function loadQuestion(step) {
    console.log("Cargando pregunta para el paso: " + step);
    var container = document.getElementById('question-container');
    container.innerHTML = '';  // Limpiar el contenedor

    var questions = [
        "¿Está el cable de alimentación conectado correctamente?",
        "¿Probaste con otro cable de alimentación?",
        "¿Funciona el enchufe donde está conectado el equipo?",
        "¿Revisaste la fuente de alimentación del equipo?",
        "¿Intentaste encender el equipo con una batería nueva o diferente?",
        "Si todas las respuestas anteriores son 'Sí' y el problema persiste, por favor contacta al soporte técnico."
    ];

    if (step < questions.length) {
        var question = document.createElement('div');
        question.innerHTML = '<p>' + questions[step] + '</p>';
        var yesButton = document.createElement('button');
        yesButton.innerText = 'Sí';
        yesButton.onclick = function() {
            responses.yes++;
            nextStep(step + 1);
        };

        var noButton = document.createElement('button');
        noButton.innerText = 'No';
        noButton.onclick = function() {
            responses.no++;
            nextStep(step + 1);
        };

        container.appendChild(question);
        container.appendChild(yesButton);
        container.appendChild(noButton);
    } else {
        container.innerHTML = '<p>¡Gracias por completar el solucionador de problemas!</p>';
        // Crear el gráfico con las respuestas finales
        var data = [
            {label: 'Sí', value: responses.yes},
            {label: 'No', value: responses.no}
        ];
        createBarChart(data);
    }
}

function nextStep(step) {
    console.log("Siguiente paso: " + step);
    loadQuestion(step);
}

// Iniciar con el primer paso
loadQuestion(0);
console.log("Iniciando el solucionador de problemas");
