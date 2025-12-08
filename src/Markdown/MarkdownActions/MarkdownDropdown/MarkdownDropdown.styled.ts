import styled from '../../../styles/styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 1px;

  button {
    font-size: ${p => p.theme.elementsFontSize};
  }
`;
