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

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol,
  li {
    p {
      margin: 0;
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

export const ImgHref = styled.a`
  text-decoration: none !important;
  border: none !important;
`;

export function getListStyle(depth: boolean): CSSProperties {
  return depth ? { marginTop: 4 } : { marginBottom: 16 };
}

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
