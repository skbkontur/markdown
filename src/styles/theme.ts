import { THEME_2022 } from '@skbkontur/react-ui';
import { createContext } from 'react';

import { ColorScheme, ThemeMode } from './types';

export interface MarkdownTheme {
  colors: ColorScheme;
  elementsFontSize: string;
  elementsLineHeight: string;
  themeMode: ThemeMode;
  droppablePlaceholderBgImage?: string;
  reactUiTheme?: typeof THEME_2022;
}

export const DEFAULT_MARKDOWN_THEME: MarkdownTheme = {
  colors: {
    text: '#222',
    brand: '#e76f57',
    grayDefault: '#858585',
    disabledButton: '#adadad',
    panelBg: '#d6d6d6',
    link: '#51adff',
    textInverse: '#fff',
    emojiPickerBackgroundRGBColor: 'rgb(255, 255, 255, 0)',
  },
  elementsFontSize: '16px',
  elementsLineHeight: '24px',
  themeMode: 'light',
};

export const DEFAULT_MARKDOWN_DARK_THEME: MarkdownTheme = {
  colors: {
    text: '#fff',
    brand: '#e76f57',
    grayDefault: '#858585',
    disabledButton: '#adadad',
    panelBg: '#d6d6d6',
    link: '#51adff',
    textInverse: '#222',
    emojiPickerBackgroundRGBColor: 'rgb(0, 0, 0, 0)',
  },
  elementsFontSize: '16px',
  elementsLineHeight: '24px',
  themeMode: 'dark',
};

export const MarkdownThemeContext = createContext<MarkdownTheme>(DEFAULT_MARKDOWN_THEME);

export const MarkdownThemeProvider = MarkdownThemeContext.Provider;

export const MarkdownThemeConsumer = MarkdownThemeContext.Consumer;
