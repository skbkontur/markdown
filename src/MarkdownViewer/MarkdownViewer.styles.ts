import { CSSProperties } from 'react';

import styled from '../styles/styled-components';

export const Wrapper = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;

  word-break: break-word;

  p,
  table,
  blockquote {
    margin-bottom: 16px;
  }

  ul,
  ol {
    p {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 8px;
  }

  img {
    max-width: 100%;
  }

  button {
    text-align: left;
    color: ${p => p.theme?.colors?.link};
  }

  table {
    background: transparent;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  margin-inline-start: -20px;
`;

export const Paragraph = styled.p`
  margin: 0;
`;

export const BlockQuote = styled.blockquote`
  margin: 0;
  padding-left: 8px;
  border-left: 4px solid ${p => p.theme?.colors?.grayDefault};
`;

export const FileButtonWrapper = styled.div`
  display: flex;
`;

export function getListStyle(depth: boolean): CSSProperties {
  return depth ? { marginTop: 4 } : { marginBottom: 16 };
}
