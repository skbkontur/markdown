import { Textarea, SidePage, ThemeContext } from '@skbkontur/react-ui';
import { HideBodyVerticalScroll } from '@skbkontur/react-ui/internal/HideBodyVerticalScroll';
import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Foco from 'react-foco/lib';

import { MarkdownViewer } from '../MarkdownViewer';
import { MarkdownThemeProvider, MarkdownThemeConsumer } from '../styles/styled-components';
import { DEFAULT_MARKDOWN_THEME } from '../styles/theme';
import { MENTION_WRAPPER_ID_POSTFIX } from './constants';
import { useFileLogic } from './Files/Files.logic';
import {
  DroppablePlaceholder,
  getMarkdownReactUiTheme,
  MarkdownEditorBlock,
  MarkdownPreview,
  MentionWrapper,
  Wrapper,
} from './Markdown.styled';
import { MarkdownActions } from './MarkdownActions';
import { MarkdownEditor, MarkdownEditorProps } from './MarkdownEditor';
import { usePasteFromClipboard } from './MarkdownHelpers/markdownHelpers';
import { getMentionValue, mentionActions } from './MarkdownHelpers/markdownMentionHelpers';
import {
  getCursorCoordinates,
  getFullscreenHorizontalPadding,
  useListenTextareaScroll,
} from './MarkdownHelpers/markdownTextareaHelpers';
import { MarkdownMention } from './MarkdownMention';
import { HorizontalPaddings, ViewMode, Token, MarkdownApi } from './types';
import { Guid } from './utils/guid';
import { RequestStatus } from './utils/requestStatus';

export interface MarkdownProps extends MarkdownEditorProps {
  /** Методы апи для загрузки/скачивания файлов и меншена */
  api?: MarkdownApi;
  /** Url апи для файлов  */
  fileApiUrl?: string;
  /** Url для профиля сотрудника  */
  profileUrl?: string;
  /** Скрыть панель действий (кнопки помощи форматирования текста) */
  hideMarkdownActions?: boolean;
  /** Превьювер мардауна, по умолчанию используется MarkdownViewer */
  markdownViewer?: (value: string) => ReactNode;
  /** Padding markdownActions (кнопки помощи форматирования текста), включает режим panel */
  panelHorizontalPadding?: number;
  /** Render валидации файла, если она нужна, максимальный размер файла = 10mb */
  renderFilesValidation?: (horizontalPadding: HorizontalPaddings, onReset: () => void) => ReactNode;
}

export const Markdown: FC<MarkdownProps> = (props) => {
  const {
    panelHorizontalPadding,
    hideMarkdownActions,
    onClick,
    onChange,
    onSelect,
    markdownViewer,
    renderFilesValidation,
    fileApiUrl = '',
    profileUrl = '',
    api,
    ...textareaProps
  } = props;

  const textareaRef = useRef<Textarea | null>(null);
  const [mention, setMention] = useState<Token>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Edit);
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [initialWidth, setInitialWidth] = useState<number>(0);
  const [selectionStart, setSelectionStart] = useState<number>();
  const [selectionEnd, setSelectionEnd] = useState<number>();

  const guid = useRef(new Guid().generate()).current;
  const isEditMode = viewMode === ViewMode.Edit;

  const { getRootProps, isDragActive, requestStatus, open, error, onResetError } = useFileLogic(
    api?.fileUploadApi,
    api?.fileDownloadApi,
    fileApiUrl,
    textareaRef.current,
    selectionStart,
    !isEditMode
  );

  usePasteFromClipboard(textareaRef.current, api?.fileUploadApi, api?.fileDownloadApi, fileApiUrl);
  useListenTextareaScroll(resetMention, textareaRef.current);

  useLayoutEffect(() => {
    const textareaNode = (textareaRef.current as any)?.node as HTMLTextAreaElement;
    setInitialWidth(textareaNode.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    if (fullscreen && isEditMode) {
      const textareaNode = (textareaRef.current as any)?.node as HTMLTextAreaElement;

      textareaNode.focus();
      textareaNode.selectionStart = selectionStart ?? 0;
      textareaNode.selectionEnd = selectionEnd ?? 0;
    }
  }, [fullscreen, isEditMode]);

  const fullscreenTextareaPadding = getFullscreenHorizontalPadding(fullscreen, initialWidth);

  const horizontalPaddings: HorizontalPaddings = {
    panelPadding: panelHorizontalPadding,
    fullscreenPadding: fullscreenTextareaPadding,
  };

  const content = (
    <Foco component="div" onClickOutside={resetStates}>
      <Wrapper {...getRootProps()}>
        {!hideMarkdownActions && (
          <MarkdownActions
            textAreaRef={textareaRef}
            viewMode={viewMode}
            loadingFile={requestStatus === RequestStatus.isFetching}
            fullscreen={fullscreen}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            horizontalPaddings={horizontalPaddings}
            hasFilesApi={!!api?.fileDownloadApi && !!api?.fileUploadApi}
            onOpenFileDialog={open}
            onChangeViewMode={setViewMode}
            onClickFullscreen={handleClickFullscreen}
          />
        )}
        {isEditMode && error && api?.getUsersApi && renderFilesValidation?.(horizontalPaddings, onResetError)}
        {isEditMode && renderEditContainer()}
        {isDragActive && isEditMode && <DroppablePlaceholder {...horizontalPaddings} />}
      </Wrapper>
      {!isEditMode && (
        <MarkdownPreview {...horizontalPaddings}>
          {markdownViewer?.(props.value as string) || (
            <MarkdownViewer source={(props.value as string) ?? ''} fileApiUrl={fileApiUrl} profileUrl={profileUrl} />
          )}
        </MarkdownPreview>
      )}
    </Foco>
  );

  return (
    <MarkdownThemeConsumer>
      {(theme) => {
        const defaultTheme = theme ?? DEFAULT_MARKDOWN_THEME;
        const reactUiTheme = getMarkdownReactUiTheme(
          defaultTheme,
          theme?.reactUiTheme,
          panelHorizontalPadding,
          fullscreenTextareaPadding
        );

        return (
          <MarkdownThemeProvider theme={defaultTheme}>
            <ThemeContext.Provider value={reactUiTheme}>
              {fullscreen ? renderFullScreen() : content}
            </ThemeContext.Provider>
          </MarkdownThemeProvider>
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
          width={fullscreen ? `100%` : textareaProps?.width}
          textareaRef={textareaRef}
          onChange={listenChange}
          onSelect={listenSelection}
          onClick={listenClick}
        />
      </MarkdownEditorBlock>
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

  function handleSelectUser(login: string, name: string) {
    if (textareaRef.current && mention) {
      const htmlTextArea = textareaRef.current as any as HTMLTextAreaElement;

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
      | SyntheticEvent<HTMLTextAreaElement, Event>
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
