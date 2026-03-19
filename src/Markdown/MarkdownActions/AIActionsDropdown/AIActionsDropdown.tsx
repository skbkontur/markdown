import { Button, Hint, Spinner, Textarea, Toast, Tooltip } from '@skbkontur/react-ui';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { TooltipButtonsWrapper, TooltipContentWrapper, TooltipWrapper } from './AIActionsDropdown.styled';
import { COPY_BUTTON_TEXT, ERRORS_NOT_FOUND_TEXT } from './constants';
import { Copy } from '../../../MarkdownIcons/Copy';
import { NatureFxSparkleA2 } from '../../../MarkdownIcons/NatureFxSparkleA2';
import { MarkdownMenuItem } from '../../Markdown.styled';
import { AIApi } from '../../types';
import { Guid } from '../../utils/guid';
import { RequestStatus } from '../../utils/requestStatus';
import { MarkdownDropdown } from '../MarkdownDropdown/MarkdownDropdown';

interface Props {
  api: AIApi;
  showActionHint: boolean;
  textareaRef: RefObject<Textarea>;
  isPreviewMode?: boolean;
}

export const AIActionsDropdown: FC<Props> = ({ textareaRef, isPreviewMode, showActionHint, api }) => {
  const [processedText, setProcessedText] = useState<string>();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.Default);

  const tooltipRef = useRef<Tooltip>(null);
  const taskIdRef = useRef<Guid>(new Guid());

  const { availableMethods, onSendMessage } = api;
  const htmlTextArea = (textareaRef.current as any)?.node as HTMLTextAreaElement;
  const selectionStart = htmlTextArea?.selectionStart;
  const selectionEnd = htmlTextArea?.selectionEnd;

  useEffect(() => {
    handleCloseTooltip();
  }, [selectionStart, selectionEnd]);

  useEffect(() => {
    if (processedText) tooltipRef.current?.show();
  }, [processedText]);

  if (!textareaRef?.current) return null;

  const value = htmlTextArea.value.substring(Number(selectionStart), selectionEnd ?? undefined);

  const isEmptySelected = selectionEnd === selectionStart;

  return (
    <Tooltip
      key={processedText}
      ref={tooltipRef}
      pos="top right"
      allowedPositions={['top right', 'right middle', 'bottom right', 'bottom left']}
      trigger="manual"
      render={renderTooltipContent}
    >
      <MarkdownDropdown
        hintPos="top center"
        showActionHint={showActionHint}
        hintText={isEmptySelected ? 'Выдели текст' : 'ИИ-помощник'}
        icon={<NatureFxSparkleA2 />}
        caption="ИИ"
        menuWidth={180}
        disabled={isPreviewMode || isEmptySelected}
        onOpen={handleCloseTooltip}
      >
        {availableMethods.map(({ method, caption }) => (
          <MarkdownMenuItem key={method} onClick={() => handleProcessText(method)}>
            {caption}
          </MarkdownMenuItem>
        ))}
      </MarkdownDropdown>
    </Tooltip>
  );

  function renderTooltipContent() {
    if (requestStatus === RequestStatus.isFetching) return <Spinner caption="Обрабатываем" type="mini" />;

    return (
      <TooltipWrapper>
        <TooltipContentWrapper>{processedText}</TooltipContentWrapper>
        {processedText !== ERRORS_NOT_FOUND_TEXT && (
          <TooltipButtonsWrapper>
            <Button onClick={handleSetText}>Заменить текст</Button>
            <Hint text={COPY_BUTTON_TEXT}>
              <Button
                aria-label={COPY_BUTTON_TEXT}
                icon={<Copy />}
                onMouseDown={e => e.preventDefault()}
                onClick={handleCopyText}
              />
            </Hint>
          </TooltipButtonsWrapper>
        )}
      </TooltipWrapper>
    );
  }

  async function handleProcessText(method: string) {
    const taskId = taskIdRef.current.generate();

    try {
      tooltipRef?.current?.show();

      setRequestStatus(RequestStatus.isFetching);

      const response = await onSendMessage(value, method);

      if (response && taskId === taskIdRef.current.generated) {
        setRequestStatus(RequestStatus.isLoaded);
        setProcessedText(value === response ? ERRORS_NOT_FOUND_TEXT : response);
      }
    } catch (e) {
      if (taskId === taskIdRef.current.generated) {
        handleCloseTooltip();
        Toast.push('Ошибка обработки текста');
      }
    }
  }

  async function handleCopyText() {
    await navigator.clipboard.writeText(processedText || '');

    handleCloseTooltip();
  }

  function handleSetText() {
    if (!textareaRef?.current) return null;

    textareaRef.current.focus();

    const valueLength = value.length;
    const spaceInStartCount = valueLength - value.trimStart().length;
    const spaceInEndCount = valueLength - value.trimEnd().length;

    htmlTextArea.setSelectionRange(selectionStart + spaceInStartCount, selectionEnd - spaceInEndCount);

    document.execCommand('insertText', false, processedText);

    handleCloseTooltip();
  }

  function handleCloseTooltip() {
    setProcessedText(undefined);
    tooltipRef?.current?.hide();
  }
};
