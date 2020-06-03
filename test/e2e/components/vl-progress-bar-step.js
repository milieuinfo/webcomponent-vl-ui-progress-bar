const {VlElement} = require('vl-ui-core').Test;
const {VlTooltip} = require('vl-ui-tooltip').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlProgressBarStep extends VlElement {
  async hover() {
    const button = await this._getButton();
    return button.hover();
  }

  async click() {
    const button = await this._getButton();
    return button.click();
  }

  async isActive() {
    return this.hasClass('vl-progress-bar__step--active');
  }

  async hasFocus() {
    const button = await this._getButton();
    return button.hasFocus();
  }

  async getTooltip() {
    const tooltip = await this.findElement(By.css('vl-tooltip'));
    return new VlTooltip(this.driver, tooltip);
  }

  async _getButton() {
    const element = await this.findElement(By.css('button'));
    return new VlElement(this.driver, element);
  }
}

module.exports = VlProgressBarStep;
