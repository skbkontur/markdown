import { Button, Checkbox } from '@skbkontur/react-ui';
import React, { FC, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { OrderedListProps, UnorderedListProps } from 'react-markdown/lib/ast-to-react';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
import gfm from 'remark-gfm';

import { MarkdownImage } from './Helpers/MarkdownImage';
import { MarkdownLink } from './Helpers/MarkdownLink';
import {
  BlockQuote,
  FileButtonWrapper,
  getListStyle,
  ListItem,
  Paragraph,
  VisuallyHidden,
  Wrapper,
} from './MarkdownViewer.styles';
import { CustomComponentsProps, MarkdownInputProps, MarkdownLinkProps, MarkdownLiProps } from './types';
import { useFileLogic } from '../Markdown/Files/Files.logic';
import { AttachPaperclip } from '../MarkdownIcons/AttachPaperclip';
import { ThemeProvider } from '../styles/styled-components';
import { DEFAULT_MARKDOWN_THEME, MarkdownThemeConsumer } from '../styles/theme';

export interface MarkdownViewerProps {
  /** Метод апи для скачивания файлов */
  downloadFileApi?: (id: string) => Promise<File>;
  /** Url апи для файлов  */
  fileApiUrl?: string;
  /** Url для профиля сотрудника  */
  profileUrl?: string;
  /** MD-текст  */
  source?: string;
}

export const MarkdownViewer: FC<MarkdownViewerProps> = ({
  source,
  fileApiUrl = '',
  profileUrl = '',
  downloadFileApi,
}) => {
  const { downloadFile } = useFileLogic(undefined, downloadFileApi);

  if (!source) {
    return null;
  }

  return (
    <MarkdownThemeConsumer>
      {theme => (
        <ThemeProvider theme={theme ?? DEFAULT_MARKDOWN_THEME}>
          <Wrapper aria-label="Форматированный текст">
            <ReactMarkdown
              components={getCustomComponents()}
              remarkPlugins={[gfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              linkTarget="_blank"
            >
              {source}
            </ReactMarkdown>
          </Wrapper>
        </ThemeProvider>
      )}
    </MarkdownThemeConsumer>
  );

  function getCustomComponents(): CustomComponentsProps {
    return {
      a: renderLink,
      li: renderListItem,
      input: renderInput,
      ul: renderList,
      ol: renderOrderedList,
      blockquote: props => <BlockQuote>{props.children}</BlockQuote>,
      p: props => <Paragraph>{props.children}</Paragraph>,
      img: props => <MarkdownImage src={props.src ?? ''} />,
    };
  }

  function renderListItem(props: MarkdownLiProps) {
    const children = props.children;

    if (props.ordered) return <li>{children}</li>;

    return checkIfChecklistItem(props) ? getCheckListItem(children) : <li>{children}</li>;
  }

  function renderLink(props: MarkdownLinkProps) {
    const { href = '', children } = props;

    if (fileApiUrl && href.startsWith(fileApiUrl)) {
      const id = href.replace(fileApiUrl, '');

      return (
        <FileButtonWrapper>
          <Button use="link" icon={<AttachPaperclip />} onClick={() => downloadFile(id)}>
            {children}
            <VisuallyHidden>Загрузить файл ${children}</VisuallyHidden>
          </Button>
        </FileButtonWrapper>
      );
    }

    return href.startsWith('@') ? (
      <MarkdownLink href={profileUrl + href.replace('@', '/')}>{children}</MarkdownLink>
    ) : (
      <MarkdownLink href={href}>{children}</MarkdownLink>
    );
  }

  function checkIfChecklistItem(props: MarkdownLiProps) {
    return props.checked !== null || props.className === 'task-list-item';
  }

  function getCheckListItem(children: ReactNode) {
    return <ListItem>{children}</ListItem>;
  }

  function renderInput(props: MarkdownInputProps) {
    return <Checkbox checked={props.checked}>{props.children}</Checkbox>;
  }

  function renderList(props: UnorderedListProps) {
    return <ul style={getListStyle(!!props.depth)}>{props.children}</ul>;
  }

  function renderOrderedList(props: OrderedListProps) {
    return <ol style={getListStyle(!!props?.depth)}>{props.children}</ol>;
  }
};
