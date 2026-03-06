import { SidePage, Textarea, ThemeContext, useResponsiveLayout } from '@skbkontur/react-ui';
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

import { MENTION_WRAPPER_ID_POSTFIX, SPLIT_VIEW_THRESHOLD } from './constants';
import { useEmojiLogic } from './Emoji/Emoji.logic';
import { useFileLogic } from './Files/Files.logic';
import {
  DroppablePlaceholder,
  FlexCenter,
  getMarkdownReactUiTheme,
  MarkdownEditorBlock,
  MarkdownPreview,
  MentionWrapper,
  SplitViewContainer,
  SplitViewEditContainer,
  SplitViewMaxWidth,
  SplitViewPreviewContainer,
  Wrapper,
} from './Markdown.styled';
import { MarkdownActions } from './MarkdownActions/MarkdownActions';
import { MarkdownEditor, MarkdownEditorProps } from './MarkdownEditor';
import { EmptyPreview } from './MarkdownHelpers/EmptyPreview';
import { usePasteFromClipboard } from './MarkdownHelpers/markdownHelpers';
import { getMentionValue, mentionActions } from './MarkdownHelpers/markdownMentionHelpers';
import {
  getCursorCoordinates,
  useFullscreenHorizontalPadding,
  useListenTextareaScroll,
} from './MarkdownHelpers/markdownTextareaHelpers';
import { MarkdownMention } from './MarkdownMention';
import { HideActionsOptions, HorizontalPaddings, MarkdownApi, Nullable, Token, ViewMode } from './types';
import { Guid } from './utils/guid';
import { RequestStatus } from './utils/requestStatus';
import { MarkdownViewer } from '../MarkdownViewer';
import { ThemeProvider } from '../styles/styled-components';
import { DEFAULT_MARKDOWN_THEME, MarkdownThemeConsumer } from '../styles/theme';

export interface MarkdownProps extends MarkdownEditorProps {
  /** Методы апи для загрузки/скачивания файлов, меншена, ИИ */
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
  /** Показывать подсказки к действиям */
  showActionHints?: boolean;

  /** Показывать сочетания клавиш для действия в хинте */
  showShortKeys?: boolean;

