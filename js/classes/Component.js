export default class Component {
    /**
     * Cria um componente com o id e o elemento pai especificados.
     *
     * @param {string} id - O id do componente.
     * @param {HTMLElement} parent - O pai do componente.
     */
    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        this.element = this.createElement();

        this.show();
    }


    /**
     * Cria um elemento HTML com o id especificado e o anexa ao pai do componente.
     *
     * @returns {HTMLElement} O elemento HTML criado.
     */
    createElement () {
        if (this.id) {
            const element = document.createElement(`button`);
            element.id = this.id;
            this.parent.appendChild(element);

            return element;
        }
    }

    /**
     * Define a cor de fundo do componente.
     *
     * @param {string} color - A cor a ser aplicada ao fundo do elemento.
     */
    setBackgroundColor(color) {
        if (this.element) this.element.style.backgroundColor = color;
    }

    show() {
        if (this.element) this.element.style.display = 'block';
    }

    hide() {
        if (this.element) this.element.style.display = 'none';
    }
}