import { Hint } from '@skbkontur/react-ui';
import React, { FC } from 'react';

import { MarkdownButtonProps } from './types';
import { MarkdownCombination } from '../../MarkdownCombination/MarkdownCombination';
import { MarkdownButtonIcon, MarkdownButtonWrapper, VisuallyHidden } from '../Markdown.styled';
import { MarkdownFormat } from '../MarkdownFormat';

interface Props extends MarkdownButtonProps {
  format?: MarkdownFormat;
  href?: string;
}

export const MarkdownFormatButton: FC<Props> = ({
  icon,
  hintText,
  onClick,
  format,
  disabled,
  text,
  href,
  showActionHint,
  showShortKey,
}) => {
  const button = (
    <MarkdownButtonWrapper borderless disabled={disabled} onClick={onClick}>
      <MarkdownButtonIcon>{icon}</MarkdownButtonIcon>
      <VisuallyHidden>{text}</VisuallyHidden>
    </MarkdownButtonWrapper>
  );
  const content = href ? (
    <a href={href} tabIndex={-1} target="_blank" rel="noopener noreferrer nofollow">
      {button}
    </a>
  ) : (
    button
  );

  if (!showActionHint && !showShortKey) return content;

  return (
    <Hint
      manual={disabled}
      text={
        format ? (
          <MarkdownCombination format={format} text={showActionHint && hintText} showShortKey={showShortKey} />
        ) : (
          showActionHint && hintText
        )
      }
      pos="top center"
      maxWidth={360}
    >
      {content}
    </Hint>
  );
};
