import { CalculadoraCarbono } from "../../js/classes/CalculadoraCarbono.js";

const arrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>`;
const template = document.getElementById("template");
const container = document.getElementById("calculator-container");
const carbonButton = document.getElementById("calculate-carbon-footprint-btn");
const calculator = new CalculadoraCarbono();
const balloon = document.getElementById('balloon');
let isComputerScreen = window.innerWidth > 800 ? true : false;
let balloonShown = false;
let currentQuestion = 0;


let userData = {
    carKm: 0,
    publicKm: 0,
    meatMeals: 0,
    vegetarianMeals: 0,
    energyConsumption: 0,
    isRenewable: false,
    domesticFlights: 0,
    internationalFlights: 0,
}

const mapaPerguntas = {
    0: 'carKm',
    1: 'publicKm',
    2: 'meatMeals',
    3: 'vegetarianMeals',
    4: 'energyConsumption',
    5: 'isRenewable',
    6: 'domesticFlights',
    7: 'internationalFlights'
};

const perguntasRespostas = [
    {
        pergunta: "Quantos quilômetros você percorre semanalmente de carro?",
        type: "number",
        respostas: null // Aqui será salvo o input do usuário
    },
    {
        pergunta: "Quantos quilômetros você utiliza transporte público semanalmente?",
        type: "number",
        respostas: null
    },
    {
        pergunta: "Quantas refeições com carne você faz por semana?",
        type: "number",
        respostas: null
    },
    {
        pergunta: "Quantas refeições vegetarianas você consome por semana?",
        type: "number",
        respostas: null
    },
    {
        pergunta: "Qual é o seu consumo mensal de energia elétrica em quilowatt-hora (kWh), aproximadamente?",
        type: "number",
        respostas: null
    },
    {
        pergunta: "A energia elétrica utilizada em sua residência é proveniente de fontes renováveis?",
        type: "radio",
        respostas: null // true ou false
    },
    {
        pergunta: "Quantos voos domésticos você realiza por ano?",
        type: "number",
        respostas: null
    },
    {
        pergunta: "Quantos voos internacionais você faz por ano?",
        type: "number",
        respostas: null
    }
];

let getCurrentQuestion = () => perguntasRespostas[currentQuestion].pergunta;

let showQuestion = (questionField) => questionField.innerHTML = getCurrentQuestion();
;

let getNextQuestion = () => {
    if (currentQuestion == 7) showCalculatorResultScreen();
    if (currentQuestion < 7) currentQuestion++;

}

const clearContainer = function (oldContainer, newContainer) {
        container.querySelector(`#${oldContainer}`).classList.add('screen-fade-out');
        container.querySelector(`#${newContainer}`).classList.add('screen-fade-in');
        setTimeout(() => {
            container.querySelector(`#${oldContainer}`).remove();
            container.querySelector(`#${newContainer}`).classList.remove('screen-fade-in');
        }, 1010);
}

const showCalculatorResultScreen = () => {
    console.log("-------------- No showCalculatorResultScreen --------------");
    let calculatorResultTemplate = document.getElementById("calculator-result-template");
    let index = 0;
    calculatorResultTemplate = document.importNode(calculatorResultTemplate.content, true);
    
    const total = calculator.calculateTotal(buildUserData());
    const suggestion = calculator.getSuggestions(calculator.calculateByAction(buildUserData()));
    calculatorResultTemplate.querySelector('h2').innerHTML = `<span class="co2-span">${total}</span> toneladas de <span class="co2-span">CO<sup>2</sup></span> por ano`;
    suggestion.forEach((suggestion) => {
        const suggestionElement = document.createElement('p');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = suggestion;
        calculatorResultTemplate.querySelector('.suggestions').appendChild(suggestionElement);
    })
    
    container.appendChild(calculatorResultTemplate);

    const suggestionElements = document.querySelectorAll('.suggestion');
    const applySuggestionHoverAnimation = () => {
        if (index > 0) {
          suggestionElements[index - 1].classList.remove("hovered-suggestion");
        }
        if (index < suggestionElements.length) {
          suggestionElements[index].classList.add("hovered-suggestion");
          index++;
          setTimeout(applySuggestionHoverAnimation, 1300);
        } else {
          setTimeout(() => {
            suggestionElements.forEach(text => text.classList.remove("hovered-suggestion"));
            index = 0;
          }, 1000);
        }
    }
    
    clearContainer("calculator", "calculator-result");
    applySuggestionHoverAnimation();
    setTimeout(showCalculatorDetailScreen, 7000);
}

