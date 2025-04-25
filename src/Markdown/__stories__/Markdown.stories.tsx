import { Modal, SizeProp } from '@skbkontur/react-ui';
import { text, ValidationContainer } from '@skbkontur/react-ui-validations';
import { Meta, StoryFn } from '@storybook/react';
import React, { CSSProperties, useState } from 'react';

import { a11yRules } from '../../../a11y/rules';
import { MarkdownViewer } from '../../MarkdownViewer';
import { allVariantsMarkdownMock, emojiMarkdownMock } from '../__mocks__/markdown.mock';
import { Markdown } from '../Markdown';
import { MarkdownApi, RefItem, User } from '../types';

const sizeOptions: SizeProp[] = ['small', 'medium', 'large'];

export default {
  title: 'Markdown',
  component: Markdown,
  decorators: [story => <div style={{ maxWidth: 486, minHeight: 388 }}>{story()}</div>],
  parameters: {
    a11y: {
      config: {
        rules: [a11yRules.buttonName, a11yRules.linkName],
      },
    },
  },
  args: {
    size: 'small',
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
    },
  },
} as Meta;
type Story = StoryFn<typeof Markdown>;

const apiMock: MarkdownApi = {
  fileDownloadApi: () => new Promise<File>(resolve => resolve(new File(['a'], 'test.txt'))),
  fileUploadApi: () => new Promise<RefItem>(resolve => resolve({ id: 'i', caption: 'test.txt' })),
  getUsersApi: () => new Promise<User[]>(resolve => resolve([{ id: '1', name: 'Максим', login: 'login', teams: [] }])),
};

export const MediumSize: Story = args => <Markdown {...args} width="100%" value={allVariantsMarkdownMock} />;
MediumSize.args = {
  size: 'medium',
};

export const LargeSize: Story = args => <Markdown {...args} value={allVariantsMarkdownMock} />;
LargeSize.args = {
  size: 'large',
};

export const WithPanel: Story = args => (
  <Markdown {...args} borderless value={allVariantsMarkdownMock} panelHorizontalPadding={28} />
);

export const Editable: Story = args => {
  const [value, setValue] = useState<string>('');

  return (
    <Markdown
      {...args}
      api={apiMock}
      fileApiUrl="/api/file/download"
      value={value}
      maxLength={50000}
      onValueChange={setValue}
    />
  );
};

export const WithValidation: Story = args => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return (
    <ValidationContainer>
      <Markdown
        {...args}
        withValidationWrapper
        value={value}
        validationInfo={{ type: 'immediate', level: 'error', message: 'error' }}
        onValueChange={setValue}
      />
    </ValidationContainer>
  );
};

export const InModal: Story = args => {
  const [value, setValue] = useState<string>('');

  return (
    <Modal width={600}>
      <Modal.Header>In Modal</Modal.Header>
      <Modal.Body>
        <Markdown {...args} api={apiMock} value={value} maxLength={50000} onValueChange={setValue} />
      </Modal.Body>
    </Modal>
  );
};

InModal.parameters = { creevey: { captureElement: 'body > div.react-ui > div' } };

export const CustomWidth: Story = args => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return <Markdown {...args} fileApiUrl="/api/file" value={value} onValueChange={setValue} />;
};

CustomWidth.decorators = [];
CustomWidth.args = {
  width: '550px',
};
CustomWidth.argTypes = {
  width: {
    control: 'text',
  },
};

export const CustomValidation: Story = args => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return (
    <ValidationContainer>
      <Markdown
        {...args}
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

export const WithoutHints: Story = args => {
  return (
    <ValidationContainer>
      <Markdown
        {...args}
        withValidationWrapper
        showShotKeys={false}
        value={allVariantsMarkdownMock}
        validationInfo={{ type: 'immediate', level: 'error', message: 'Сообщение валидации об ошибке в текстарии' }}
        renderMessage={text('bottom')}
      />
    </ValidationContainer>
  );
};

export const Viewer: Story = args => (
  <div style={{ width: 320 }}>
    <MarkdownViewer {...args} fileApiUrl="/api/file/download" source={allVariantsMarkdownMock} />
  </div>
);

Viewer.parameters = {
  creevey: { delay: 5000 },
};

export const WithEmoji = (args: any) => {
  return <Markdown {...args} value={emojiMarkdownMock} />;
};

export const WithEmojiEditable = (args: any) => {
  const [value, setValue] = useState<string>('');

  return <Markdown {...args} value={value} onValueChange={setValue} />;
};

export const HiddenOptions = () => {
  const wrapStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 600,
    fontSize: 12,
  };

  const itemStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'dashed',
  };

  return (
    <div style={wrapStyles}>
      <fieldset style={itemStyles}>
        <legend>Без панели кнопок</legend>
        <Markdown hideActionsOptions={{ allActions: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без заголовок</legend>
        <Markdown hideActionsOptions={{ heading: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без формата текста</legend>
        <Markdown hideActionsOptions={{ bold: true, italic: true, crossed: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без ссылки</legend>
        <Markdown hideActionsOptions={{ ref: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без списков</legend>
        <Markdown hideActionsOptions={{ list: true, checkedList: true, numberedList: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без блока кода</legend>
        <Markdown hideActionsOptions={{ codeBlock: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без цитаты</legend>
        <Markdown hideActionsOptions={{ quote: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без таблицы</legend>
        <Markdown hideActionsOptions={{ table: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без ссылки на доку по markdown</legend>
        <Markdown hideActionsOptions={{ help: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без кнопки переключения режима просмотра</legend>
        <Markdown hideActionsOptions={{ viewMode: true }} rows={1} />
      </fieldset>
      <fieldset style={itemStyles}>
        <legend>Без кнопки разворачивания/сворачивания</legend>
        <Markdown hideActionsOptions={{ screenMode: true }} rows={1} />
      </fieldset>
    </div>
  );
};