  /** Показывать шорткеи (убирает хинты действий и подсказки)
   * @deprecated используй {@link showActionHints} и {@link showShortKeys}
   * */
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
    showActionHints,
    showShortKeys,
    showShotKeys = true,
    hideActionsOptions,
    onChangeViewMode,
    ...textareaProps
  } = props;

  const [mention, setMention] = useState<Token>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Edit);
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [initialWidth, setInitialWidth] = useState<number>(0);
  const [selectionStart, setSelectionStart] = useState<number>();
  const [selectionEnd, setSelectionEnd] = useState<number>();

  const guid = useRef(new Guid().generate()).current;
  const textareaRef = useRef<Textarea | null>(null);
  const textareaNode = getTextareaNode();

  const isEditMode = viewMode !== ViewMode.Preview;
  const width = fullscreen || !textareaProps.width ? '100%' : textareaProps.width;

  const { isSplitViewAvailable, isMobile } = useResponsiveLayout({
    customMediaQueries: {
      isSplitViewAvailable: `(width >= ${SPLIT_VIEW_THRESHOLD})`,
    },
  });

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
  const fullscreenTextareaPadding = useFullscreenHorizontalPadding(fullscreen, viewMode, initialWidth);

  useLayoutEffect(() => {
    const textareaNode = getTextareaNode();

    if (textareaNode) setInitialWidth(textareaNode.clientWidth);
  }, []);

  useEffect(() => {
    if (fullscreen && isSplitViewAvailable) setViewMode(ViewMode.Split);
    else setViewMode(prevMode => (prevMode === ViewMode.Split ? ViewMode.Edit : prevMode));
  }, [fullscreen, isSplitViewAvailable]);

  useEffect(() => {
    if (isMobile) setFullScreen(false);
  }, [isMobile]);

  useEffect(() => {
    if (fullscreen && isEditMode && textareaRef) {
      const textareaNode = getTextareaNode();

      if (textareaNode) {
        textareaNode.focus();
        textareaNode.selectionStart = selectionStart ?? 0;
        textareaNode.selectionEnd = selectionEnd ?? 0;
      }
    }
  }, [fullscreen, isEditMode, selectionEnd, selectionStart, textareaRef]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const textareaNode = getTextareaNode();

      setSelectionStart(textareaNode?.selectionStart);
      setSelectionEnd(textareaNode?.selectionEnd);
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const horizontalPaddings: HorizontalPaddings = {
    panelPadding: panelHorizontalPadding,
    fullscreenPadding: fullscreenTextareaPadding,
  };

  const content = (
    <Foco component="div" onClickOutside={resetStates}>
      <Wrapper {...getRootProps()}>
        {!hideActionsOptions?.allActions && (
          <MarkdownActions
            showActionHints={showActionHints !== undefined ? showActionHints : showShotKeys}
            showShortKeys={showShortKeys !== undefined ? showShortKeys : showShotKeys}
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
            isSplitViewAvailable={isSplitViewAvailable}
            disableFullscreen={isMobile}
            AIApi={api?.AIApi}
            onOpenFileDialog={open}
            onChangeViewMode={handleChangeViewMode}
            onClickFullscreen={handleClickFullscreen}
            onSelectEmoji={onSelectEmoji}
          />
        )}
        {isEditMode && error && api?.getUsersApi && renderFilesValidation?.(horizontalPaddings, onResetError)}
        {fullscreen && viewMode === ViewMode.Split && !fullscreenTextareaPadding && (
          <SplitViewContainer>
            <SplitViewEditContainer>{renderEditContainer()}</SplitViewEditContainer>
            <SplitViewPreviewContainer
              textareaWidth={textareaProps.width?.toString().includes('%') ? initialWidth : textareaProps.width}
            >
              {renderPreview()}
            </SplitViewPreviewContainer>
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
          viewMode,
          theme?.reactUiTheme,
          panelHorizontalPadding,
          fullscreenTextareaPadding,
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
          <SidePage.Container>
            {viewMode === ViewMode.Split ? (
              <FlexCenter>
                <SplitViewMaxWidth>{content}</SplitViewMaxWidth>
              </FlexCenter>
            ) : (
              content
            )}
          </SidePage.Container>
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
          maxRows={fullscreen ? undefined : textareaProps.maxRows}
          width={width}
          textareaRef={textareaRef}
          onChange={listenChange}
          onSelect={listenSelect}
          onClick={listenClick}
        />
      </MarkdownEditorBlock>
    );
  }

  function renderPreview() {
    if (!props.value && viewMode === ViewMode.Split) return <EmptyPreview />;

    return (
      <MarkdownPreview {...horizontalPaddings} viewMode={viewMode} width={width}>
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
    if (textareaNode && mention && api?.getUsersApi) {
      const position = getCursorCoordinates(textareaNode, guid);

      return (
        <MarkdownMention
          value={getMentionValue(mention)}
          getUsersApi={api.getUsersApi}
          y={position.y}
          x={position.x}
          onSelectUser={handleSelectUser}
        />
      );
    }
  }

  function handleChangeViewMode(mode: ViewMode) {
    setViewMode(mode);
    onChangeViewMode?.(mode);
  }

  function handleSelectUser(login: string, name: string) {
    if (textareaNode && mention) {
      textareaNode.setSelectionRange(mention.positions[0] ? mention.positions[0] - 1 : 0, mention.positions[1]);

      document.execCommand('insertText', false, `[${name}](@${login})`);

      resetMention();
    }
  }

  function listenSelect(event: SyntheticEvent<HTMLTextAreaElement, Event>) {
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
    textareaNode?.setSelectionRange(0, 0);
  }

  function resetMention() {
    setMention(undefined);
  }

  function handleClickFullscreen() {
    setViewMode(prevState => (prevState !== ViewMode.Split && isSplitViewAvailable ? ViewMode.Split : ViewMode.Edit));
    setFullScreen(!fullscreen);
  }

  function getTextareaNode() {
    return (textareaRef?.current as any)?.node as Nullable<HTMLTextAreaElement>;
  }
};
