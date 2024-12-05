import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

import { getStoryContext, TestRunnerConfig } from '@storybook/test-runner';
import { ConfigOptions } from 'axe-playwright/dist/types';

const a11yConfig: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
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
    } as ConfigOptions);

    await checkA11y(page, '#test-element', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // pass axe options defined in @storybook/addon-a11y
    });
  },
};

export default a11yConfig;
