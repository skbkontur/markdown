import { Preview } from '@storybook/react';
import { storyBookMainDecorators } from './helpers';
import { a11yRules } from '../a11y/rules';

const preview: Preview = {
  parameters: {
    creevey: { captureElement: '#storybook-root' },
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [a11yRules.buttonName, a11yRules.linkName],
        disableOtherRules: true,
      },
      options: {},
      manual: false,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Theme for components',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [storyBookMainDecorators],
};

export default preview;
