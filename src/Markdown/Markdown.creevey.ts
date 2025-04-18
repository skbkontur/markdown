import { story, kind, test } from 'creevey';

kind('Markdown', () => {
  story('MediumSize', ({ setStoryParameters }) => {
    setStoryParameters({ skip: !!process.env.STORYBOOK_TEAMCITY_VERSION });

    test('withPreview', async function () {
      const buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      const idle = await this.captureElement?.takeScreenshot();
      await this.browser
        .actions()
        .click(buttons[buttons.length - 2])
        .perform();
      const preview = await this.captureElement?.takeScreenshot();
      await this.expect({ idle, preview }).to.matchImages();
    });

    test('withFullscreen', async function () {
      let buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser
        .actions()
        .click(buttons[buttons.length - 1])
        .perform();
      const fullscreenSplit = await this.captureElement?.takeScreenshot();

      buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser
        .actions()
        .click(buttons[buttons.length - 2])
        .perform();
      const fullscreenPreview = await this.captureElement?.takeScreenshot();

      buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser
        .actions()
        .click(buttons[buttons.length - 2])
        .perform();
      const fullscreenEdit = await this.captureElement?.takeScreenshot();

      await this.expect({ fullscreenSplit, fullscreenPreview, fullscreenEdit }).to.matchImages();
    });
  });

  story('Editable', ({ setStoryParameters }) => {
    setStoryParameters({ skip: !!process.env.STORYBOOK_TEAMCITY_VERSION });

    test('markdownTests', async function () {
      const textarea = await this.browser.findElement({ tagName: 'textarea' });
      const buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });

      await this.browser.actions().click(textarea).perform();
      await this.browser.actions().sendKeys('Заголовок').keyDown(this.keys.CONTROL).sendKeys('a').perform();
      await this.browser.actions().click(buttons[0]).perform();

      const openedDropdown = await this.captureElement?.takeScreenshot();
      const newButtons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser.actions().click(newButtons[1]).perform();
      const h1FromButton = await this.captureElement?.takeScreenshot();
      await this.browser
        .actions()
        .keyDown(this.keys.CONTROL)
        .sendKeys('a')
        .sendKeys('Заголовок')
        .keyDown(this.keys.CONTROL)
        .sendKeys('a')
        .keyDown(this.keys.CONTROL)
        .keyDown(this.keys.ALT)
        .sendKeys('1')
        .perform();
      const h1FromKeyboard = await this.captureElement?.takeScreenshot();
      await this.browser
        .actions()
        .keyDown(this.keys.CONTROL)
        .sendKeys('a')
        .sendKeys('Жирный')
        .keyDown(this.keys.CONTROL)
        .sendKeys('a')
        .click(buttons[1])
        .perform();
      const boldFromButton = await this.captureElement?.takeScreenshot();
      await this.browser
        .actions()
        .keyDown(this.keys.CONTROL)
        .sendKeys('a')
        .sendKeys('Жирный')
        .keyDown(this.keys.CONTROL)
        .sendKeys('a')
        .keyDown(this.keys.CONTROL)
        .keyDown(this.keys.ALT)
        .sendKeys('b')
        .perform();
      const boldFromKeyboard = await this.captureElement?.takeScreenshot();
      await this.browser.actions().click(buttons[12]).perform();
      const openedEmojiPicker = await this.captureElement?.takeScreenshot();
      await this.expect({
        openedDropdown,
        h1FromButton,
        h1FromKeyboard,
        boldFromButton,
        boldFromKeyboard,
        openedEmojiPicker,
      }).to.matchImages();
    });

    test('withFullscreen', async function () {
      let buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser
        .actions()
        .click(buttons[buttons.length - 1])
        .perform();
      const fullscreenSplit = await this.captureElement?.takeScreenshot();

      buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser
        .actions()
        .click(buttons[buttons.length - 2])
        .perform();
      const fullscreenPreview = await this.captureElement?.takeScreenshot();

      buttons = await this.browser.findElements({ css: 'button[class*="react-ui"]' });
      await this.browser
        .actions()
        .click(buttons[buttons.length - 2])
        .perform();
      const fullscreenEdit = await this.captureElement?.takeScreenshot();

      await this.expect({ fullscreenSplit, fullscreenPreview, fullscreenEdit }).to.matchImages();
    });
  });
});
