import { delay } from '@skbkontur/react-ui/lib/utils';
import { story, kind, test } from 'creevey';

import { MarkdownTids } from './MarkdownTids';

const getByTid = (tid: MarkdownTids) => `[data-tid="${tid}"]`;

kind('Markdown', () => {
  story('CustomWidth', ({ setStoryParameters }) => {
    setStoryParameters({ skip: !!process.env.STORYBOOK_TEAMCITY_VERSION });

    test('withPreview', async context => {
      const previewButton = context.webdriver.locator(getByTid(MarkdownTids.PreviewView));

      const idle = await context.takeScreenshot();

      await previewButton.click();

      const preview = await context.takeScreenshot();

      await context.matchImages({ idle, preview });
    });

    test('withFullscreen', async context => {
      const fullscreenButton = context.webdriver.locator(getByTid(MarkdownTids.FullscreenToggle));
      const previewButton = context.webdriver.locator(getByTid(MarkdownTids.PreviewView));
      const editButton = context.webdriver.locator(getByTid(MarkdownTids.EditView));

      await fullscreenButton.click();
      const fullscreenSplit = await context.takeScreenshot();

      await previewButton.click();
      const fullscreenPreview = await context.takeScreenshot();

      await editButton.click();
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
        const boldButton = context.webdriver.locator(getByTid(MarkdownTids.Bold));

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
      const headingDropdown = context.webdriver.locator(getByTid(MarkdownTids.HeadingDropdown));
      const headingH2 = context.webdriver.locator(getByTid(MarkdownTids.HeadingH2));
      const boldButton = context.webdriver.locator(getByTid(MarkdownTids.Bold));
      const emojiButton = context.webdriver.locator(getByTid(MarkdownTids.Emoji));

      await textarea.click();
      await textarea.type('Заголовок');

      await textarea.press('Control+A');
      await headingDropdown.click();
      const openedDropdown = await context.takeScreenshot();

      await headingH2.click();
      const h2FromButton = await context.takeScreenshot();

      await textarea.press('Control+A');
      await textarea.type('Заголовок');
      await textarea.press('Control+A');
      await textarea.press('Control+Shift+2');
      const h2FromKeyboard = await context.takeScreenshot();

      await textarea.press('Control+A');
      await textarea.type('Жирный');
      await textarea.press('Control+A');
      await boldButton.click();
      const boldFromButton = await context.takeScreenshot();

      await textarea.press('Control+A');
      await textarea.type('Жирный');
      await textarea.press('Control+A');
      await textarea.press('Control+B');
      const boldFromKeyboard = await context.takeScreenshot();

      await emojiButton.click();
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
