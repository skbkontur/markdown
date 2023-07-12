const axios = require('axios');
const { hybridStoriesProvider } = require('creevey');
const path = require('path');

const config = {
  resolveStorybookUrl: () => axios('https://fake.testkontur.ru/ip').then(res => `http://${res.data}:6006`),
  storiesProvider: hybridStoriesProvider,
  testsDir: path.join(__dirname, 'src'),
  testsRegex: /.creevey.(t|j)s$/,
  gridUrl: 'http://matrix:matrix@grid.testkontur.ru/wd/hub',
  screenDir: path.join(__dirname, 'creevey', 'images'),
  reportDir: path.join(__dirname, 'creevey', 'report'),
  browsers: {
    light: {
      browserName: 'chrome',
      viewport: { width: 1280, height: 720 },
      limit: 5,
      _storybookGlobals: { theme: 'light' },
    },
    dark: {
      browserName: 'chrome',
      viewport: { width: 1280, height: 720 },
      limit: 5,
      _storybookGlobals: { theme: 'dark' },
    },
  },
  maxRetries: 2,
  // See https://github.com/wKich/creevey#chrome-webdriver--1px-border-with-border-radius
  diffOptions: { threshold: 0.1 },
};

module.exports = config;
