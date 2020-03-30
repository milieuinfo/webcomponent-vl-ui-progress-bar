const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const VlProgressBarStep = require('../components/vl-progress-bar-step');

class VlProgressBar extends VlElement {  
    async isNumeric() {
        return this.hasAttribute('data-vl-numeric');
    }

    async getStep(number) {
        const steps = await this._getSteps();
        const element = steps[--number];
        return new VlProgressBarStep(this.driver, element);
    }

    async _getSteps() {
        return this.shadowRoot.findElements(By.css('.vl-progress-bar__step'));
    }
}

module.exports = VlProgressBar;
