const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlProgressBarPage = require('./pages/vl-progress-bar.page');

describe('vl-progress-bar', async () => {
    const vlProgressBarPage = new VlProgressBarPage(driver);

    before(() => {
        return vlProgressBarPage.load();
    });

    it('als gebruiker kan ik het verschil zien tussen een actieve en een gewone progress bar stap', async () => {
        const progressBar = await vlProgressBarPage.getProgressBar();
        const step1 = await progressBar.getStep(1);
        const step2 = await progressBar.getStep(2);
        const step3 = await progressBar.getStep(3);
        await assert.eventually.isTrue(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isFalse(step3.isActive());
    });

    it('als gebruiker kan ik meer details zien over een stap door met de muis te hoveren over de stap', async () => {
        const progressBar = await vlProgressBarPage.getProgressBar();
        const step = await progressBar.getStep(1);
        const tooltip = await step.getTooltip();
        await assert.eventually.isFalse(tooltip.isDisplayed());
        await step.hover();
        await assert.eventually.isTrue(tooltip.isDisplayed());
    });

    it('als gebruiker kan ik het verschil zien tussen een numeric en een gewone progress bar', async () => {
        const progressBar = await vlProgressBarPage.getProgressBar();
        const numericProgressBar = await vlProgressBarPage.getNumericProgressBar();
        await assert.eventually.isFalse(progressBar.isNumeric());
        await assert.eventually.isTrue(numericProgressBar.isNumeric());
    });

    it('als gebruiker kan ik de active stap wijzigen', async () => {
        const progressBar = await vlProgressBarPage.getInteractiveProgressBar();
        const step1 = await progressBar.getStep(1);
        const step2 = await progressBar.getStep(2);
        const step3 = await progressBar.getStep(3);
        const button1 = await vlProgressBarPage.getInteractiveProgressBarButton(1);
        const button2 = await vlProgressBarPage.getInteractiveProgressBarButton(2);
        const button3 = await vlProgressBarPage.getInteractiveProgressBarButton(3);
        await assert.eventually.isFalse(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isTrue(step3.isActive());
        await button1.click();
        await assert.eventually.isTrue(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isFalse(step3.isActive());
        await button2.click();
        await assert.eventually.isFalse(step1.isActive());
        await assert.eventually.isTrue(step2.isActive());
        await assert.eventually.isFalse(step3.isActive());
        await button3.click();
        await assert.eventually.isFalse(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isTrue(step3.isActive());
    });

    it('als gebruiker kan ik de active stap wijzigen en focus geven', async () => {
        const progressBar = await vlProgressBarPage.getInteractiveFocusProgressBar();
        const step1 = await progressBar.getStep(1);
        const step2 = await progressBar.getStep(2);
        const step3 = await progressBar.getStep(3);
        const button1 = await vlProgressBarPage.getInteractiveFocusProgressBarButton(1);
        const button2 = await vlProgressBarPage.getInteractiveFocusProgressBarButton(2);
        const button3 = await vlProgressBarPage.getInteractiveFocusProgressBarButton(3);
        await assert.eventually.isFalse(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isTrue(step3.isActive());
        await assert.eventually.isFalse(step1.hasFocus());
        await assert.eventually.isFalse(step2.hasFocus());
        await assert.eventually.isFalse(step3.hasFocus());
        await button1.click();
        await assert.eventually.isTrue(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isFalse(step3.isActive());
        await assert.eventually.isTrue(step1.hasFocus());
        await assert.eventually.isFalse(step2.hasFocus());
        await assert.eventually.isFalse(step3.hasFocus());
        await button2.click();
        await assert.eventually.isFalse(step1.isActive());
        await assert.eventually.isTrue(step2.isActive());
        await assert.eventually.isFalse(step3.isActive());
        await assert.eventually.isFalse(step1.hasFocus());
        await assert.eventually.isTrue(step2.hasFocus());
        await assert.eventually.isFalse(step3.hasFocus());
        await button3.click();
        await assert.eventually.isFalse(step1.isActive());
        await assert.eventually.isFalse(step2.isActive());
        await assert.eventually.isTrue(step3.isActive());
        await assert.eventually.isFalse(step1.hasFocus());
        await assert.eventually.isFalse(step2.hasFocus());
        await assert.eventually.isTrue(step3.hasFocus());
    });
});
