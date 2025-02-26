import { Textarea, SidePage, ThemeContext, useResponsiveLayout } from '@skbkontur/react-ui';
import { HideBodyVerticalScroll } from '@skbkontur/react-ui/internal/HideBodyVerticalScroll';
import React, { ChangeEvent, FC, MouseEvent, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Foco from 'react-foco/lib';

import { MENTION_WRAPPER_ID_POSTFIX } from './constants';
import { useEmojiLogic } from './Emoji/Emoji.logic';
import { useFileLogic } from './Files/Files.logic';
import {
  DroppablePlaceholder,
  getMarkdownReactUiTheme,
  MarkdownEditorBlock,
  MarkdownPreview,
  MentionWrapper,
  SplitViewContainer,
  SplitViewEditContainer,
  SplitViewPreviewContainer,
  Wrapper,
} from './Markdown.styled';
import { MarkdownActions } from './MarkdownActions';
import { MarkdownEditor, MarkdownEditorProps } from './MarkdownEditor';
import { usePasteFromClipboard } from './MarkdownHelpers/markdownHelpers';
import { getMentionValue, mentionActions } from './MarkdownHelpers/markdownMentionHelpers';
import { getCursorCoordinates, useListenTextareaScroll } from './MarkdownHelpers/markdownTextareaHelpers';
import { MarkdownMention } from './MarkdownMention';
import { HorizontalPaddings, ViewMode, Token, MarkdownApi, HideActionsOptions } from './types';
import { Guid } from './utils/guid';
import { RequestStatus } from './utils/requestStatus';
import { MarkdownViewer } from '../MarkdownViewer';
import { ThemeProvider } from '../styles/styled-components';
import { DEFAULT_MARKDOWN_THEME, MarkdownThemeConsumer } from '../styles/theme';

export interface MarkdownProps extends MarkdownEditorProps {
  /** Методы апи для загрузки/скачивания файлов и меншена */
  api?: MarkdownApi;
  /** Режим прозрачной рамки у Textarea */
  borderless?: boolean;
  /** Url апи для файлов  */
  fileApiUrl?: string;
  /** Скрывать выборочно опции */
  hideActionsOptions?: HideActionsOptions;
  /** Превьювер мардауна, по умолчанию используется MarkdownViewer */
  markdownViewer?: (value: string) => ReactNode;
  /** Колбек, срабатывает на изменение режима редактирования или просмотра */
  onChangeViewMode?: (mode: ViewMode) => void;
  /** Padding markdownActions (кнопки помощи форматирования текста), включает режим panel */
  panelHorizontalPadding?: number;
  /** Url для профиля сотрудника  */
  profileUrl?: string;
  /** Render валидации файла, если она нужна, максимальный размер файла = 10mb */
  renderFilesValidation?: (horizontalPadding: HorizontalPaddings, onReset: () => void) => ReactNode;
  /** Показывать шорткеи (убирает хинты действий и подсказки) */
  showShotKeys?: boolean;
}

export const Markdown: FC<MarkdownProps> = props => {
  const {
    panelHorizontalPadding,
    onClick,
    onChange,
    onSelect,
    markdownViewer,
    renderFilesValidation,
    fileApiUrl,
    profileUrl,
    api,
    borderless,
    showShotKeys = true,
    hideActionsOptions,
    onChangeViewMode,
    ...textareaProps
  } = props;

  const textareaRef = useRef<Textarea | null>(null);
  const [mention, setMention] = useState<Token>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Edit);
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [selectionStart, setSelectionStart] = useState<number>();
  const [selectionEnd, setSelectionEnd] = useState<number>();

  const guid = useRef(new Guid().generate()).current;
  const isEditMode = viewMode !== ViewMode.Preview;
  const width = fullscreen ? `100%` : textareaProps?.width;
  const { isTablet } = useResponsiveLayout({ customMediaQueries: { isTablet: '(max-width: 720px)' } });

  const { getRootProps, isDragActive, requestStatus, open, error, onResetError } = useFileLogic(
    api?.fileUploadApi,
    api?.fileDownloadApi,
    fileApiUrl,
    textareaRef.current,
    selectionStart,
    !isEditMode,
  );

  const { onSelectEmoji } = useEmojiLogic(textareaRef.current);

  usePasteFromClipboard(textareaRef.current, api?.fileUploadApi, api?.fileDownloadApi, fileApiUrl);
  useListenTextareaScroll(resetMention, textareaRef.current);

  useEffect(() => {
    setViewMode(fullscreen && !isTablet ? ViewMode.Split : ViewMode.Edit);
  }, [fullscreen, isTablet]);

  useEffect(() => {
    if (fullscreen && isEditMode) {
      const textareaNode = (textareaRef.current as any)?.node as HTMLTextAreaElement;

      textareaNode.focus();
      textareaNode.selectionStart = selectionStart ?? 0;
      textareaNode.selectionEnd = selectionEnd ?? 0;
    }
  }, [fullscreen, isEditMode, selectionEnd, selectionStart]);

  const horizontalPaddings: HorizontalPaddings = {
    panelPadding: panelHorizontalPadding,
  };

  const content = (
    <Foco component="div" onClickOutside={resetStates}>
      <Wrapper {...getRootProps()}>
        {!hideActionsOptions?.allActions && (
          <MarkdownActions
            showShortKeys={showShotKeys}
            textAreaRef={textareaRef}
            width={width}
            viewMode={viewMode}
            loadingFile={requestStatus === RequestStatus.isFetching}
            fullscreen={fullscreen}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            horizontalPaddings={horizontalPaddings}
            hideOptions={hideActionsOptions}
            hasFilesApi={!!api?.fileDownloadApi && !!api?.fileUploadApi}
            onOpenFileDialog={open}
            onChangeViewMode={handleChangeViewMode}
            onClickFullscreen={handleClickFullscreen}
            onSelectEmoji={onSelectEmoji}
          />
        )}
        {isEditMode && error && api?.getUsersApi && renderFilesValidation?.(horizontalPaddings, onResetError)}
        {viewMode === ViewMode.Split && (
          <SplitViewContainer>
            <SplitViewEditContainer>{renderEditContainer()}</SplitViewEditContainer>
            <SplitViewPreviewContainer>{renderPreview()}</SplitViewPreviewContainer>
          </SplitViewContainer>
        )}
        {viewMode === ViewMode.Edit && renderEditContainer()}
        {viewMode === ViewMode.Preview && renderPreview()}
        {isDragActive && isEditMode && <DroppablePlaceholder {...horizontalPaddings} />}
      </Wrapper>
    </Foco>
  );

  return (
    <MarkdownThemeConsumer>
      {theme => {
        const defaultTheme = theme ?? DEFAULT_MARKDOWN_THEME;
        const reactUiTheme = getMarkdownReactUiTheme(
          defaultTheme,
          theme?.reactUiTheme,
          panelHorizontalPadding,
          borderless,
          fullscreen,
        );

        return (
          <ThemeProvider theme={defaultTheme}>
            <ThemeContext.Provider value={reactUiTheme}>
              {fullscreen ? renderFullScreen() : content}
            </ThemeContext.Provider>
          </ThemeProvider>
        );
      }}
    </MarkdownThemeConsumer>
  );

  function renderFullScreen() {
    return (
      <SidePage disableAnimations width="100vw" onClose={() => setFullScreen(false)}>
        <HideBodyVerticalScroll />
        <SidePage.Body>
          <SidePage.Container>{content}</SidePage.Container>
        </SidePage.Body>
      </SidePage>
    );
  }

  function renderEditContainer() {
    const showMention: boolean = !!mention && !!getMentionValue(mention);

    return (
      <MarkdownEditorBlock>
        <MentionWrapper id={`${guid}${MENTION_WRAPPER_ID_POSTFIX}`} />
        {showMention && renderMentions()}
        <MarkdownEditor
          {...textareaProps}
          width={width}
          textareaRef={textareaRef}
          onChange={listenChange}
          onSelect={listenSelection}
          onClick={listenClick}
        />
      </MarkdownEditorBlock>
    );
  }

  function renderPreview() {
    return (
      <MarkdownPreview {...horizontalPaddings} width={width}>
        {markdownViewer?.(props.value as string) || (
          <MarkdownViewer
            source={(props.value as string) ?? ''}
            downloadFileApi={api?.fileDownloadApi}
            fileApiUrl={fileApiUrl}
            profileUrl={profileUrl}
          />
        )}
      </MarkdownPreview>
    );
  }

  function renderMentions() {
    if (textareaRef.current && mention && api?.getUsersApi) {
      const textareaNode = (textareaRef.current as any)?.node as HTMLTextAreaElement;
      const position = getCursorCoordinates(textareaNode, guid);

      return (
        <MarkdownMention
          value={getMentionValue(mention)}
          getUsersApi={api.getUsersApi}
          y={position.y}
          x={position.x}
          onUserSelect={handleSelectUser}
        />
      );
    }
  }

  function handleChangeViewMode(mode: ViewMode) {
    setViewMode(mode);
    onChangeViewMode?.(mode);
  }

  function handleSelectUser(login: string, name: string) {
    if (textareaRef.current && mention) {
      const htmlTextArea = (textareaRef.current as any) as HTMLTextAreaElement;

      htmlTextArea.setSelectionRange(mention.positions[0] ? mention.positions[0] - 1 : 0, mention.positions[1]);

      document.execCommand('insertText', false, `[${name}](@${login})`);

      resetMention();
    }
  }

  function listenSelection(event: SyntheticEvent<HTMLTextAreaElement, Event>) {
    const { selectionStart: textSelectionStart, selectionEnd: textSelectionEnd } = event.currentTarget;

    setSelectionStart(textSelectionStart);
    setSelectionEnd(textSelectionEnd);

    onSelect && onSelect(event);

    checkMention(event);
  }

  function listenChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange && onChange(event);
    checkMention(event);
  }

  function listenClick(event: MouseEvent<HTMLTextAreaElement>) {
    onClick && onClick(event);
    checkMention(event);
  }

  function checkMention(
    event:
      | ChangeEvent<HTMLTextAreaElement>
      | MouseEvent<HTMLTextAreaElement>
      | SyntheticEvent<HTMLTextAreaElement, Event>,
  ) {
    if (api?.getUsersApi) mentionActions(event, setMention);
  }

  function resetStates() {
    resetMention();
    setSelectionStart(undefined);
    setSelectionEnd(undefined);
  }

  function resetMention() {
    setMention(undefined);
  }

  function handleClickFullscreen() {
    setFullScreen(!fullscreen);
  }
};
