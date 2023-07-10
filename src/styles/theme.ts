import { THEME_2022 } from '@skbkontur/react-ui';

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
    white: '#fff',
    brand: '#e76f57',
    grayDefault: '#858585',
    disabledButton: '#adadad',
    panelBg: '#d6d6d6',
    link: '#51adff',
  },
  elementsFontSize: '16px',
  elementsLineHeight: '24px',
  themeMode: 'light',
};
