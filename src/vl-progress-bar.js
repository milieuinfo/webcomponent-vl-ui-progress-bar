import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-progress-bar/dist/js/progress-bar.js';
import '/node_modules/vl-ui-tooltip/dist/vl-tooltip.js';
import './vl-progress-bar-item.js';

/**
 * VlProgressBar
 * @class
 * @classdesc Gebruik de progress-bar component om de vooruitgang te laten zien van een proces dat uit verschillende stappen bestaat.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-progress-bar/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-progress-bar/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-progress-bar.html|Demo}
 * 
 */
export class VlProgressBar extends VlElement(HTMLElement) {
    static get _observedChildClassAttributes() {
        return ['numeric'];
    }

    constructor() {
        super(`
            <style>
                @import '/src/style.css';
                @import '/node_modules/vl-ui-tooltip/dist/style.css';
            </style>
            <div class="vl-progress-bar"></div>
        `);
    }

    connectedCallback() {
        this._processItems();
        this._progressBar = new window['progress-bar'](this.constructor);
    }

    /**
     * Zet een stap actief al dan niet met focus.
     * 
     * @param {number} number - Het nummer van de stap die actief wordt.
     * @param {boolean} focus - Focus bepaalt of de stap in de progress bar focus krijgt.
     */
    updateStep(number, focus) {
        this._activeItem.active = false;
        this._getItem(number - 1).active = true;
        this._progressBar.updateStep(this._shadow, number, focus);
    }

    get _classPrefix() {
        return 'vl-progress-bar--'
    }

    get _items() {
        return this.querySelectorAll('vl-progress-bar-item');
    }

    get _activeItem() {
        return this.querySelector('vl-progress-bar-item[data-vl-active]');
    }

    _getItem(index) {
        return this._items[index];
    }

    _processItems() {
        this._processActiveItem();
        const items = [... this._items].map(item => item.template);
        items.forEach(item => this._element.appendChild(item));
    }

    _processActiveItem() {
        if (!this._activeItem) {
            this._getItem(0).active = true;
        }
    }
}

define('vl-progress-bar', VlProgressBar);