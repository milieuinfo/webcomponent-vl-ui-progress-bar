const { Page, Config } = require('vl-ui-core').Test;
const { VlButton } = require('vl-ui-button').Test;
const VlProgressBar = require('../components/vl-progress-bar');

class VlProgressBarPage extends Page {
    async getProgressBar() {
        return this._getProgressBar('#progress-bar');
    }

    async getNumericProgressBar() {
        return this._getProgressBar('#progress-bar-numeric');
    }

    async getInteractiveProgressBar() {
        return this._getProgressBar('#progress-bar-interactive');
    }

    async getInteractiveFocusProgressBar() {
        return this._getProgressBar('#progress-bar-interactive-focus');
    }

    async getInteractiveProgressBarButton(number) {
        return this._getButton(`#progress-bar-interactive-step-${number}-button`);
    }

    async getInteractiveFocusProgressBarButton(number) {
        return this._getButton(`#progress-bar-interactive-focus-step-${number}-button`);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-progress-bar.html');
    }

    async _getProgressBar(selector) {
        return new VlProgressBar(this.driver, selector);
    }

    async _getButton(selector) {
        return new VlButton(this.driver, selector);
    }
}

module.exports = VlProgressBarPage;