const showCalculatorDetailScreen = () => {
    console.log("-------------- No showCalculatorDetailScreen --------------");
    const container = document.getElementById("calculator-container");
    let calculatorDetailTemplate = document.getElementById("calculator-detail-template");
    calculatorDetailTemplate = document.importNode(calculatorDetailTemplate.content, true);

    const details = calculator.calculateByAction(buildUserData());

    Object.entries(details).forEach(([key, value]) => {
        const detailElement = document.createElement('p');
        detailElement.innerHTML = `<span id="details-title">${key}</span>:   <span class="co2-span">${value}</span> quilogramas de <span class="co2-span">CO<sup>2</sup></span> por ano`;
        calculatorDetailTemplate.querySelector('#calculator-details').appendChild(detailElement);
    });
 
    container.appendChild(calculatorDetailTemplate);
    clearContainer("calculator-result", "calculator-details");
}

const buildUserData = () => {
    console.log("-------------- No buildUserData --------------");
    perguntasRespostas.forEach((pergunta, index) => {
        const resposta = pergunta.respostas;
        const propriedade = mapaPerguntas[index];
        userData[propriedade] = resposta;
    })
    console.log(userData);
    return userData;
}

const createInputLabel = (input) => {
    const label = document.createElement("label");
    label.textContent = input.value == "true" ? "Sim" : "Não";
    return label;
}

const createInput = () => {
    const input = document.createElement("input");
    input.type = perguntasRespostas[currentQuestion].type;
    if (input.type === "number") {
        input.max = 3000;
        input.placeholder = "Digite um número...";
    }
    if (input.type === "radio") {
        input.name = "radioInput";
        return [
            input.cloneNode(),
            input.cloneNode()
        ]
    };
    return input;
}

const saveResponse = (response) => {
    console.log("-------------- No saveResponse --------------");
    const question = perguntasRespostas.find(question => question.pergunta === getCurrentQuestion());
    question.respostas = response;
    console.log(`${question.pergunta} ${response}`);
}

let initTemplate = () => {
    const clone = document.importNode(template.content, true);
    const button = document.createElement("button");
    const calculatorBody = clone.getElementById("calculator-body");
    const paragraph = clone.querySelector('p');
    let inputLabel = [];
    let input = [];

    button.textContent = "Próxima";
    button.innerHTML = arrowSvg;

    const changeQuestion = () => {
        console.log("-------------- No changeQuestion --------------");
        if (perguntasRespostas[currentQuestion].type === "radio") {
            input.forEach((radioInput, index) => {
                calculatorBody.removeChild(input[index].parentElement);
            })

        } else {
            calculatorBody.removeChild(input);
        }

        getNextQuestion();
        showQuestion(paragraph);
        showInput();
    }

    const confirmResponse = () => {
        let response = null;
        if (perguntasRespostas[currentQuestion].type === "radio") {
            const checkbox = document.querySelector('input[name="radioInput"]:checked');
            if (checkbox) response = checkbox.value == "true" ? true : false;
        }

        if (perguntasRespostas[currentQuestion].type === "number" && document.querySelector('input[type="number"]').value) response = document.querySelector('input[type="number"]').value;

        if (response != null) {
            saveResponse(response);
            changeQuestion();
        }
    }


    const showInput = () => {

        if (perguntasRespostas[currentQuestion].type === "radio") {
            if (!Array.isArray(input)) input = [];
            createInput().forEach((radioInput, index) => {
                input.push(radioInput);

                radioInput.value = index == 0 ? true : false;

                inputLabel.push(createInputLabel(radioInput));
                const radioContainer = document.createElement('div');
                radioContainer.classList.add('radio-container');
                radioContainer.appendChild(inputLabel[index]);
                radioContainer.appendChild(radioInput);
                calculatorBody.appendChild(radioContainer);


            });

        } else {
            input = createInput();
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") confirmResponse();
            })

            if (isComputerScreen) {
                input.addEventListener('mouseenter', function () {
                    if (!balloonShown) {
                        const balloon = document.getElementById('balloon');
                        balloon.classList.remove('hidden');
                        balloonShown = true;
                        setTimeout(() => {
                            balloon.classList.add('hidden');
                        }, 3000);
                    }
                });
            }

            calculatorBody.appendChild(input);
            input.focus();
        }
    }

    button.addEventListener("click", confirmResponse);

    showQuestion(paragraph);
    showInput();

    clone.getElementById("calculator").appendChild(button);
    container.appendChild(clone);

    clearContainer("initial", "calculator");
}

carbonButton.addEventListener("click", initTemplate);

