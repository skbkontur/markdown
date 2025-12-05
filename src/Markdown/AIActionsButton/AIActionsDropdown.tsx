import { Button, Dropdown, Hint, Spinner, Textarea, Toast, Tooltip } from '@skbkontur/react-ui';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { MarkdownDropdown, MarkdownMenuItem } from '../Markdown.styled';
import { Nullable } from '../types';
import { Guid } from '../utils/guid';
import { RequestStatus } from '../utils/requestStatus';

interface Props {
  AIApi: (query: string, type: string) => Promise<string>;
  availableAIMethods: string[];
  textAreaRef: RefObject<Textarea>;
  isPreviewMode?: boolean;
  selectionEnd?: Nullable<number>;
  selectionStart?: Nullable<number>;
}

export const AIActionsDropdown: FC<Props> = ({
  selectionStart,
  selectionEnd,
  textAreaRef,
  isPreviewMode,
  availableAIMethods,
  AIApi,
}) => {
  const [processedText, setProcessedText] = useState<string>();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.Default);

  const tooltipRef = useRef<Tooltip>(null);
  const taskIdRef = useRef<Guid>(new Guid());

  useEffect(() => {
    handleCloseTooltip();
  }, [selectionStart, selectionEnd, AIApi]);

  if (!textAreaRef?.current) return null;

  const htmlTextArea = (textAreaRef.current as any).node as HTMLTextAreaElement;

  const content = (
    <MarkdownDropdown onMouseDown={e => e.preventDefault()}>
      <Hint text="Заголовок" pos="top left">
        <Dropdown disablePortal disabled={isPreviewMode} menuWidth={180} caption="AI" onOpen={handleCloseTooltip}>
          {availableAIMethods.map(method => (
            <MarkdownMenuItem
              key={method}
              onClick={() => {
                tooltipRef?.current?.show();
                handleProcessText(method);
              }}
            >
              {method}
            </MarkdownMenuItem>
          ))}
        </Dropdown>
      </Hint>
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
      <div style={{ maxWidth: 300, display: 'flex', gap: 16, flexDirection: 'column' }}>
        <div>{processedText}</div>
        <Button onClick={handleSetText}>Заменить текст</Button>
      </div>
    );
  }

  async function handleProcessText(method: string) {
    try {
      taskIdRef.current.generate();

      const taskId = taskIdRef.current.generated;

      setRequestStatus(RequestStatus.isFetching);

      const value = htmlTextArea.value.substring(Number(selectionStart), selectionEnd ?? undefined);

      const response = await AIApi(value, method);

      if (response && taskId === taskIdRef.current.generated) {
        setRequestStatus(RequestStatus.isLoaded);
        setProcessedText(response);
      }
    } catch (e) {
      Toast.push('Ошибка обработки текста');
    }
  }

  function handleSetText() {
    if (isNaN(Number(selectionStart)) || isNaN(Number(selectionEnd))) return null;

    if (textAreaRef?.current) {
      textAreaRef.current.focus();

      htmlTextArea.selectionStart = Number(selectionStart);
      htmlTextArea.selectionEnd = Number(selectionEnd);

      document.execCommand('insertText', false, processedText);

      handleCloseTooltip();
    }
  }

  function handleCloseTooltip() {
    setProcessedText(undefined);
    tooltipRef?.current?.hide();
  }
};
