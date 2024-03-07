import { Textarea, TextareaProps } from '@skbkontur/react-ui';
import { ValidationInfo, ValidationWrapper, RenderErrorMessage } from '@skbkontur/react-ui-validations';
import React, { FC, RefObject } from 'react';
import { useDropzone } from 'react-dropzone';

import { createMarkdownHelpKeyDownHandler } from './MarkdownHelpers/markdownHelpers';
import { Nullable } from './types';

export interface MarkdownEditorProps
  extends Omit<TextareaProps, 'rows' | 'maxRows' | 'disableAnimations' | 'extraRow'> {
  disableAnimations?: boolean;
  extraRow?: boolean;
  maxRows?: number;
  /** Рендер сообщения валидации react-ui-validations */
  renderMessage?: Nullable<RenderErrorMessage>;
  rows?: number;
  textareaRef?: RefObject<Textarea>;
  /** Стандартная валидация из react-ui-validations */
  validationInfo?: Nullable<ValidationInfo>;
}

export const MarkdownEditor: FC<MarkdownEditorProps> = props => {
  const {
    resize = 'none',
    width = '100%',
    autoResize = true,
    showLengthCounter: propsShowLengthCounter = true,
    textareaRef,
    validationInfo,
    renderMessage,
    ...rest
  } = props;

  const { getInputProps } = useDropzone();

  return validationInfo ? (
    <ValidationWrapper validationInfo={validationInfo} renderMessage={renderMessage}>
      {renderTextarea()}
    </ValidationWrapper>
  ) : (
    renderTextarea()
  );

  function renderTextarea() {
    return (
      <Textarea
        ref={textareaRef}
        id="MarkdownTextArea"
        {...rest}
        {...getInputProps}
        resize={resize}
        width={width}
        showLengthCounter={showLengthCounter()}
        autoResize={autoResize}
        onKeyDown={createMarkdownHelpKeyDownHandler((props.value as string) || '', textareaRef, props.onKeyDown)}
      />
    );
  }

  function showLengthCounter(): boolean {
    if (propsShowLengthCounter) {
      const { value, maxLength } = rest;

      return Number(maxLength) - Number((value as string)?.length) <= 500;
    }

    return false;
  }
};
