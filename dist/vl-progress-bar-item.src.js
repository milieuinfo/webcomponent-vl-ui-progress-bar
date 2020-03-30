import { VlElement, define } from 'vl-ui-core';

/**
 * VlProgressBarItem
 * @class
 * @classdesc Onderdeel van de progress-bar die een stap voorstelt van een proces dat uit verschillende stappen bestaat.
 * 
 * @extends VlElement
 * 
 * @property {boolean} data-vl-active - Attribuut wordt gebruikt om aan te geven dat de stap actief is.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-progress-bar/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-progress-bar/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-progress-bar-item.html|Demo}
 * 
 */
export class VlProgressBarItem extends VlElement(HTMLElement) {
    /**
     * Geeft de tekst van de progress bar item.
     * 
     * @return {string}
     */
    get text() {
        return this.innerText;
    }

    /**
     * Geeft terug of de progress bar item actief is.
     * 
     * @return {boolean}
     */
    get active() {
        return this.hasAttribute('data-vl-active');
    }

    get template() {
        const activeClass = this.active ? 'vl-progress-bar__step--active' : '';
        const ariaCurrent = this.active ? 'aria-current="step"' : '';
        return this._template(`
            <div class="vl-progress-bar__step ${activeClass}">
                <button class="vl-progress-bar__bullet" ${ariaCurrent} aria-label="${this.text}">
                    <vl-tooltip placement="top">${this.text}</vl-tooltip>
                    <span class="vl-u-visually-hidden">${this.text}</span>
                </button>
            </div>
        `);
    }

    /**
     * Bepaal of de progress bar item actief is.
     * 
     * @param {boolean} value
     */
    set active(value) {
        this.toggleAttribute('data-vl-active', value);
    }
}

define('vl-progress-bar-item', VlProgressBarItem);
