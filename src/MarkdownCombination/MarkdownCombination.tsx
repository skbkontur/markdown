import React, { FC, ReactNode } from 'react';

import { HintContentWrapper } from './MarkdownCombination.styled';
import { MarkdownFormat } from '../Markdown/MarkdownFormat';
import { markdownFormatToShortKeyLong, markdownFormatToShortKeyShort } from '../Markdown/MarkdownHelpItems';
import { isMacintosh } from '../Markdown/utils/isMacintosh';
import { ThemeProvider } from '../styles/styled-components';
import { DEFAULT_MARKDOWN_THEME, MarkdownThemeConsumer } from '../styles/theme';

interface Props {
  format: MarkdownFormat;
  text: ReactNode;
  showShortKey?: boolean;
}

export const MarkdownCombination: FC<Props> = ({ format, text, showShortKey }) => {
  const shortKeyLong = markdownFormatToShortKeyLong[format];
  const shortKeyShort = markdownFormatToShortKeyShort[format];
  const shortKey = shortKeyLong || shortKeyShort;

  return (
    <MarkdownThemeConsumer>
      {theme => (
        <ThemeProvider theme={theme ?? DEFAULT_MARKDOWN_THEME}>
          <HintContentWrapper>
            {text && <span>{text}</span>}
            {showShortKey && !!shortKey && renderHint()}
          </HintContentWrapper>
        </ThemeProvider>
      )}
    </MarkdownThemeConsumer>
  );

  function renderHint() {
    const ctrlKey = isMacintosh() ? '⌘' : 'CTRL';
    const extraKey = shortKeyLong ? '+SHIFT' : '';

    return (
      <span>
        {ctrlKey}
        {extraKey}+{shortKey}
      </span>
    );
  }
};
