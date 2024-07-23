document.getElementById('next-button').addEventListener('click', function() {
    // Lógica para moverse al siguiente paso basado en las respuestas
  });
  
  function loadQuestion(step) {
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
        nextStep(step + 1);
      };
  
      var noButton = document.createElement('button');
      noButton.innerText = 'No';
      noButton.onclick = function() {
        // Lógica para respuesta "No"
        nextStep(step + 1);
      };
  
      container.appendChild(question);
      container.appendChild(yesButton);
      container.appendChild(noButton);
    } else {
      container.innerHTML = '<p>¡Gracias por completar el solucionador de problemas!</p>';
    }
  }
  
  function nextStep(step) {
    loadQuestion(step);
  }
  
  // Iniciar con el primer paso
  loadQuestion(0);
  