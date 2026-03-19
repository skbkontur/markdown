import styled from '../../../styles/styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    font-size: ${p => p.theme.elementsFontSize};
  }
`;
