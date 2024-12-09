import { Modal, SizeProp, THEME_2022 } from '@skbkontur/react-ui';
import { text, ValidationContainer } from '@skbkontur/react-ui-validations';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { a11yRules } from '../../../a11y/rules';
import { MarkdownViewer } from '../../MarkdownViewer';
import { MarkdownThemeProvider } from '../../styles/theme';
import { DEFAULT_MARKDOWN_THEME } from '../../styles/theme';
import { allVariantsMarkdownMock, emojiMarkdownMock } from '../__mocks__/markdown.mock';
import { Markdown } from '../Markdown';
import { MarkdownApi, RefItem, User } from '../types';

export default {
  title: 'Markdown',
  component: Markdown,
  decorators: [story => <div style={{ width: 486, minHeight: 388 }}>{story()}</div>],
  parameters: {
    a11y: {
      config: {
        rules: [a11yRules.buttonName, a11yRules.linkName],
      },
    },
  },
} as Meta;

const apiMock: MarkdownApi = {
  fileDownloadApi: () => new Promise<File>(resolve => resolve(new File(['a'], 'test.txt'))),
  fileUploadApi: () => new Promise<RefItem>(resolve => resolve({ id: 'i', caption: 'test.txt' })),
  getUsersApi: () => new Promise<User[]>(resolve => resolve([{ id: '1', name: 'Максим', login: 'login', teams: [] }])),
};

export const WithoutActions = () => <Markdown hideMarkdownActions value={allVariantsMarkdownMock} />;

export const WithSizeControl: StoryFn<{ size: SizeProp }> = args => (
  <Markdown size={args.size} value={allVariantsMarkdownMock} />
);

WithSizeControl.args = {
  size: 'medium',
};

const sizeOptions: SizeProp[] = ['small', 'medium', 'large'];
WithSizeControl.argTypes = {
  size: {
    control: {
      type: 'select',
      options: sizeOptions,
    },
  },
};

export const WithPanel = () => <Markdown borderless value={allVariantsMarkdownMock} panelHorizontalPadding={28} />;
export const WithoutHeadersSelect = () => (
  <Markdown borderless value={allVariantsMarkdownMock} panelHorizontalPadding={28} />
);

export const Editable = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Markdown api={apiMock} fileApiUrl="/api/file/download" value={value} maxLength={50000} onValueChange={setValue} />
  );
};

export const WithValidation = () => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return (
    <ValidationContainer>
      <Markdown
        withValidationWrapper
        value={value}
        validationInfo={{ type: 'immediate', level: 'error', message: 'error' }}
        onValueChange={setValue}
      />
    </ValidationContainer>
  );
};

export const InModal: StoryFn = () => {
  const [value, setValue] = useState<string>('');

  return (
    <MarkdownThemeProvider
      value={{
        reactUiTheme: THEME_2022,
        themeMode: 'light',
        colors: {
          grayDefault: 'black',
          link: 'black',
          panelBg: 'black',
          disabledButton: 'black',
          white: 'white',
          brand: 'black',
        },
        elementsFontSize: '14px',
        elementsLineHeight: '20px',
      }}
    >
      <Modal width={600}>
        <Modal.Header>In Modal</Modal.Header>
        <Modal.Body>
          <Markdown api={apiMock} value={value} maxLength={50000} onValueChange={setValue} />
        </Modal.Body>
      </Modal>
    </MarkdownThemeProvider>
  );
};

InModal.parameters = { creevey: { captureElement: 'body > div.react-ui > div' } };

export const CustomWidth: StoryFn = () => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return <Markdown width="550px" fileApiUrl="/api/file" value={value} onValueChange={setValue} />;
};

CustomWidth.decorators = [];

export const CustomValidation: StoryFn = () => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return (
    <ValidationContainer>
      <Markdown
        withValidationWrapper
        width={444}
        value={value}
        validationInfo={{ type: 'immediate', level: 'error', message: 'Сообщение валидации об ошибке в текстарии' }}
        renderMessage={text('bottom')}
        onValueChange={setValue}
      />
    </ValidationContainer>
  );
};

export const WithoutHints: StoryFn = () => {
  return (
    <ValidationContainer>
      <Markdown
        withValidationWrapper
        showShotKeys={false}
        value={allVariantsMarkdownMock}
        validationInfo={{ type: 'immediate', level: 'error', message: 'Сообщение валидации об ошибке в текстарии' }}
        renderMessage={text('bottom')}
      />
    </ValidationContainer>
  );
};

export const Viewer: StoryFn = () => (
  <div style={{ width: 320 }}>
    <MarkdownViewer fileApiUrl="/api/file/download" source={allVariantsMarkdownMock} />
  </div>
);

Viewer.parameters = {
  creevey: { delay: 5000 },
};

export const WithEmoji = () => {
  return <Markdown showEmojiPicker value={emojiMarkdownMock} />;
};

export const WithEmojiEditable = () => {
  const [value, setValue] = useState<string>('');

  return <Markdown showEmojiPicker value={value} onValueChange={setValue} />;
};

export const WithEmojiDarkMode = () => {
  const [value, setValue] = useState<string>('');

  return (
    <MarkdownThemeProvider value={{ ...DEFAULT_MARKDOWN_THEME, themeMode: 'dark' }}>
      <Markdown showEmojiPicker value={value} onValueChange={setValue} />
    </MarkdownThemeProvider>
  );
};

export const HiddenOptions = () => {
  const wrapStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 600,
    fontSize: 12,
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'dashed',
  };

  return (
    <div style={wrapStyles}>
      <fieldset style={itemStyle}>
        <legend>Без заголовок</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ h2: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyle}>
        <legend>Без формата текста</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ bold: true, italic: true, crossed: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyle}>
        <legend>Без ссылки</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ ref: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyle}>
        <legend>Без списков</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ list: true, checkedList: true, numberedList: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyle}>
        <legend>Без блока кода</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ codeBlock: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyle}>
        <legend>Без цитаты</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ quote: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyle}>
        <legend>Без таблицы</legend>
        <Markdown showEmojiPicker hideActionsOptions={{ table: true }} rows={1} />
      </fieldset>
    </div>
  );
};
