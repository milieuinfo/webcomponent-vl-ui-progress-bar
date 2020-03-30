import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-progress-bar/dist/js/progress-bar.js';
import '/node_modules/vl-ui-tooltip/dist/vl-tooltip.js';
import './vl-progress-bar-step.js';

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
        this.__observeChildElements(this._processSteps.bind(this));
        this._processSteps();
        this._progressBar = new window['progress-bar'](this.constructor);
    }

    /**
     * Zet een stap actief al dan niet met focus.
     * 
     * @param {number} number - Het nummer van de stap die actief wordt.
     * @param {boolean} focus - Focus bepaalt of de stap in de progress bar focus krijgt.
     */
    updateStep(number, focus) {
        this._activeStep.active = false;
        this._getStep(number - 1).active = true;
        this._progressBar.updateStep(this._shadow, number, focus);
    }

    get _classPrefix() {
        return 'vl-progress-bar--'
    }

    get _steps() {
        return this.querySelectorAll('vl-progress-bar-step');
    }

    get _activeStep() {
        return this.querySelector('vl-progress-bar-step[data-vl-active]');
    }

    _getStep(index) {
        return this._steps[index];
    }

    _processSteps() {
        this._element.innerHTML = '';
        this._setFirstStepAsActiveWhenThereIsNoActiveStepDefined();
        const steps = [... this._steps].map(step => step.template);
        steps.forEach(step => this._element.appendChild(step));
    }

    _setFirstStepAsActiveWhenThereIsNoActiveStepDefined() {
        if (!this._activeStep && this._steps && this._steps.length > 0) {
            this._getStep(0).active = true;
        }
    }

    __observeChildElements(callback) {
        const observer = new MutationObserver(callback);
        observer.observe(this, { childList: true, subtree: true });
        return observer;
    }
}

define('vl-progress-bar', VlProgressBar);