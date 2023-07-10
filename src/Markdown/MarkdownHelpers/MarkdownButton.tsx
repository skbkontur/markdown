import { Hint } from '@skbkontur/react-ui';
import React, { FC, ReactNode, SyntheticEvent } from 'react';

import { MarkdownButtonWrapper, VisuallyHidden } from '../Markdown.styled';

export interface MarkdownButtonProps {
  hintText: ReactNode;
  icon: ReactNode;
  onClick: (event: SyntheticEvent) => void;
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const MarkdownButton: FC<MarkdownButtonProps> = ({ icon, hintText, onClick, isLoading, disabled, text }) => (
  <Hint pos="top center" manual={disabled} text={hintText} maxWidth={300}>
    <MarkdownButtonWrapper borderless loading={isLoading} disabled={disabled} onClick={onClick}>
      {icon}
      <VisuallyHidden>{text}</VisuallyHidden>
    </MarkdownButtonWrapper>
  </Hint>
);
