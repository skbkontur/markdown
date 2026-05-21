import { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { onInsertText } from '../utils/onInsertText';

/**
 * RegExp для парсинга markdown-like list item.
 *
 * Поддерживает:
 * - unordered lists: "- item", "* item", "+ item";
 * - ordered lists: "1. item", "1) item";
 * - checkbox items: "- [ ] item", "- [x] item done", "- [X] item done".
 *
 * Группы:
 * - spacesBeforeMarker: отступы перед маркером списка;
 * - orderedListNumber: номер ordered-list элемента;
 * - orderedListDelimiter: разделитель ordered-list: "." или ")";
 * - unorderedListMarker: маркер unordered-list: "*", "-" или "+";
 * - checkboxListMarker: checkbox-маркер: "[ ]", "[x]" или "[X]";
 * - text: текст элемента списка, может быть пустым.
 */
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

  /* Если пункт списка пустой, удаляем маркер и завершаем список */
  if (!text?.trim()) {
    textareaNode.setSelectionRange(currentLineStartIndex, currentLineEndIndex);

    return document.execCommand('delete');
  }

  if (orderedListNumber && orderedListDelimiter) {
    const nextOrderedListNumber = Number(orderedListNumber) + 1;
    const newLine = `\n${spacesBeforeMarker}${nextOrderedListNumber}${orderedListDelimiter} `;
    const { isChanged, listEndIndex, renumberedList } = getRenumberedListLines(
      value,
      currentLineEndIndex,
      spacesBeforeMarker,
      orderedListDelimiter,
      nextOrderedListNumber + 1,
    );

    if (isChanged) {
      const currentLineTextAfterCursor = value.slice(selectionStart, currentLineEndIndex);

      textareaNode.setSelectionRange(selectionStart, listEndIndex);

      onInsertText(`${newLine}${currentLineTextAfterCursor}${renumberedList}`);

      const cursorPosition = selectionStart + newLine.length;

      return textareaNode.setSelectionRange(cursorPosition, cursorPosition);
    }

    return onInsertText(newLine);
  }

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

function getRenumberedListLines(
  value: string,
  currentLineEndIndex: number,
  spacesBeforeMarker: string,
  orderedListDelimiter: string,
  nextOrderedListNumber: number,
) {
  let nextLineStartIndex = currentLineEndIndex + 1;
  let currentOrderedListNumber = nextOrderedListNumber;
  let isChanged = false;
  let renumberedList = '';
  let listEndIndex = currentLineEndIndex;

  while (nextLineStartIndex < value.length) {
    const nextLineEndIndex = getCurrentLineEndIndex(value, nextLineStartIndex);
    const line = value.slice(nextLineStartIndex, nextLineEndIndex);
    const listLineMatch = line.match(listItemRegExp);
    const groups = listLineMatch?.groups as MarkdownListItemGroups | undefined;

    if (
      !groups?.orderedListNumber ||
      groups.spacesBeforeMarker !== spacesBeforeMarker ||
      groups.orderedListDelimiter !== orderedListDelimiter
    )
      break;

    const renumberedLine = line.replace(
      `${spacesBeforeMarker}${groups.orderedListNumber}${orderedListDelimiter}`,
      `${spacesBeforeMarker}${currentOrderedListNumber}${orderedListDelimiter}`,
    );

    if (renumberedLine !== line) isChanged = true;

    renumberedList += `\n${renumberedLine}`;
    listEndIndex = nextLineEndIndex;
    nextLineStartIndex = nextLineEndIndex + 1;
    currentOrderedListNumber += 1;
  }

  return {
    isChanged,
    listEndIndex,
    renumberedList,
  };
}
