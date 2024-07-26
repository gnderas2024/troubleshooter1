document.addEventListener('DOMContentLoaded', function() {
    var responses = [];
    var questions = [
        "¿Está el cable de alimentación conectado correctamente?",
        "¿Probaste con otro cable de alimentación?",
        "¿Funciona el enchufe donde está conectado el equipo?",
        "¿Revisaste la fuente de alimentación del equipo?",
        "¿Intentaste encender el equipo con una batería nueva o diferente?",
        "Si todas las respuestas anteriores son 'Sí' y el problema persiste, por favor contacta al soporte técnico."
    ];

    function loadQuestion(step) {
        var container = document.getElementById('question-container');
        container.innerHTML = '';

        if (step < questions.length) {
            var question = document.createElement('div');
            question.innerHTML = '<p>' + questions[step] + '</p>';
            var yesButton = document.createElement('button');
            yesButton.innerText = 'Sí';
            yesButton.onclick = function() {
                responses[step] = 'Sí';
                nextStep(step + 1);
            };

            var noButton = document.createElement('button');
            noButton.innerText = 'No';
            noButton.onclick = function() {
                responses[step] = 'No';
                nextStep(step + 1);
            };

            container.appendChild(question);
            container.appendChild(yesButton);
            container.appendChild(noButton);
        } else {
            container.innerHTML = '<p>¡Gracias por completar el solucionador de problemas!</p>';
            renderFlowchart(); // Renderizar el diagrama de flujo
            updateChart(); // Actualizar el gráfico
        }
    }

    function nextStep(step) {
        loadQuestion(step);
    }

    function updateChart() {
        var ctx = document.getElementById('responsesChart').getContext('2d');
        if (!ctx) {
            console.error("El elemento canvas no se encontró.");
            return;
        }
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sí', 'No'],
                datasets: [{
                    label: 'Número de Respuestas',
                    data: [
                        responses.filter(r => r === 'Sí').length,
                        responses.filter(r => r === 'No').length
                    ],
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

    function renderFlowchart() {
        d3.select("#flowchart").selectAll("*").remove(); // Limpiar gráfico anterior

        var svg = d3.select("#flowchart").append("svg")
            .attr("width", "100%")
            .attr("height", "600");

        // Definir las flechas
        svg.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 9)
            .attr("refY", 5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 L 10 5 L 0 10 z");

        var nodes = [];
        var links = [];
        var yOffset = 50;
        var xOffset = 200;

        responses.forEach((response, index) => {
            var node = {
                id: index,
                x: xOffset,
                y: yOffset + (index * 100),
                question: questions[index],
                response: response
            };
            nodes.push(node);

            if (index > 0) {
                links.push({
                    source: index - 1,
                    target: index
                });
            }
        });

        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .attr("x1", d => nodes[d.source].x)
            .attr("y1", d => nodes[d.source].y)
            .attr("x2", d => nodes[d.target].x)
            .attr("y2", d => nodes[d.target].y)
            .attr("stroke", "#000000")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrow)");

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .on("click", function(event, d) {
                editNode(d.id);
            });

        node.append("rect")
            .attr("width", 200)
            .attr("height", 60)
            .attr("fill", "#ffffff")
            .attr("stroke", "#000000")
            .attr("rx", 10)
            .attr("ry", 10);

        node.append("text")
            .attr("x", 10)
            .attr("y", 30)
            .text(d => `${d.question} ${d.response}`)
            .attr("text-anchor", "start")
            .attr("alignment-baseline", "middle");
    }

    function editNode(id) {
        var response = prompt("Edit your response (Sí/No):", responses[id]);
        if (response === "Sí" || response === "No") {
            responses[id] = response;
            renderFlowchart(); // Volver a renderizar el diagrama de flujo
            updateChart(); // Volver a actualizar el gráfico
        }
    }

    // Iniciar con el primer paso
    loadQuestion(0);
});
