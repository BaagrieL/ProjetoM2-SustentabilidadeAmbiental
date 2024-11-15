document.getElementById('learn-more-btn').addEventListener('click', function() {
    alert("Saiba mais sobre as ações que você pode tomar para ajudar o meio ambiente!");
});

document.getElementById('show-graph-btn').addEventListener('click', function() {
    var graph = document.getElementById('graph');
    graph.style.display = (graph.style.display === 'block') ? 'none' : 'block';
});

document.getElementById('tips-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var response = document.getElementById('tips-response');
    response.innerHTML = "<p>Obrigado por contribuir com ações sustentáveis!</p>";
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var response = document.getElementById('contact-response');
    response.innerHTML = "<p>Obrigado pelo seu contato. Responderemos em breve!</p>";
});
