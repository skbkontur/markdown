import { Textarea } from '@skbkontur/react-ui';
import { KeyboardEvent as ReactKeyboardEvent, RefObject, useEffect } from 'react';

import { getPastedHtml } from './markdownTextareaHelpers';
import { useFileLogic } from '../Files/Files.logic';
import { MarkdownFormat } from '../MarkdownFormat';
import {
  checkSpaceSymbol,
  eventKeyCodeToMarkdownFormat,
  markdownHelpFiles,
  markdownHelpItems,
} from '../MarkdownHelpItems';
import { Nullable, RefItem } from '../types';

const { italic, bold, crossed, codeBlock, ref, file, image } = MarkdownFormat;

const betweenTextFormats: MarkdownFormat[] = [italic, bold, crossed, codeBlock, file, image];

const specialFormats: MarkdownFormat[] = [ref];

export function setMarkdown(
  textareaNode: HTMLTextAreaElement,
  text: string,
  format: MarkdownFormat,
  selectionStart: number,
  selectionEnd?: number | null,
) {
  const markdownHelpItem = markdownHelpItems.find(item => item.format === format);

  if (markdownHelpItem) {
    const prevCommentPart = text.substring(selectionStart, selectionEnd ?? undefined);
    const { value, spaces } = checkSpaceSymbol(prevCommentPart, markdownHelpItem.checkLength);
    const nextCommentPart = markdownHelpItem.wrapContent(value) + spaces;

    document.execCommand('insertText', false, nextCommentPart);

    setTextareaCursor(
      format,
      prevCommentPart.length,
      nextCommentPart.length,
      textareaNode,
      (selectionEnd ?? 0) +
        (markdownHelpItem?.format === MarkdownFormat.ref ? 0 : markdownHelpItem?.checkLength ?? 0) -
        spaces.length,
    );
  }
}

export function setMarkdownFiles(
  file: RefItem,
  textarea: Textarea,
  format: MarkdownFormat,
  cursorPosition?: number | null,
  fileApiUrl?: string,
) {
  const markdownHelpItem = markdownHelpFiles(fileApiUrl).find(item => item.format === format);

  if (markdownHelpItem) {
    const textareaNode = (textarea as any).node as HTMLTextAreaElement;
    const currentCursorPosition = cursorPosition ?? textareaNode.selectionStart ?? textareaNode?.value?.length;
    const nextCommentPart = markdownHelpItem.wrapContent(file);
    const newCursorPosition = currentCursorPosition + nextCommentPart.length;

    textareaNode.selectionStart = currentCursorPosition;
    textareaNode.focus();

    document.execCommand('insertText', false, nextCommentPart);

    textareaNode.selectionStart = newCursorPosition;
    textareaNode.selectionEnd = newCursorPosition;
  }
}

export function setMarkdownPastedHtml(text: string, textareaNode: HTMLTextAreaElement) {
  const selectionStart = textareaNode.selectionStart;

  const currentCursorPosition = selectionStart ?? textareaNode?.value?.length ?? 0;
  const newCursorPosition = currentCursorPosition + text.length;

  textareaNode.selectionStart = currentCursorPosition;
  textareaNode.focus();

  document.execCommand('insertText', false, text);

  textareaNode.selectionStart = newCursorPosition;
  textareaNode.selectionEnd = newCursorPosition;
}

export function setTextareaCursor(
  format: MarkdownFormat,
  prevCommentPartLength: number,
  nextCommentPartLength: number,
  textareaNode: HTMLTextAreaElement,
  selectionEnd: number,
) {
  if (betweenTextFormats.includes(format)) {
    const formatCenterPosition = (nextCommentPartLength - prevCommentPartLength) / 2;

    textareaNode.selectionStart = selectionEnd + formatCenterPosition;
    textareaNode.selectionEnd = selectionEnd + formatCenterPosition;
  }

  if (specialFormats.includes(format)) {
    const nextCommentCursorPosition = nextCommentPartLength - 1;

    textareaNode.selectionStart = selectionEnd - prevCommentPartLength + nextCommentCursorPosition;
    textareaNode.selectionEnd = selectionEnd - prevCommentPartLength + nextCommentCursorPosition;
  }
}

export function createMarkdownHelpKeyDownHandler(
  text: string,
  ref?: RefObject<Textarea> | null,
  callback?: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void,
) {
  return (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (!ref?.current) {
      return;
    }

    const textareaNode = (ref.current as any).node as HTMLTextAreaElement;

    const format = eventKeyCodeToMarkdownFormat[event.keyCode];

    if (event.ctrlKey && event.altKey && format) {
      const markdownHelpItem = markdownHelpItems.find(item => item.format === format);

      if (markdownHelpItem && textareaNode) {
        event.stopPropagation();
        event.preventDefault();

        const [start, end] = [textareaNode.selectionStart, textareaNode.selectionEnd];
        const prevCommentPart = text.substring(start, end);
        const nextCommentPart = markdownHelpItem.wrapContent(prevCommentPart);

        document.execCommand('insertText', false, nextCommentPart);

        setTextareaCursor(format, prevCommentPart.length, nextCommentPart.length, textareaNode, end);
      }
    }

    callback && callback(event);
  };
}

export const usePasteFromClipboard = (
  textarea: Nullable<Textarea>,
  uploadFileApi?: (file: File) => Promise<RefItem>,
  downloadFileApi?: (id: string) => Promise<File>,
  fileApiUrl?: string,
) => {
  const { uploadFile } = useFileLogic(uploadFileApi, downloadFileApi, fileApiUrl, textarea);
  const textareaNode = (textarea as any)?.node as HTMLTextAreaElement;

  useEffect(() => {
    if (downloadFileApi && uploadFileApi) {
      const handlePaste = (event: ClipboardEvent) => {
        const files = event?.clipboardData?.files;
        const html = event?.clipboardData
          ?.getData('text/html')
          ?.replace(`<meta charset='utf-8'>`, '')
          ?.replace(`<meta charset="utf-8">`, '');

        if (files?.length) {
          event.preventDefault();
          void uploadFile(files[0]);

          return;
        }

        if (html) {
          getPastedHtml(html, event, textareaNode);

          return;
        }
      };

      if (textareaNode) {
        textareaNode.addEventListener('paste', handlePaste);
      }

      return () => textareaNode?.removeEventListener('paste', handlePaste);
    }
  }, [downloadFileApi, textareaNode, uploadFile, uploadFileApi]);
};
