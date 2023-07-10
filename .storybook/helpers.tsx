import { MarkdownThemeProvider } from '../src/styles/styled-components';
import { StoryContext } from '@storybook/react';
import { CSSProperties } from 'react';
import { DEFAULT_MARKDOWN_THEME } from '../src/styles/theme';
import React from 'react';

const style: CSSProperties = { padding: 4, boxSizing: 'border-box' };

export const storyBookMainDecorators = (story: Function, context?: StoryContext) => {
  const globalTheme = context?.globals?.theme;
  const theme = { ...DEFAULT_MARKDOWN_THEME, themeMode: globalTheme };

  return (
    <MarkdownThemeProvider theme={theme}>
      <div id="test-element" style={style}>
        {story()}
      </div>
    </MarkdownThemeProvider>
  );
};
