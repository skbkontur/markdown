import { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { onInsertText } from '../utils/onInsertText';

const listItemRegExp = /^(?<spacesBeforeMarker> *)(?:(?<orderedListNumber>\d+)(?<orderedListDelimiter>[.)])|(?<unorderedListMarker>[*+-])(?: +(?<checkboxListMarker>\[[ xX]]))?)(?: +(?<text>.*)|$)$/;

interface MarkdownListItemGroups {
  spacesBeforeMarker: string;
  checkboxListMarker?: string;
  orderedListDelimiter?: string;
  orderedListNumber?: string;
  text?: string;
  unorderedListMarker?: string;
}

export function handleMarkdownListEnter(
  event: ReactKeyboardEvent<HTMLTextAreaElement>,
  textareaNode: HTMLTextAreaElement,
) {
  const { selectionStart, selectionEnd, value } = textareaNode;

  const isOnlyDownEnter = event.key === 'Enter' && !event.shiftKey && !event.altKey && !event.metaKey && !event.ctrlKey;

  if (!isOnlyDownEnter || selectionStart !== selectionEnd) return;

  /*
   * Находим начало текущей строки:
   * ищем последний перенос строки перед курсором
   * и берём позицию сразу после него
   */
  const currentLineStartIndex = value.lastIndexOf('\n', selectionStart - 1) + 1;

  /* Находим конец текущей строки */
  const currentLineEndIndex = getCurrentLineEndIndex(value, selectionStart);

  const currentLineText = value.slice(currentLineStartIndex, currentLineEndIndex);
  const listLineMatch = currentLineText.match(listItemRegExp);

  if (!listLineMatch?.groups) return;

  const {
    spacesBeforeMarker,
    orderedListNumber,
    orderedListDelimiter,
    unorderedListMarker,
    checkboxListMarker,
    text,
  } = (listLineMatch.groups as unknown) as MarkdownListItemGroups;

  event.stopPropagation();
  event.preventDefault();

  if (!text?.trim()) {
    textareaNode.setSelectionRange(currentLineStartIndex, currentLineEndIndex);

    return document.execCommand('delete');
  }

  if (orderedListNumber && orderedListDelimiter)
    return onInsertText(`\n${spacesBeforeMarker}${Number(orderedListNumber) + 1}${orderedListDelimiter} `);

  if (checkboxListMarker) return onInsertText(`\n${spacesBeforeMarker}${unorderedListMarker} ${checkboxListMarker} `);

  if (unorderedListMarker) return onInsertText(`\n${spacesBeforeMarker}${unorderedListMarker} `);
}

function getCurrentLineEndIndex(text: string, cursorPosition: number) {
  /* Ищем ближайший перенос строки после курсора */
  const currentLineEndIndex = text.indexOf('\n', cursorPosition);

  /*
   * Если переноса строки после курсора нет,
   * значит текущая строка последняя
   * и заканчивается в конце всего текста
   */
  if (currentLineEndIndex === -1) return text.length;

  return currentLineEndIndex;
}
