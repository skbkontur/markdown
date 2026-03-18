import { delay } from '@skbkontur/react-ui/lib/utils';
import { story, kind, test } from 'creevey';

kind('Markdown', () => {
  story('CustomWidth', ({ setStoryParameters }) => {
    setStoryParameters({ skip: !!process.env.STORYBOOK_TEAMCITY_VERSION });

    test('withPreview', async context => {
      const button = context.webdriver.locator('button[class*="react-ui"]').nth(-2);

      const idle = await context.takeScreenshot();

      await button.click();

      const preview = await context.takeScreenshot();

      await context.matchImages({ idle, preview });
    });

    test('withFullscreen', async context => {
      const buttons = context.webdriver.locator('button[class*="react-ui"]');

      await buttons.nth(-1).click();
      const fullscreenSplit = await context.takeScreenshot();

      await buttons.nth(-2).click();
      const fullscreenPreview = await context.takeScreenshot();

      await buttons.nth(-2).click();
      const fullscreenEdit = await context.takeScreenshot();

      await context.matchImages({
        fullscreenSplit,
        fullscreenPreview,
        fullscreenEdit,
      });
    });
  });

  for (const storyName of ['WithoutHints', 'WithActionHint', 'WithShortKeyHint', 'WithActionAndShortKeyHints']) {
    story(storyName, ({ setStoryParameters }) => {
      setStoryParameters({ skip: !!process.env.STORYBOOK_TEAMCITY_VERSION });

      test('hint', async context => {
        const boldButton = context.webdriver.locator('button[class*="react-ui"]').nth(1);

        await boldButton.hover();

        await delay(500);

        const hint = await context.takeScreenshot();

        await context.matchImages({ hint });
      });
    });
  }

  story('Editable', ({ setStoryParameters }) => {
    setStoryParameters({ skip: !!process.env.STORYBOOK_TEAMCITY_VERSION });

    test('markdownTests', async context => {
      const textarea = context.webdriver.locator('textarea').nth(0);
      const buttons = context.webdriver.locator('button[class*="react-ui"]');

      await textarea.click();
      await textarea.type('Заголовок');

      await textarea.press('Control+A');
      await buttons.nth(0).click();
      const openedDropdown = await context.takeScreenshot();

      await buttons.nth(1).click();
      const h2FromButton = await context.takeScreenshot();

      await textarea.press('Control+A');
      await textarea.type('Заголовок');
      await textarea.press('Control+A');
      await textarea.press('Control+Shift+2');
      const h2FromKeyboard = await context.takeScreenshot();

      await textarea.press('Control+A');
      await textarea.type('Жирный');
      await textarea.press('Control+A');
      await buttons.nth(1).click();
      const boldFromButton = await context.takeScreenshot();

      await textarea.press('Control+A');
      await textarea.type('Жирный');
      await textarea.press('Control+A');
      await textarea.press('Control+B');
      const boldFromKeyboard = await context.takeScreenshot();

      await buttons.nth(12).click();
      const openedEmojiPicker = await context.takeScreenshot();

      await context.matchImages({
        openedDropdown,
        h2FromButton,
        h2FromKeyboard,
        boldFromButton,
        boldFromKeyboard,
        openedEmojiPicker,
      });
    });
  });
});
