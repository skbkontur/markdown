import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  core: { disableTelemetry: true },
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'creevey',
  ],
  framework: '@storybook/react-vite',
  typescript: {
    check: false,
    reactDocgen: false,
  },
};

export default config;
