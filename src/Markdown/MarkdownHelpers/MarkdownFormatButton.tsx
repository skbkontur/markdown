import { Hint } from '@skbkontur/react-ui';
import React, { FC } from 'react';

import { MarkdownCombination } from './MarkdownCombination';
import { MarkdownButtonProps } from './types';
import { MarkdownButtonIcon, MarkdownButtonWrapper, VisuallyHidden } from '../Markdown.styled';
import { MarkdownFormat } from '../MarkdownFormat';

interface Props extends MarkdownButtonProps {
  format?: MarkdownFormat;
  href?: string;
}

export const MarkdownFormatButton: FC<Props> = ({ icon, hintText, onClick, format, disabled, text, href }) => {
  const button = (
    <MarkdownButtonWrapper borderless disabled={disabled} onClick={onClick}>
      <MarkdownButtonIcon>{icon}</MarkdownButtonIcon>
      <VisuallyHidden>{text}</VisuallyHidden>
    </MarkdownButtonWrapper>
  );

  return (
    <Hint
      manual={disabled}
      text={format ? <MarkdownCombination format={format} text={hintText} /> : hintText}
      pos="top center"
      maxWidth={360}
    >
      {href ? (
        <a href={href} tabIndex={-1} target="_blank" rel="noopener noreferrer nofollow">
          {button}
        </a>
      ) : (
        button
      )}
    </Hint>
  );
};
