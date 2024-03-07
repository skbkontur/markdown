import { Modal, THEME_2022 } from '@skbkontur/react-ui';
import { text, ValidationContainer } from '@skbkontur/react-ui-validations';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';

import { a11yRules } from '../../../a11y/rules';
import { MarkdownThemeProvider } from '../../../index';
import { allVariantsMarkdownMock } from '../__mocks__/markdown.mock';
import { Markdown } from '../Markdown';

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

export const WithoutActions = () => <Markdown hideMarkdownActions value={allVariantsMarkdownMock} />;

export const WithActions = () => <Markdown fileApiUrl="/api/file" value={allVariantsMarkdownMock} />;

export const WithPanel = () => <Markdown value={allVariantsMarkdownMock} panelHorizontalPadding={28} />;
export const WithoutHeadersSelect = () => (
  <Markdown hideHeadersSelect value={allVariantsMarkdownMock} panelHorizontalPadding={28} />
);

export const Editable = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Markdown
      api={{
        fileDownloadApi: () => new Promise<File>(() => new File(['a'], 'test.txt')),
        fileUploadApi: () => new Promise(() => ({ id: 'i', caption: 'test.txt' })),
      }}
      value={value}
      maxLength={50000}
      onValueChange={setValue}
    />
  );
};

export const WithValidation = () => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return (
    <ValidationContainer>
      <Markdown
        value={value}
        validationInfo={{ type: 'immediate', level: 'error', message: 'error' }}
        onValueChange={setValue}
      />
    </ValidationContainer>
  );
};

export const InModal: Story = () => {
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
          <Markdown
            api={{
              fileDownloadApi: () => new Promise<File>(() => new File(['a'], 'test.txt')),
              fileUploadApi: () => new Promise(() => ({ id: 'i', caption: 'test.txt' })),
            }}
            value={value}
            maxLength={50000}
            onValueChange={setValue}
          />
        </Modal.Body>
      </Modal>
    </MarkdownThemeProvider>
  );
};

InModal.parameters = { creevey: { captureElement: 'body > div.react-ui > div' } };

export const CustomWidth: Story = () => (
  <Markdown width="550px" fileApiUrl="/api/file" value={allVariantsMarkdownMock} />
);

CustomWidth.decorators = [];

export const CustomValidation: Story = () => {
  const [value, setValue] = useState<string>(allVariantsMarkdownMock);

  return (
    <ValidationContainer>
      <Markdown
        width={444}
        value={value}
        validationInfo={{ type: 'immediate', level: 'error', message: 'Сообщение валидации об ошибке в текстарии' }}
        renderMessage={text('bottom')}
        onValueChange={setValue}
      />
    </ValidationContainer>
  );
};
