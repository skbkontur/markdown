import React, { ReactNode } from 'react';

import { MarkdownSymbolWrapper } from './Markdown.styled';
import { MarkdownFormat } from './MarkdownFormat';
import { RefItem } from './types';
import { AttachLink } from '../MarkdownIcons/AttachLink';
import { AttachPaperclip } from '../MarkdownIcons/AttachPaperclip';
import { CheckedList } from '../MarkdownIcons/CheckedList';
import { List } from '../MarkdownIcons/List';
import { I } from '../MarkdownIcons/MarkdownIcons.styled';
import { NumberedList } from '../MarkdownIcons/NumberedList';
import { Table } from '../MarkdownIcons/Table';

const newLinesRegexp = /([\n\r]+)/g;
const spacesMatchRegexp = /\s/gm;
const spacesSplitRegexp = /(\s+)/;

export const eventKeyCodeToMarkdownFormat: { [key: number]: MarkdownFormat } = {
  50: MarkdownFormat.h2,
  51: MarkdownFormat.h3,
  52: MarkdownFormat.h4,
  66: MarkdownFormat.bold,
  73: MarkdownFormat.italic,
  82: MarkdownFormat.crossed,
  85: MarkdownFormat.ref,
  76: MarkdownFormat.list,
  68: MarkdownFormat.checkedList,
  78: MarkdownFormat.numberedList,
  69: MarkdownFormat.codeBlock,
  81: MarkdownFormat.quote,
  80: MarkdownFormat.image,
};

export const markdownFormatToShortKey: Partial<{ [key in MarkdownFormat]: string }> = {
  [MarkdownFormat.h2]: '2',
  [MarkdownFormat.h3]: '3',
  [MarkdownFormat.h4]: '4',
  [MarkdownFormat.bold]: 'B',
  [MarkdownFormat.italic]: 'I',
  [MarkdownFormat.crossed]: 'R',
  [MarkdownFormat.ref]: 'U',
  [MarkdownFormat.list]: 'L',
  [MarkdownFormat.checkedList]: 'D',
  [MarkdownFormat.numberedList]: 'N',
  [MarkdownFormat.codeBlock]: 'E',
  [MarkdownFormat.quote]: 'Q',
  [MarkdownFormat.image]: 'P',
};

export interface MarkdownHelpItem {
  format: MarkdownFormat;
  node: ReactNode;
  text: string;
  wrapContent: (content: string) => string;
  checkLength?: number;
  icon?: ReactNode;
}

function reverseString(text: string) {
  return text.split('').reverse().join('');
}

export function checkSpaceSymbol(text: string, checkedLength?: number) {
  const latestSymbolPos = text.length - 1;
  const latestSymbol = text.charAt(latestSymbolPos);

  if (latestSymbol.match(spacesMatchRegexp) && checkedLength) {
    const substringText = reverseString(text).split(spacesSplitRegexp);
    const spaces = substringText[1];
    const remainingText = substringText.slice(2);
    const textWithoutSpaces = remainingText.join('');
    const reversed = reverseString(textWithoutSpaces);

    return { value: reversed, spaces: reverseString(spaces) };
  }

  return { value: text, spaces: '' };
}

export const markdownHelpHeaders: MarkdownHelpItem[] = [
  {
    format: MarkdownFormat.h2,
    node: (
      <>
        <MarkdownSymbolWrapper>##</MarkdownSymbolWrapper> Заголовок 2
      </>
    ),
    wrapContent: (content: string) => `## ${content}`,
    text: 'Заголовок 2',
  },
  {
    format: MarkdownFormat.h3,
    node: (
      <>
        <MarkdownSymbolWrapper>###</MarkdownSymbolWrapper> Заголовок 3
      </>
    ),
    wrapContent: (content: string) => `### ${content}`,
    text: 'Заголовок 3',
  },
  {
    format: MarkdownFormat.h4,
    node: (
      <>
        <MarkdownSymbolWrapper>####</MarkdownSymbolWrapper> Заголовок 4
      </>
    ),
    wrapContent: (content: string) => `#### ${content}`,
    text: 'Заголовок 4',
  },
];

