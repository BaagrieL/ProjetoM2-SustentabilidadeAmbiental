export class CalculadoraCarbono {
    constructor() {
        // Dados base para cálculos
        this.emissionFactors = {
            transport: {
                car: 0.25,
                publicTransport: 0.05,
            },
            food: {
                meat: 3,
                vegetarian: 0.5,
            },
            energy: {
                nonRenewable: 0.5,
                renewable: 0.1,
            },
            flights: {
                domestic: 0.15, // toneladas por voo
                international: 0.5, // toneladas por voo
            },
        };
    }

    /**
     * Calcula o impacto de carbono do transporte com base na quilometragem anual de carro
     * e transporte público.
     *
     * @param {number} carKm - Quilômetros semanais percorridos de carro.
     * @param {number} publicKm - Quilômetros semanais percorridos em transporte público.
     * @returns {number} Impacto total de carbono do transporte em quilogramas por ano.
     */
    calculateTransport(carKm, publicKm) {
        const carImpact = carKm * this.emissionFactors.transport.car * 52; // 52 semanas no ano
        const publicImpact = publicKm * this.emissionFactors.transport.publicTransport * 52;
        return carImpact + publicImpact;
    }

    /**
     * Calcula o impacto de carbono devido a alimentação, com base no número de refeições
     * de carne e refeições vegetarianas por semana.
     *
     * @param {number} meatMeals - Número de refeições de carne por semana.
     * @param {number} vegetarianMeals - Número de refeições vegetarianas por semana.
     * @returns {number} Impacto total de carbono da alimentação em quilogramas por ano.
     */
    calculateFood(meatMeals, vegetarianMeals) {
        const meatImpact = meatMeals * this.emissionFactors.food.meat * 52;
        const vegetarianImpact = vegetarianMeals * this.emissionFactors.food.vegetarian * 52;
        return meatImpact + vegetarianImpact;
    }

    /**
     * Calcula o impacto de carbono devido ao consumo de energia, com base no consumo
     * mensal de energia em kWh e se a fonte de energia é renovável ou não.
     *
     * @param {number} energyConsumption - Consumo mensal de energia em kWh.
     * @param {boolean} isRenewable - Indica se a fonte de energia é renovável ou não.
     * @returns {number} Impacto total de carbono do consumo de energia em quilogramas por ano.
     */
    calculateEnergy(energyConsumption, isRenewable) {
        const factor = isRenewable
            ? this.emissionFactors.energy.renewable
            : this.emissionFactors.energy.nonRenewable;
        return energyConsumption * factor * 12; // 12 meses no ano
    }

    /**
     * Calcula o impacto de carbono devido a viagens, com base no número de voos
     * domésticos e internacionais por ano.
     *
     * @param {number} domesticFlights - Número de voos domésticos por ano.
     * @param {number} internationalFlights - Número de voos internacionais por ano.
     * @returns {number} Impacto total de carbono das viagens em quilogramas por ano.
     */
    calculateFlights(domesticFlights, internationalFlights) {
        const domesticImpact = domesticFlights * this.emissionFactors.flights.domestic;
        const internationalImpact = internationalFlights * this.emissionFactors.flights.international;
        return (domesticImpact + internationalImpact) * 1000; // Conversão para kg
    }

    /**
     * Método principal que integra todos os cálculos de impacto de carbono
     *
     * @param {object} data - Objeto com dados do usuário para calcular o impacto de carbono, incluindo:
     *  - {number} carKm: Quilômetros semanais percorridos de carro
     *  - {number} publicKm: Quilômetros semanais percorridos em transporte público
     *  - {number} meatMeals: Número de refeições de carne por semana
     *  - {number} vegetarianMeals: Número de refeições vegetarianas por semana
     *  - {number} energyConsumption: Consumo mensal de energia em kWh
     *  - {boolean} isRenewable: Indica se a fonte de energia é renovável ou não
     *  - {number} domesticFlights: Número de voos domésticos por ano
     *  - {number} internationalFlights: Número de voos internacionais por ano
     * @returns {string} Impacto total de carbono em toneladas por ano, arredondado para 2 casas decimais
     */
    calculateTotal(data) {
        const transportImpact = this.calculateTransport(data.carKm, data.publicKm);
        const foodImpact = this.calculateFood(data.meatMeals, data.vegetarianMeals);
        const energyImpact = this.calculateEnergy(data.energyConsumption, data.isRenewable);
        const flightImpact = this.calculateFlights(data.domesticFlights, data.internationalFlights);

        const totalImpact = transportImpact + foodImpact + energyImpact + flightImpact;
        return (totalImpact / 1000).toFixed(2); // Retorna em toneladas
    }

    /**
     * Calcula o impacto de carbono para cada ação do usuário e retorna um objeto com
     * as seguintes propriedades:
     *
     * - transport: Impacto total de carbono do transporte em quilogramas por ano
     * - food: Impacto total de carbono da alimentação em quilogramas por ano
     * - energy: Impacto total de carbono do consumo de energia em quilogramas por ano
     * - flights: Impacto total de carbono dos voos em quilogramas por ano
     *
     * @param {object} data - Objeto com dados do usuário para calcular o impacto de
     *  carbono, incluindo:
     *  - {number} carKm: Quilômetros semanais percorridos de carro
     *  - {number} publicKm: Quilômetros semanais percorridos em transporte público
     *  - {number} meatMeals: Número de refeições de carne por semana
     *  - {number} vegetarianMeals: Número de refeições vegetarianas por semana
     *  - {number} energyConsumption: Consumo mensal de energia em kWh
     *  - {boolean} isRenewable: Indica se a fonte de energia é renovável ou não
     *  - {number} domesticFlights: Número de voos domésticos por ano
     *  - {number} internationalFlights: Número de voos internacionais por ano
     * @returns {object} Um objeto com as propriedades acima
     */
    calculateByAction(data) {
        const results = {
          transporte: 0,
          comida: 0,
          energia: 0,
          voos: 0
        };
      
        results.transporte = this.calculateTransport(data.carKm, data.publicKm).toFixed(2);
        results.comida = this.calculateFood(data.meatMeals, data.vegetarianMeals).toFixed(2);
        results.energia = this.calculateEnergy(data.energyConsumption, data.isRenewable).toFixed(2);
        results.voos = this.calculateFlights(data.domesticFlights, data.internationalFlights).toFixed(2);
      
        return results;
      }



    /**
     * Recebe um objeto com as quantidades de carbono de cada ação do usuário e
     * retorna um array com sugestões de como melhorar a pegada de carbono.
     *
     * @param {object} totalByAction - Um objeto com as seguintes propriedades:
     *  - {number} transport: Impacto total de carbono do transporte em quilogramas por ano
     *  - {number} food: Impacto total de carbono da alimentação em quilogramas por ano
     *  - {number} energy: Impacto total de carbono do consumo de energia em quilogramas por ano
     *  - {number} flights: Impacto total de carbono dos voos em quilogramas por ano
     * @returns {Array<string>} Um array com sugestões de como reduzir a pegada de carbono
     */
    getSuggestions(totalByAction) {
        console.log(totalByAction);

        const suggestions = [];
        if (totalByAction.transporte > 800) {
            suggestions.push('É uma boa ideia a compra de um carro elétrico ou híbrido.');
        }
        if (totalByAction.transporte > 460) {
            suggestions.push('Considere reduzir o uso do carro e optar por transporte público ou bicicleta.');
        }

        if (totalByAction.comida > 932) {
            suggestions.push('Já pensou em comprar alimentos orgânicos? Fazem bem para você e para o planeta.');
        }
        if (totalByAction.comida > 624) {
            suggestions.push('Se possível, reduza o consumo de carne e opte por alimentos vegetarianos.');
        }

        if (totalByAction.energia > 1800) {
            suggestions.push('Pense na possibilidade de instalar painéis solares ou opte por energia renovável.');
        }
        if (totalByAction.energia > 800) {
            suggestions.push('Às vezes investir em equipamentos mais energéticamente econômicos salva seu bolso e a natureza.');
        }

        if (totalByAction.voos > 2) {
            suggestions.push('Seria interessante reduzir os voos internacionais e optar por voos domésticos.');
        }
        if (suggestions.length === 0) {
            suggestions.push('Continue assim! Você está no caminho certo para melhorar sua pegada de carbono.');
        }
        return suggestions;
    }
}