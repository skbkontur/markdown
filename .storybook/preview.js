import { addDecorator, addParameters } from '@storybook/react';
import { storyBookMainDecorators } from './helpers';
import { a11yRules } from '../a11y/rules';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

addDecorator(storyBookMainDecorators);

addParameters({
  creevey: { captureElement: '#root' },
  a11y: {
    element: '#root',
    config: {
      rules: [a11yRules.buttonName, a11yRules.linkName],
      disableOtherRules: true,
    },
    manual: false,
  },
});
