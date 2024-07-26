// Variables para almacenar las respuestas
var responses = {
    yes: 0,
    no: 0
};

// Función para actualizar el gráfico
function updateChart() {
    var ctx = document.getElementById('responsesChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sí', 'No'],
            datasets: [{
                label: 'Número de Respuestas',
                data: [responses.yes, responses.no],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
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
        // Actualizar el gráfico con las respuestas finales
        updateChart();
    }
}

function nextStep(step) {
    console.log("Siguiente paso: " + step);
    loadQuestion(step);
}

// Iniciar con el primer paso
loadQuestion(0);
console.log("Iniciando el solucionador de problemas");
