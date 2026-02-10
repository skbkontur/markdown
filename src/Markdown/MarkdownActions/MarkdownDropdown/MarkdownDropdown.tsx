import { Dropdown, Hint } from '@skbkontur/react-ui';
import React, { FC, PropsWithChildren, ReactElement, ReactNode, useState } from 'react';

import { Wrapper } from './MarkdownDropdown.styled';

interface Props {
  caption: ReactNode;
  disabled?: boolean;
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
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Wrapper onMouseDown={e => e.preventDefault()}>
      <Hint text={hintText} pos="top left" manual={isOpened} opened={!isOpened}>
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
