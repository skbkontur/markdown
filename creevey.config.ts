import axios, { AxiosResponse } from 'axios';
import { CreeveyConfig, hybridStoriesProvider } from 'creevey';
import { PlaywrightWebdriver } from 'creevey/playwright';
import * as path from 'path';

const config: CreeveyConfig = {
  resolveStorybookUrl: () =>
    axios('https://fake.testkontur.ru/ip').then((res: AxiosResponse<any>) => `http://${res.data}:6007`),
  storiesProvider: hybridStoriesProvider,
  testsDir: path.join(__dirname, 'src'),
  testsRegex: /.creevey.(t|j)s$/,
  gridUrl: 'https://grid.skbkontur.ru/common/wd/hub',
  screenDir: path.join(__dirname, 'creevey', 'images'),
  reportDir: path.join(__dirname, 'creevey', 'report'),
  browsers: {
    dark: {
      browserName: 'chrome',
      connectionTimeout: 180000,
      playwrightOptions: { headless: false },
      seleniumCapabilities: {
        browserVersion: '127.0',
        platformName: 'windows',
        'se:teamname': 'matrix',
      },
      storybookGlobals: { theme: 'dark' },
      viewport: { height: 720, width: 1440 },
    },
    light: {
      browserName: 'chrome',
      connectionTimeout: 180000,
      playwrightOptions: { headless: false },
      seleniumCapabilities: {
        browserVersion: '127.0',
        platformName: 'windows',
        'se:teamname': 'matrix',
      },
      storybookGlobals: { theme: 'light' },
      viewport: { height: 720, width: 1440 },
    },
  },
  maxRetries: 2,
  // See https://github.com/wKich/creevey#chrome-webdriver--1px-border-with-border-radius
  diffOptions: { threshold: 0.1 },
  webdriver: PlaywrightWebdriver,
};

module.exports = config;
