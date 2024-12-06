import axios, { AxiosResponse } from 'axios';
import { hybridStoriesProvider } from 'creevey';
import * as path from 'path';

const config = {
  resolveStorybookUrl: () =>
    axios('https://fake.testkontur.ru/ip').then((res: AxiosResponse<any>) => `http://${res.data}:6007`),
  storiesProvider: hybridStoriesProvider,
  testsDir: path.join(__dirname, 'src'),
  testsRegex: /.creevey.(t|j)s$/,
  gridUrl: 'https://grid.skbkontur.ru/common/wd/hub',
  screenDir: path.join(__dirname, 'creevey', 'images'),
  reportDir: path.join(__dirname, 'creevey', 'report'),
  browsers: {
    light: {
      browserName: 'chrome',
      platformName: 'windows',
      browserVersion: '127.0',
      'se:teamname': 'matrix',
      viewport: { width: 1440, height: 720 },
      limit: 5,
      _storybookGlobals: { theme: 'light' },
    },
    dark: {
      browserName: 'chrome',
      platformName: 'windows',
      browserVersion: '127.0',
      'se:teamname': 'matrix',
      viewport: { width: 1440, height: 720 },
      limit: 5,
      _storybookGlobals: { theme: 'dark' },
    },
  },
  maxRetries: 2,
  // See https://github.com/wKich/creevey#chrome-webdriver--1px-border-with-border-radius
  diffOptions: { threshold: 0.1 },
};

module.exports = config;