export const markdownHelpText: MarkdownHelpItem[] = [
  {
    format: MarkdownFormat.bold,
    node: (
      <>
        <MarkdownSymbolWrapper>**</MarkdownSymbolWrapper>Жирный
        <MarkdownSymbolWrapper>**</MarkdownSymbolWrapper>
      </>
    ),
    icon: <strong>B</strong>,
    wrapContent: (content: string) => `**${content}**`,
    text: 'Жирный',
    checkLength: 2,
  },
  {
    format: MarkdownFormat.italic,
    node: (
      <>
        <MarkdownSymbolWrapper>*</MarkdownSymbolWrapper>Курсив
        <MarkdownSymbolWrapper>*</MarkdownSymbolWrapper>
      </>
    ),
    icon: <I>I</I>,
    wrapContent: (content: string) => `*${content}*`,
    text: 'Курсив',
    checkLength: 1,
  },
  {
    format: MarkdownFormat.crossed,
    node: (
      <>
        <MarkdownSymbolWrapper>~~</MarkdownSymbolWrapper>Зачеркнутый
        <MarkdownSymbolWrapper>~~</MarkdownSymbolWrapper>
      </>
    ),
    icon: (
      <span
        style={{
          textDecoration: 'line-through',
        }}
      >
        S
      </span>
    ),
    wrapContent: (content: string) => `~~${content}~~`,
    text: 'Зачеркнутый',
    checkLength: 2,
  },
  {
    format: MarkdownFormat.ref,
    node: (
      <>
        <MarkdownSymbolWrapper>[</MarkdownSymbolWrapper>Название ссылки
        <MarkdownSymbolWrapper>]</MarkdownSymbolWrapper>
        <MarkdownSymbolWrapper>(</MarkdownSymbolWrapper>Ссылка
        <MarkdownSymbolWrapper>)</MarkdownSymbolWrapper>
      </>
    ),
    icon: <AttachLink />,
    wrapContent: (content: string) => `[${content}]()`,
    text: 'Ссылка',
    checkLength: 1,
  },
];

export const markdownHelpLists: MarkdownHelpItem[] = [
  {
    format: MarkdownFormat.list,
    node: (
      <>
        <MarkdownSymbolWrapper>*</MarkdownSymbolWrapper> Список
      </>
    ),
    icon: <List />,
    wrapContent: (content: string) => getList(content, '*'),
    text: 'Список',
  },
  {
    format: MarkdownFormat.checkedList,
    node: (
      <>
        <MarkdownSymbolWrapper>* [x]</MarkdownSymbolWrapper> Список - выполнено
      </>
    ),
    icon: <CheckedList />,
    wrapContent: (content: string) => getList(content, '* [x]'),
    text: 'Список - выполнено',
  },
  {
    format: MarkdownFormat.numberedList,
    node: (
      <>
        <MarkdownSymbolWrapper>1. </MarkdownSymbolWrapper> Список - нумерованный
      </>
    ),
    icon: <NumberedList />,
    wrapContent: (content: string) => getList(content, 1),
    text: 'Список - нумерованный',
  },
];

export const markdownHelpOther: MarkdownHelpItem[] = [
  {
    format: MarkdownFormat.codeBlock,
    node: (
      <>
        <MarkdownSymbolWrapper>`</MarkdownSymbolWrapper>Блок кода
        <MarkdownSymbolWrapper>`</MarkdownSymbolWrapper>
      </>
    ),
    icon: <span>{'</>'}</span>,
    wrapContent: (content: string) => `\`${content}\``,
    text: 'Блок кода',
    checkLength: 1,
  },
  {
    format: MarkdownFormat.quote,
    node: (
      <>
        <MarkdownSymbolWrapper>{'>'} </MarkdownSymbolWrapper> Цитата
      </>
    ),
    icon: '>',
    wrapContent: (content: string) => `> ${content}`,
    text: 'Цитата',
  },
  {
    format: MarkdownFormat.table,
    node: 'Таблица',
    icon: <Table />,
    wrapContent: () => `| Заголовок | Заголовок |
| ------ | ------ |
| Ячейка | Ячейка |
| Ячейка | Ячейка |`,
    text: 'Таблица',
  },
];

export interface MarkdownHelpFileItem extends Omit<MarkdownHelpItem, 'wrapContent'> {
  wrapContent: (file: RefItem) => string;
}

export const markdownHelpFiles = (fileApiUrl?: string): MarkdownHelpFileItem[] => {
  if (!fileApiUrl) return [];

  return [
    {
      format: MarkdownFormat.image,
      node: '',
      icon: <span />,
      wrapContent: file => `![img](${fileApiUrl}${file.id})`,
      text: 'Картинка',
    },
    {
      format: MarkdownFormat.file,
      node: '',
      icon: <AttachPaperclip />,
      wrapContent: file => `[${file.caption}](${fileApiUrl}${file.id})`,
      text: 'Файл',
    },
  ];
};

export const markdownHelpItems: MarkdownHelpItem[] = [
  ...markdownHelpHeaders,
  ...markdownHelpText,
  ...markdownHelpLists,
  ...markdownHelpOther,
];

function getList(value: string, symbol: string | number): string {
  const splitValueWithNewLines = value.split(newLinesRegexp);
  const numberList: number[] = [];

  return splitValueWithNewLines
    .map((v, idx) => {
      if (!newLinesRegexp.test(v)) {
        if (typeof symbol === 'number') {
          numberList.push(idx);

          return `${numberList.length}. ${v}`;
        }

        return `${symbol} ${v}`;
      }

      return v;
    })
    .join('');
}
