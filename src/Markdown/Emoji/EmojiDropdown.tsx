import emojiLocale from '@emoji-mart/data/i18n/ru.json';
import EmojiPicker from '@emoji-mart/react';
import { DropdownMenu } from '@skbkontur/react-ui';
import React, { useRef } from 'react';

import { IEmojiData } from './Emoji.logic';
import { EmojiPickerWrapper } from './Emoji.styled';
import { EmojiFace } from '../../MarkdownIcons/EmojiFace';
import { MarkdownThemeConsumer } from '../../styles/theme';
import { MarkdownFormatButton } from '../MarkdownHelpers/MarkdownFormatButton';

interface IProps {
  isPreviewMode: boolean;
  onSelect: (emoji: IEmojiData) => void;
}

export const EmojiDropdown: React.FC<IProps> = ({ isPreviewMode, onSelect }) => {
  const dropdownMenuRef = useRef<DropdownMenu>(null);

  return (
    <MarkdownThemeConsumer>
      {theme => (
        <DropdownMenu
          ref={dropdownMenuRef}
          caption={
            <MarkdownFormatButton
              hintText="Добавить emoji"
              disabled={isPreviewMode}
              icon={<EmojiFace />}
              text="Добавить emoji"
            />
          }
        >
          <EmojiPickerWrapper>
            <EmojiPicker
              i18n={emojiLocale}
              theme={theme.themeMode}
              skinTonePosition="none"
              previewPosition="none"
              onEmojiSelect={handleSelectEmoji}
            />
          </EmojiPickerWrapper>
        </DropdownMenu>
      )}
    </MarkdownThemeConsumer>
  );

  function handleSelectEmoji(data: IEmojiData) {
    onSelect(data);
    dropdownMenuRef.current?.close();
  }
};
