// Função para exibir uma mensagem de alerta
function showAlert(message) {
    alert(message);
}

// Função para alternar a exibição de um elemento
function toggleDisplay(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
}

// Função para manipular respostas de formulários
function showResponse(formId, message) {
    const response = document.getElementById(formId);
    response.innerHTML = `<p>${message}</p>`;
}

// Event Listeners
document.getElementById('learn-more-btn').addEventListener('click', () => {
    showAlert("Saiba mais sobre as ações que você pode tomar para ajudar o meio ambiente!");
});

document.getElementById('show-graph-btn').addEventListener('click', () => {
    toggleDisplay('graph');
});

document.getElementById('tips-form').addEventListener('submit', (event) => {
    event.preventDefault();
    showResponse('tips-response', 'Obrigado por contribuir com ações sustentáveis!');
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    showResponse('contact-response', 'Obrigado pelo seu contato. Responderemos em breve!');
});
