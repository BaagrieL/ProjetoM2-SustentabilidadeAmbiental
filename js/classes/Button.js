import Component from "./Component.js";

export default class Button extends Component {
    /**
     * Cria um botão com o id e o label especificados e o anexa ao pai especificado.
     *
     * @param {string} id - O id do botão.
     * @param {string} label - O texto do botão.
     * @param {HTMLElement} parent - O pai do botão.
     */
    constructor(id, label, parent) {
        super(id, parent);
        this.label = label;
        this.render();
    }

    render() {
        if (this.element) {
            this.element.innerHTML = this.label;
            this.show();
        }
    }

    setLabel(newLabel) {
        this.label = newLabel;
        this.render();
    }
}