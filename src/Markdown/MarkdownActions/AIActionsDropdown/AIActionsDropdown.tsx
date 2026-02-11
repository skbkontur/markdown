import { Button, Hint, Spinner, Textarea, Toast, Tooltip } from '@skbkontur/react-ui';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { DropdownCaptionWrapper, TooltipButtonsWrapper, TooltipWrapper } from './AIActionsDropdown.styled';
import { COPY_BUTTON_TEXT, ERROR_NOT_FOUND_TEXT } from './constants';
import { Copy } from '../../../MarkdownIcons/Copy';
import { NatureFxSparkleA2 } from '../../../MarkdownIcons/NatureFxSparkleA2';
import { MarkdownMenuItem } from '../../Markdown.styled';
import { AIMethod, Nullable } from '../../types';
import { Guid } from '../../utils/guid';
import { RequestStatus } from '../../utils/requestStatus';
import { MarkdownDropdown } from '../MarkdownDropdown/MarkdownDropdown';

interface Props {
  api: (query: string, method: string) => Promise<Nullable<string>>;
  availableMethods: AIMethod[];
  textareaRef: RefObject<Textarea>;
  isPreviewMode?: boolean;
}

export const AIActionsDropdown: FC<Props> = ({ textareaRef, isPreviewMode, availableMethods, api }) => {
  const [processedText, setProcessedText] = useState<string>();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.Default);

  const tooltipRef = useRef<Tooltip>(null);
  const taskIdRef = useRef<Guid>(new Guid());

  const htmlTextArea = (textareaRef.current as any)?.node as HTMLTextAreaElement;
  const selectionStart = htmlTextArea?.selectionStart;
  const selectionEnd = htmlTextArea?.selectionEnd;

  useEffect(() => {
    handleCloseTooltip();
  }, [selectionStart, selectionEnd, api]);

  if (!textareaRef?.current) return null;

  const value = htmlTextArea.value.substring(Number(selectionStart), selectionEnd ?? undefined);

  const isEmptySelected = selectionEnd === selectionStart;

  const content = (
    <MarkdownDropdown
      hintText={isEmptySelected ? 'Выдели текст' : 'ИИ-помощник'}
      caption={
        <DropdownCaptionWrapper>
          <NatureFxSparkleA2 /> ИИ
        </DropdownCaptionWrapper>
      }
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
  );

  return (
    <Tooltip
      ref={tooltipRef}
      pos="top right"
      allowedPositions={['top right', 'right middle', 'bottom right']}
      trigger="manual"
      render={renderTooltipContent}
      onClose={handleCloseTooltip}
    >
      {content}
    </Tooltip>
  );

  function renderTooltipContent() {
    if (requestStatus === RequestStatus.isFetching) return <Spinner caption="Обрабатываем" type="mini" />;

    return (
      <TooltipWrapper>
        <div>{processedText}</div>
        {processedText !== ERROR_NOT_FOUND_TEXT && (
          <TooltipButtonsWrapper>
            <Button onClick={handleSetText}>Заменить текст</Button>
            <Hint text={COPY_BUTTON_TEXT}>
              <Button aria-label={COPY_BUTTON_TEXT} icon={<Copy />} onClick={handleCopyText} />
            </Hint>
          </TooltipButtonsWrapper>
        )}
      </TooltipWrapper>
    );
  }

  async function handleProcessText(method: string) {
    try {
      tooltipRef?.current?.show();

      const taskId = taskIdRef.current.generate();

      setRequestStatus(RequestStatus.isFetching);

      const response = await api(value, method);

      if (response && taskId === taskIdRef.current.generated) {
        setRequestStatus(RequestStatus.isLoaded);
        setProcessedText(value === response ? ERROR_NOT_FOUND_TEXT : response);
      }
    } catch (e) {
      Toast.push('Ошибка обработки текста');
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
