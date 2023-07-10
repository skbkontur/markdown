import { Hint } from '@skbkontur/react-ui';
import React, { FC } from 'react';

import { MarkdownButtonProps } from './MarkdownButton';
import { MarkdownCombination } from './MarkdownCombination';
import { MarkdownButtonIcon, MarkdownButtonWrapper, VisuallyHidden } from '../Markdown.styled';
import { MarkdownFormat } from '../MarkdownFormat';

interface Props extends MarkdownButtonProps {
  format?: MarkdownFormat;
}

export const MarkdownFormatButton: FC<Props> = ({ icon, hintText, onClick, format, disabled, text }) => {
  return (
    <Hint
      manual={disabled}
      text={format ? <MarkdownCombination format={format} text={hintText} /> : hintText}
      pos="top center"
      maxWidth={300}
    >
      <MarkdownButtonWrapper borderless disabled={disabled} onClick={onClick}>
        <MarkdownButtonIcon>{icon}</MarkdownButtonIcon>
        <VisuallyHidden>{text}</VisuallyHidden>
      </MarkdownButtonWrapper>
    </Hint>
  );
};
