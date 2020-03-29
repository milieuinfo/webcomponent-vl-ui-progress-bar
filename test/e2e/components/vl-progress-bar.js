const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const VlProgressBarItem = require('../components/vl-progress-bar-item');

class VlProgressBar extends VlElement {  
    async isNumeric() {
        return this.hasAttribute('data-vl-numeric');
    }

    async getStep(number) {
        const element = (await this._getSteps())[--number];
        return new VlProgressBarItem(this.driver, element);
    }

    async _getSteps() {
        return this.shadowRoot.findElements(By.css('.vl-progress-bar__step'));
    }
}

module.exports = VlProgressBar;
