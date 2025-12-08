import { Button, Spinner, Textarea, Toast, Tooltip } from '@skbkontur/react-ui';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { TooltipWrapper } from './AIActionsDropdown.styled';
import { MarkdownMenuItem } from '../../Markdown.styled';
import { AIMethod, Nullable } from '../../types';
import { Guid } from '../../utils/guid';
import { RequestStatus } from '../../utils/requestStatus';
import { MarkdownDropdown } from '../MarkdownDropdown/MarkdownDropdown';

interface Props {
  api: (query: string, type: string) => Promise<string>;
  availableMethods: AIMethod[];
  textareaRef: RefObject<Textarea>;
  isPreviewMode?: boolean;
  selectionEnd?: Nullable<number>;
  selectionStart?: Nullable<number>;
}

export const AIActionsDropdown: FC<Props> = ({
  selectionStart,
  selectionEnd,
  textareaRef,
  isPreviewMode,
  availableMethods,
  api,
}) => {
  const [processedText, setProcessedText] = useState<string>();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.Default);

  const tooltipRef = useRef<Tooltip>(null);
  const taskIdRef = useRef<Guid>(new Guid());

  useEffect(() => {
    handleCloseTooltip();
  }, [selectionStart, selectionEnd, api]);

  if (!textareaRef?.current) return null;

  const htmlTextArea = (textareaRef.current as any).node as HTMLTextAreaElement;

  const content = (
    <MarkdownDropdown
      hintText="ИИ-помощник"
      caption="AI"
      menuWidth={180}
      isPreviewMode={isPreviewMode}
      onOpen={handleCloseTooltip}
    >
      {availableMethods.map(({ method, caption }) => (
        <MarkdownMenuItem key={method} onClick={() => handleProcessText(method)}>
          {caption}
        </MarkdownMenuItem>
      ))}
    </MarkdownDropdown>
  );

  return (
    <Tooltip ref={tooltipRef} trigger="manual" render={renderTooltipContent} onClose={handleCloseTooltip}>
      {content}
    </Tooltip>
  );

  function renderTooltipContent() {
    if (requestStatus === RequestStatus.isFetching) return <Spinner caption="Обрабатываем" type="mini" />;

    return (
      <TooltipWrapper>
        <div>{processedText}</div>
        <Button onClick={handleSetText}>Заменить текст</Button>
      </TooltipWrapper>
    );
  }

  async function handleProcessText(method: string) {
    try {
      tooltipRef?.current?.show();

      const taskId = taskIdRef.current.generate();

      setRequestStatus(RequestStatus.isFetching);

      const value = htmlTextArea.value.substring(Number(selectionStart), selectionEnd ?? undefined);

      const response = await api(value, method);

      if (response && taskId === taskIdRef.current.generated) {
        setRequestStatus(RequestStatus.isLoaded);
        setProcessedText(response);
      }
    } catch (e) {
      Toast.push('Ошибка обработки текста');
    }
  }

  function handleSetText() {
    if (!textareaRef?.current) return null;

    textareaRef.current.focus();

    document.execCommand('insertText', false, processedText);

    handleCloseTooltip();
  }

  function handleCloseTooltip() {
    setProcessedText(undefined);
    tooltipRef?.current?.hide();
  }
};
