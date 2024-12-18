import { StoryContext } from '@storybook/react';
import React, { CSSProperties } from 'react';
import {
  DEFAULT_MARKDOWN_DARK_THEME,
  DEFAULT_MARKDOWN_THEME,
  MarkdownTheme,
  MarkdownThemeProvider,
} from '../src/styles/theme';
import { createGlobalStyle, ThemeProvider } from '../src/styles/styled-components';
import { THEME_2022, THEME_2022_DARK } from '@skbkontur/react-ui';

const style: CSSProperties = { padding: 4, boxSizing: 'border-box' };

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Lab Grotesque", -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
  
  background: ${p => (p.theme.themeMode === 'light' ? '#fff' : '#2f2f2f')};
  }
`;

export const storyBookMainDecorators = (story: Function, context?: StoryContext) => {
  const globalTheme = context?.globals?.theme;
  const isLightTheme = globalTheme === 'light';
  const theme: MarkdownTheme = {
    ...(isLightTheme ? DEFAULT_MARKDOWN_THEME : DEFAULT_MARKDOWN_DARK_THEME),
    reactUiTheme: isLightTheme ? THEME_2022 : THEME_2022_DARK,
  };

  return (
    <MarkdownThemeProvider value={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div id="test-element" style={style}>
          {story()}
        </div>
      </ThemeProvider>
    </MarkdownThemeProvider>
  );
};
