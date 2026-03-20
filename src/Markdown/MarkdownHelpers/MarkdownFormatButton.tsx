import { Hint } from '@skbkontur/react-ui';
import { PopupPositionsType, ShortPopupPositionsType } from '@skbkontur/react-ui/cjs/internal/Popup';
import React, { FC, ReactNode, SyntheticEvent } from 'react';

import { MarkdownCombination } from '../../MarkdownCombination/MarkdownCombination';
import {
  MarkdownButtonContentWrapper,
  MarkdownButtonIcon,
  MarkdownButtonWrapper,
  VisuallyHidden,
} from '../Markdown.styled';
import { MarkdownFormat } from '../MarkdownFormat';
import { MarkdownTids } from '../MarkdownTids';

interface Props {
  hintText: ReactNode;
  icon: ReactNode;
  text: ReactNode;
  dataTid?: MarkdownTids;
  disabled?: boolean;
  format?: MarkdownFormat;
  hintPos?: ShortPopupPositionsType | PopupPositionsType;
  href?: string;
  isLoading?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  showActionHint?: boolean;
  showHintWhenDisabled?: boolean;
  showShortKey?: boolean;
  showText?: boolean;
}

export const MarkdownFormatButton: FC<Props> = ({
  dataTid,
  icon,
  hintText,
  onClick,
  format,
  disabled,
  text,
  href,
  showActionHint,
  showHintWhenDisabled,
  showShortKey,
  showText,
  hintPos,
}) => {
  const button = (
    <MarkdownButtonWrapper borderless disabled={disabled} data-tid={dataTid} onClick={onClick}>
      <MarkdownButtonContentWrapper onMouseDown={e => e.preventDefault()}>
        {!!icon && <MarkdownButtonIcon>{icon}</MarkdownButtonIcon>}
        {showText ? text : <VisuallyHidden>{text}</VisuallyHidden>}
      </MarkdownButtonContentWrapper>
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

  const actualHintText = showActionHint && hintText;

  const hintComponent = format ? (
    <MarkdownCombination format={format} text={actualHintText} showShortKey={showShortKey} />
  ) : (
    actualHintText
  );

  return (
    <Hint manual={!showHintWhenDisabled && disabled} text={hintComponent} pos={hintPos ?? 'top center'} maxWidth={360}>
      {content}
    </Hint>
  );
};
