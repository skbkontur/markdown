import { Dropdown } from '@skbkontur/react-ui';
import { PopupPositionsType, ShortPopupPositionsType } from '@skbkontur/react-ui/cjs/internal/Popup';
import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import { Wrapper } from './MarkdownDropdown.styled';
import { MarkdownFormatButton } from '../../MarkdownHelpers/MarkdownFormatButton';

interface Props {
  caption: ReactNode;
  showActionHint: boolean;
  disabled?: boolean;
  hintPos?: ShortPopupPositionsType | PopupPositionsType;
  hintText?: string;
  icon?: ReactElement;
  menuWidth?: number;
  onOpen?: () => void;
}

export const MarkdownDropdown: FC<PropsWithChildren<Props>> = ({
  icon,
  disabled,
  children,
  caption,
  onOpen,
  menuWidth,
  hintText,
  showActionHint,
  hintPos,
}) => {
  return (
    <Wrapper onMouseDown={e => e.preventDefault()}>
      <Dropdown
        disablePortal
        disabled={disabled}
        caption={caption}
        menuWidth={menuWidth ?? 300}
        _renderButton={({ onClick }) => (
          <MarkdownFormatButton
            showText
            hintPos={hintPos}
            showActionHint={showActionHint}
            disabled={disabled}
            hintText={hintText}
            icon={icon}
            text={caption}
            onClick={() => onClick()}
          />
        )}
        onOpen={onOpen}
      >
        {children}
      </Dropdown>
    </Wrapper>
  );
};
