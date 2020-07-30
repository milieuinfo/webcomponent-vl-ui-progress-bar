import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-progress-bar/dist/js/progress-bar.js';
import '/node_modules/vl-ui-tooltip/dist/vl-tooltip.js';
import {VlProgressBarStep} from './vl-progress-bar-step.js';

/**
 * VlProgressBar
 * @class
 * @classdesc Gebruik de progress-bar component om de vooruitgang te laten zien van een proces dat uit verschillende stappen bestaat.
 *
 * @extends HTMLElement
 *
 * @property {boolean} data-vl-numeric - Attribuut zorgt ervoor dat er nummers getoond worden in de progress bar per stap.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-progress-bar/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-progress-bar/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-progress-bar.html|Demo}
 *
 */
export class VlProgressBar extends vlElement(HTMLElement) {
  static get _observedChildClassAttributes() {
    return ['numeric'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-progress-bar/dist/style.css';
        @import '/node_modules/vl-ui-tooltip/dist/style.css';
      </style>
      <div class="vl-progress-bar"></div>
    `);
  }

  connectedCallback() {
    this._observer = this.__observeChildElements(this._processSteps.bind(this));
    this._processSteps();
    // eslint-disable-next-line new-cap
    this._progressBar = new window['progress-bar'](this.constructor);
  }

  disconnectedCallback() {
    this._observer.disconnect();
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

  /**
   * Geeft de progress bar DOM
   *
   * @return {HTMLElement}
   */
  get element() {
    return this._element;
  }

  /**
   * Geeft van elke stap het button element.
   *
   * @return {HTMLElement[]}
   */
  get buttons() {
    return this._element.querySelectorAll(VlProgressBarStep._buttonSelector);
  }

  get _classPrefix() {
    return 'vl-progress-bar--';
  }

  get _steps() {
    return this.querySelectorAll('vl-progress-bar-step');
  }

  get _activeStep() {
    return this.querySelector('vl-progress-bar-step[data-vl-active]');
  }

  _getStep(index) {
    return this._steps[index];
  }

  _processSteps() {
    this._element.innerHTML = '';
    this._setFirstStepAsActiveWhenThereIsNoActiveStepDefined();
    const steps = [...this._steps].map((step) => step.template);
    steps.forEach((step) => this._element.appendChild(step));
  }

  _setFirstStepAsActiveWhenThereIsNoActiveStepDefined() {
    if (!this._activeStep && this._steps && this._steps.length > 0) {
      this._getStep(0).active = true;
    }
  }

  __observeChildElements(callback) {
    const observer = new MutationObserver(callback);
    observer.observe(this, {childList: true, subtree: true});
    return observer;
  }
}

define('vl-progress-bar', VlProgressBar);
