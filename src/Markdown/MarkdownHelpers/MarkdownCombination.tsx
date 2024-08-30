import React, { FC, ReactNode } from 'react';

import { HintContentWrapper } from '../Markdown.styled';
import { MarkdownFormat } from '../MarkdownFormat';
import { markdownFormatToShortKeyLong, markdownFormatToShortKeyShort } from '../MarkdownHelpItems';
import { isMacintosh } from '../utils/isMacintosh';

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
    <HintContentWrapper>
      <span>{text}</span>
      {showShortKey && !!shortKey && renderHint()}
    </HintContentWrapper>
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
