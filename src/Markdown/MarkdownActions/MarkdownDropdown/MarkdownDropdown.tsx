import { Dropdown } from '@skbkontur/react-ui';
import { PopupPositionsType, ShortPopupPositionsType } from '@skbkontur/react-ui/cjs/internal/Popup';
import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import { Wrapper } from './MarkdownDropdown.styled';
import { MarkdownFormatButton } from '../../MarkdownHelpers/MarkdownFormatButton';
import { MarkdownTids } from '../../MarkdownTids';

interface Props {
  caption: ReactNode;
  showActionHint: boolean;
  dataTid?: MarkdownTids;
  disabled?: boolean;
  hintPos?: ShortPopupPositionsType | PopupPositionsType;
  hintText?: string;
  icon?: ReactElement;
  menuWidth?: number;
  onOpen?: () => void;
  showHintWhenDisabled?: boolean;
}

export const MarkdownDropdown: FC<PropsWithChildren<Props>> = ({
  dataTid,
  icon,
  disabled,
  children,
  caption,
  onOpen,
  menuWidth,
  hintText,
  showActionHint,
  showHintWhenDisabled,
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
            dataTid={dataTid}
            hintPos={hintPos}
            showActionHint={showActionHint}
            showHintWhenDisabled={showHintWhenDisabled}
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
