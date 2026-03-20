import { Modal, SizeProp } from '@skbkontur/react-ui';
import { text, ValidationContainer } from '@skbkontur/react-ui-validations';
import { Meta, StoryFn } from '@storybook/react';
import React, { CSSProperties, useState } from 'react';

import { a11yRules } from '../../../a11y/rules';
import { MarkdownViewer } from '../../MarkdownViewer';
import {
  AIApiMock,
  allVariantsMarkdownMock,
  apiMock,
  emojiMarkdownMock,
  hiddenOptionsTestCases,
} from '../__mocks__/markdown.mock';
import { Markdown, MarkdownProps } from '../Markdown';

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

const baseProps: Partial<MarkdownProps> = {
  api: apiMock,
};

export const MediumSize: Story = args => (
  <Markdown {...baseProps} {...args} width="100%" value={allVariantsMarkdownMock} />
);
MediumSize.args = {
  size: 'medium',
};

export const LargeSize: Story = args => <Markdown {...baseProps} {...args} value={allVariantsMarkdownMock} />;
LargeSize.args = {
  size: 'large',
};

export const WithPanel: Story = args => (
  <Markdown {...baseProps} {...args} borderless value={allVariantsMarkdownMock} panelHorizontalPadding={28} />
);

export const Editable: Story = args => {
  const [value, setValue] = useState<string>('');

  return (
    <Markdown
      {...baseProps}
      {...args}
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
        {...baseProps}
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
        <Markdown {...baseProps} {...args} value={value} maxLength={50000} onValueChange={setValue} />
      </Modal.Body>
    </Modal>
  );
};

InModal.parameters = { creevey: { captureElement: 'body > div.react-ui > div' } };

export const CustomWidth: Story = args => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return <Markdown {...baseProps} {...args} fileApiUrl="/api/file" value={value} onValueChange={setValue} />;
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
        {...baseProps}
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
        {...baseProps}
        {...args}
        withValidationWrapper
        showActionHints={false}
        showShortKeys={false}
        value={allVariantsMarkdownMock}
        renderMessage={text('bottom')}
      />
    </ValidationContainer>
  );
};

export const WithActionHint: Story = args => {
  return (
    <ValidationContainer>
      <Markdown
        {...baseProps}
        {...args}
        withValidationWrapper
        showActionHints
        showShortKeys={false}
        value={allVariantsMarkdownMock}
        renderMessage={text('bottom')}
      />
    </ValidationContainer>
  );
};

export const WithShortKeyHint: Story = args => {
  return (
    <ValidationContainer>
      <Markdown
        {...baseProps}
        {...args}
        withValidationWrapper
        showShortKeys
        showActionHints={false}
        value={allVariantsMarkdownMock}
        renderMessage={text('bottom')}
      />
    </ValidationContainer>
  );
};

export const WithActionAndShortKeyHints: Story = args => {
  return (
    <ValidationContainer>
      <Markdown
        {...baseProps}
        {...args}
        withValidationWrapper
        showActionHints
        showShortKeys
        value={allVariantsMarkdownMock}
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
  return <Markdown {...baseProps} {...args} value={emojiMarkdownMock} />;
};

export const WithEmojiEditable = (args: any) => {
  const [value, setValue] = useState<string>('');

  return <Markdown {...baseProps} {...args} value={value} onValueChange={setValue} />;
};

export const WithAIApi = (args: any) => {
  const [value, setValue] = useState<string>('');

  return (
    <Markdown width="550px" api={{ ...apiMock, AIApi: AIApiMock }} {...args} value={value} onValueChange={setValue} />
  );
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
      {hiddenOptionsTestCases.map(({ legend, hideActionsOptions }, index) => (
        <fieldset key={index} style={itemStyles}>
          <legend>{legend}</legend>
          <Markdown api={{ AIApi: AIApiMock }} hideActionsOptions={hideActionsOptions} rows={1} />
        </fieldset>
      ))}
    </div>
  );
};
