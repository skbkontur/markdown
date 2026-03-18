import { Dropdown, Hint } from '@skbkontur/react-ui';
import { PopupPositionsType, ShortPopupPositionsType } from '@skbkontur/react-ui/cjs/internal/Popup';
import React, { FC, PropsWithChildren, ReactElement, ReactNode, useState } from 'react';

import { Wrapper } from './MarkdownDropdown.styled';

interface Props {
  caption: ReactNode;
  showActionHint: boolean;
  disabled?: boolean;
  hintText?: string;
  icon?: ReactElement;
  menuWidth?: number;
  onOpen?: () => void;
  pos?: ShortPopupPositionsType | PopupPositionsType;
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
  pos,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Wrapper onMouseDown={e => e.preventDefault()}>
      <Hint text={showActionHint && hintText} pos={pos} manual={isOpened} opened={!isOpened}>
        <Dropdown
          disablePortal
          disabled={disabled}
          menuWidth={menuWidth ?? 300}
          caption={caption}
          icon={icon}
          onOpen={handleOpen}
          onClose={() => setIsOpened(false)}
        >
          {children}
        </Dropdown>
      </Hint>
    </Wrapper>
  );

  function handleOpen() {
    onOpen?.();
    setIsOpened(true);
  }
};
