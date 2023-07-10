import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

import { getStoryContext } from '@storybook/test-runner';

/*
 * See https://storybook.js.org/docs/7.0/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const a11yConfig = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not test a11y for stories that disable a11y
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules ?? [],
      disableOtherRules: true,
    });

    await checkA11y(page, '#test-element', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // pass axe options defined in @storybook/addon-a11y
      axeOptions: storyContext.parameters?.a11y?.options,
    });
  },
};

module.exports = a11yConfig;
