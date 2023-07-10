import { Textarea } from '@skbkontur/react-ui';
import { useCallback, useEffect } from 'react';

import { MENTION_WRAPPER_ID_POSTFIX } from '../constants';
import { Token } from '../types';
import { turndownService } from '../utils/htmlToMd';
import { setMarkdownPastedHtml } from './markdownHelpers';

export const textareaTokensRegExp = /(\[[\w\s\dА-Яа-яЁёЙй]+]\(@[\w\d]+\)|[@А-Яа-яЁёЙйA-Za-z]+)/g;

export const getTextareaTokens = (value: string): Token[] => {
  const splitValue = value.split(textareaTokensRegExp).filter(Boolean);

  const tokens: Token[] = [];

  for (let i = 0; i < splitValue.length; i++) {
    const prevPositions = tokens[i - 1]?.positions ?? [0, 0];
    const start = i ? prevPositions[1] + 1 : prevPositions[0];
    const val = splitValue[i] || '';
    let end = i ? start + (val.length - 1 || 0) : val.length;

    if (val === ' ') end = start;
    if (val === '\n') end = end - 1;

    tokens.push({
      value: val,
      positions: [start, end],
    });
  }

  return tokens;
};

export const getCursorCoordinates = (textArea: HTMLTextAreaElement, id: string) => {
  const container = document.getElementById(`${id}${MENTION_WRAPPER_ID_POSTFIX}`);
  const textBefore = textArea.value.slice(0, textArea.selectionStart).replace('\n', '<br/>');
  const textAfter = textArea.value.slice(textArea.selectionStart).replace('\n', '<br/>');
  const textareaStyles = getComputedStyle(textArea);

  if (container) {
    let content = "<span style='position: relative; display: inline;'>" + textBefore + '</span>';
    content += "<span id='caret' style='position: relative; display: inline;'>|</span>";
    content += "<span style='position: relative; display: inline;'>" + textAfter + '</span>';

    container.contentEditable = 'true';
    container.innerHTML = content;

    for (const prop of textareaStyles as any) {
      container.style[prop as any] = textareaStyles[prop as any];
    }

    container.style['top'] = '0';
    container.style['position'] = 'absolute';
    container.style['zIndex'] = '100';
    container.style['whiteSpace'] = 'pre-wrap';
    container.style['wordBreak'] = 'normal';
    container.style['overflowWrap'] = 'break-word';
    container.style['overflowY'] = 'scroll';
    container.style['visibility'] = 'hidden';
    container.scrollTop = textArea.scrollTop;
  }

  const caret = document.getElementById('caret');

  const { top, left } = caret!.getBoundingClientRect();

  container!.innerHTML = '';

  return {
    x: left,
    y: top + window.scrollY + parseInt(textareaStyles.lineHeight),
  };
};

export const useListenTextareaScroll = (setMention: (value: undefined) => void, textarea?: Textarea | null) => {
  const resetMention = useCallback(() => {
    setMention(undefined);
  }, [setMention]);

  useEffect(() => {
    if (textarea) {
      const node = (textarea as any)?.node as HTMLTextAreaElement;

      node?.addEventListener('scroll', resetMention);

      return () => node?.removeEventListener('scroll', resetMention);
    }
  }, [resetMention, textarea]);

  useEffect(() => {
    window.addEventListener('scroll', resetMention);

    return window.removeEventListener('scroll', resetMention);
  }, [resetMention]);
};

export const getFullscreenHorizontalPadding = (fullscreen: boolean, textareaWidth: number) => {
  if (fullscreen) {
    return (document.body.clientWidth - textareaWidth) / 2;
  }
};

export const getPastedHtml = (html: string, event: ClipboardEvent, textArea: HTMLTextAreaElement) => {
  /** Игнорируем Google Docs/Tables/Presentations **/
  if (!html.includes('id="docs-internal-guid') && !html.includes('<google-sheets-html')) {
    event.preventDefault();
    setMarkdownPastedHtml(turndownService.turndown(html), textArea);
  }
};
