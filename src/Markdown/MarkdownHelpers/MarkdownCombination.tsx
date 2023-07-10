import React, { FC, ReactNode } from 'react';

import { HintContentWrapper } from '../Markdown.styled';
import { MarkdownFormat } from '../MarkdownFormat';
import { markdownFormatToShortKey } from '../MarkdownHelpItems';
import { isMacintosh } from '../utils/isMacintosh';

interface Props {
  format: MarkdownFormat;
  text: ReactNode;
}

export const MarkdownCombination: FC<Props> = ({ format, text }) => {
  const shortKey = markdownFormatToShortKey[format];

  return (
    <HintContentWrapper>
      <span>{text}</span>
      {!!shortKey && (
        <span>
          CTRL+{isMacintosh() ? '⌥' : 'ALT'}+{markdownFormatToShortKey[format]}
        </span>
      )}
    </HintContentWrapper>
  );
};
