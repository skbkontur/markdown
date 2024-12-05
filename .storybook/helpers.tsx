import { StoryContext } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { DEFAULT_MARKDOWN_THEME } from '../src/styles/theme';
import { createGlobalStyle, ThemeProvider } from '../src/styles/styled-components';

const style: CSSProperties = { padding: 4, boxSizing: 'border-box' };

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Lab Grotesque", -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
  }
`;

export const storyBookMainDecorators = (story: Function, context?: StoryContext) => {
  const globalTheme = context?.globals?.theme;
  const theme = { ...DEFAULT_MARKDOWN_THEME, themeMode: globalTheme };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div id="test-element" style={style}>
        {story()}
      </div>
    </ThemeProvider>
  );
};
