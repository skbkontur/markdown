import styled from '../../../styles/styled-components';

export const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

export const TooltipContentWrapper = styled.div`
  max-height: 400px;
  white-space: pre-wrap;
  overflow-y: auto;
`;

export const TooltipButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DropdownCaptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
