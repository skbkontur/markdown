module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'creevey',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: async config => {
    config.module.rules.push(
      ...[
        {
          test: /\.(eot|woff|woff2|svg|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        },
      ],
    );

    return config;
  },
};
