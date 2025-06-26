import { Dropdown, Hint, Textarea } from '@skbkontur/react-ui';
import React, { FC, RefObject, SyntheticEvent } from 'react';

import { COMMONMARK_HELP_URL } from './constants';
import { EmojiData } from './Emoji/Emoji.logic';
import { EmojiDropdown } from './Emoji/EmojiDropdown';
import {
  ActionsLeftWrapper,
  ActionsRightWrapper,
  ButtonsWrapper,
  MarkdownActionsWrapper,
  MarkdownDropdown,
  MarkdownMenuItem,
} from './Markdown.styled';
import { MarkdownFormat } from './MarkdownFormat';
import { MarkdownFormatButton } from './MarkdownHelpers/MarkdownFormatButton';
import { setMarkdown } from './MarkdownHelpers/markdownHelpers';
import { markdownHelpHeaders, markdownHelpLists, markdownHelpOther, markdownHelpText } from './MarkdownHelpItems';
import { HideActionsOptions, HorizontalPaddings, Nullable, ViewMode } from './types';
import { MarkdownCombination } from '../MarkdownCombination/MarkdownCombination';
import { AttachPaperclip } from '../MarkdownIcons/AttachPaperclip';
import { Collapse } from '../MarkdownIcons/Collapse';
import { DocIcon } from '../MarkdownIcons/DocIcon';
import { Expand } from '../MarkdownIcons/Expand';
import { EyeOpen } from '../MarkdownIcons/EyeOpen';
import { SplitView } from '../MarkdownIcons/SplitView';
import { ToolPencil } from '../MarkdownIcons/ToolPencil';

interface Props {
  horizontalPaddings: HorizontalPaddings;
  onChangeViewMode: (viewMode: ViewMode) => void;
  onClickFullscreen: () => void;
  onOpenFileDialog: () => void;
  onSelectEmoji: (emoji: EmojiData) => void;
  showActionHints: boolean;
  showShortKeys: boolean;
  textAreaRef: RefObject<Textarea>;
  viewMode: ViewMode;
  disableFullscreen?: boolean;
  fullscreen?: boolean;
  hasFilesApi?: boolean;
  hideOptions?: HideActionsOptions;
  isSplitViewAvailable?: boolean;
  loadingFile?: boolean;
  selectionEnd?: Nullable<number>;
  selectionStart?: Nullable<number>;
  width?: Nullable<number | string>;
}

