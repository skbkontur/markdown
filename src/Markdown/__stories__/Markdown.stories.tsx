import { ValidationContainer } from '@skbkontur/react-ui-validations';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { a11yRules } from '../../../a11y/rules';
import { allVariantsMarkdownMock } from '../__mocks__/markdown.mock';
import { Markdown } from '../Markdown';

export default {
  title: 'Markdown',
  component: Markdown,
  decorators: [story => <div style={{ width: 486, minHeight: 200 }}>{story()}</div>],
  parameters: {
    a11y: {
      config: {
        rules: [a11yRules.buttonName, a11yRules.linkName],
      },
    },
  },
} as Meta;

export const WithoutActions = () => <Markdown hideMarkdownActions value={allVariantsMarkdownMock} />;

export const WithActions = () => <Markdown value={allVariantsMarkdownMock} />;

export const WithPanel = () => <Markdown value={allVariantsMarkdownMock} panelHorizontalPadding={28} />;

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
