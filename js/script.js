// Função para exibir uma mensagem de alerta
function showAlert(message) {
    alert(message);
}

// Função para alternar a visibilidade de um elemento com base em seu ID
function toggleDisplay(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden'); // Alterna a classe 'hidden'
    } else {
        console.warn(`Elemento com ID '${elementId}' não encontrado.`);
    }
}

// Função para manipular respostas de formulários
function showResponse(responseId, message) {
    const response = document.getElementById(responseId);
    if (response) {
        response.innerHTML = `<p>${message}</p>`;
    } else {
        console.warn(`Elemento com ID '${responseId}' não encontrado.`);
    }
}

// Função para lidar com a troca de tema (modo escuro)
function toggleTheme(darkModeToggle) {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    // Alterna o tema e salva a preferência no localStorage
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Atualiza o texto do botão de acordo com o novo tema
    darkModeToggle.textContent = newTheme === "dark" ? "Desativar Modo Escuro" : "Ativar Modo Escuro";
}

// Função para inicializar o tema e configurar o botão
function initializeTheme() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    
    // Define o tema inicial e atualiza o botão
    document.documentElement.setAttribute("data-theme", savedTheme);
    darkModeToggle.textContent = savedTheme === "dark" ? "Desativar Modo Escuro" : "Ativar Modo Escuro";
    
    // Adiciona o evento de clique para alternar o tema
    darkModeToggle.addEventListener("click", () => toggleTheme(darkModeToggle));
}

// Event Listeners para interações na página
document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o tema
    initializeTheme();
    
    // Configura o envio do formulário de dicas
    document.getElementById('tips-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        showResponse('tips-response', 'Obrigado por contribuir com ações sustentáveis!');
    });

    // Configura o envio do formulário de contato
    document.getElementById('contact-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        showResponse('contact-response', 'Obrigado pelo seu contato. Responderemos em breve!');
    });
});