export const MarkdownActions: FC<Props> = ({
  textAreaRef,
  selectionStart,
  selectionEnd,
  loadingFile,
  onOpenFileDialog,
  onClickFullscreen,
  fullscreen,
  viewMode,
  onChangeViewMode,
  horizontalPaddings,
  hasFilesApi,
  width,
  showActionHints,
  showShortKeys,
  hideOptions,
  onSelectEmoji,
  isSplitViewAvailable,
  disableFullscreen,
}) => {
  const isPreviewMode = viewMode === ViewMode.Preview;

  return (
    <MarkdownActionsWrapper {...horizontalPaddings} width={width} fullscreen={fullscreen}>
      <ButtonsWrapper fullscreen={fullscreen}>
        <ActionsLeftWrapper>
          {!hideOptions?.heading && (
            <MarkdownDropdown>
              <Hint text="Заголовок" pos="top left">
                <Dropdown disablePortal disabled={isPreviewMode} menuWidth={300} caption="H">
                  {markdownHelpHeaders.map((helper, idx) => (
                    <MarkdownMenuItem
                      key={idx}
                      onClick={(event: SyntheticEvent) => handleMarkdownItemClick(event, helper.format)}
                    >
                      <MarkdownCombination showShortKey={showShortKeys} format={helper.format} text={helper.node} />
                    </MarkdownMenuItem>
                  ))}
                </Dropdown>
              </Hint>
            </MarkdownDropdown>
          )}
          {markdownHelpText.map((helper, idx) => {
            if (isHiddenOptions(helper.format)) return null;

            return (
              <MarkdownFormatButton
                key={idx}
                showActionHint={showActionHints}
                showShortKey={showShortKeys}
                disabled={isPreviewMode}
                format={helper.format}
                hintText={helper.node}
                icon={helper.icon}
                text={helper.text}
                onClick={event => handleMarkdownItemClick(event, helper.format)}
              />
            );
          })}
          {markdownHelpLists.map((helper, idx) => {
            if (isHiddenOptions(helper.format)) return null;

            return (
              <MarkdownFormatButton
                key={idx}
                showActionHint={showActionHints}
                showShortKey={showShortKeys}
                disabled={isPreviewMode}
                format={helper.format}
                hintText={helper.node}
                icon={helper.icon}
                text={helper.text}
                onClick={event => handleMarkdownItemClick(event, helper.format)}
              />
            );
          })}
          {markdownHelpOther.map((helper, idx) => {
            if (isHiddenOptions(helper.format)) return null;

            return (
              <MarkdownFormatButton
                key={idx}
                showActionHint={showActionHints}
                showShortKey={showShortKeys}
                disabled={isPreviewMode}
                format={helper.format}
                hintText={helper.node}
                icon={helper.icon}
                text={helper.text}
                onClick={event => handleMarkdownItemClick(event, helper.format)}
              />
            );
          })}
          {hasFilesApi && !hideOptions?.file && (
            <MarkdownFormatButton
              hintText="Прикрепить файл"
              showActionHint={showActionHints}
              showShortKey={showShortKeys}
              disabled={isPreviewMode}
              isLoading={loadingFile}
              icon={<AttachPaperclip />}
              text="Прикрепить файл"
              onClick={onOpenFileDialog}
            />
          )}
          {!hideOptions?.emoji && (
            <EmojiDropdown showShortKey={showShortKeys} isPreviewMode={isPreviewMode} onSelect={onSelectEmoji} />
          )}
          {!hideOptions?.help && (
            <MarkdownFormatButton
              hintText="Документация Markdown"
              icon={<DocIcon />}
              text="Документация Markdown"
              href={COMMONMARK_HELP_URL}
            />
          )}
        </ActionsLeftWrapper>
        <ActionsRightWrapper>
          {!hideOptions?.viewMode && renderViewModeButton()}
          {!hideOptions?.screenMode && !disableFullscreen && (
            <MarkdownFormatButton
              hintText={fullscreen ? 'Свернуть' : 'Развернуть'}
              icon={fullscreen ? <Collapse /> : <Expand />}
              text={fullscreen ? 'Свернуть' : '  Развернуть'}
              onClick={onClickFullscreen}
            />
          )}
        </ActionsRightWrapper>
      </ButtonsWrapper>
    </MarkdownActionsWrapper>
  );

  function renderViewModeButton() {
    return (
      <div>
        {viewMode !== ViewMode.Split && fullscreen && isSplitViewAvailable && (
          <MarkdownFormatButton
            icon={<SplitView />}
            hintText="Сплит"
            text="Сплит"
            showActionHint={showActionHints}
            showShortKey={showShortKeys}
            onClick={() => onChangeViewMode(ViewMode.Split)}
          />
        )}
        {viewMode !== ViewMode.Edit && (
          <MarkdownFormatButton
            icon={<ToolPencil />}
            hintText="Редактор"
            text="Редактор"
            showActionHint={showActionHints}
            showShortKey={showShortKeys}
            onClick={() => onChangeViewMode(ViewMode.Edit)}
          />
        )}
        {viewMode !== ViewMode.Preview && (
          <MarkdownFormatButton
            icon={<EyeOpen />}
            hintText="Превью"
            text="Превью"
            showActionHint={showActionHints}
            showShortKey={showShortKeys}
            onClick={() => onChangeViewMode(ViewMode.Preview)}
          />
        )}
      </div>
    );
  }

  function handleMarkdownItemClick(event: SyntheticEvent, format: MarkdownFormat) {
    if (!isNaN(Number(selectionStart)) && !isNaN(Number(selectionEnd))) {
      event.stopPropagation();
      event.preventDefault();

      if (textAreaRef?.current) {
        textAreaRef.current.focus();

        const htmlTextArea = (textAreaRef.current as any).node as HTMLTextAreaElement;

        htmlTextArea.selectionStart = Number(selectionStart);
        htmlTextArea.selectionEnd = Number(selectionEnd);

        setMarkdown(htmlTextArea, (htmlTextArea.value as string) ?? '', format, Number(selectionStart), selectionEnd);
      }
    }
  }

  function isHiddenOptions(format: MarkdownFormat) {
    return hideOptions?.[format];
  }
};
