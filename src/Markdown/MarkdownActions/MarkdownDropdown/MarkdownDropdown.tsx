import { Dropdown, Hint } from '@skbkontur/react-ui';
import React, { FC, PropsWithChildren, useState } from 'react';

import { Wrapper } from './MarkdownDropdown.styled';

interface Props {
  caption: string;
  hintText?: string;
  isPreviewMode?: boolean;
  menuWidth?: number;
  onOpen?: () => void;
}

export const MarkdownDropdown: FC<PropsWithChildren<Props>> = ({
  isPreviewMode,
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
          disabled={isPreviewMode}
          menuWidth={menuWidth ?? 300}
          caption={caption}
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
