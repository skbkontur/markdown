import { Checkbox } from '@skbkontur/react-ui';
import { CSSProperties } from 'react';

import styled, { css } from '../styles/styled-components';

const baseVisuallyHiddenStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const CheckBoxWrapper = styled(Checkbox)``;

export const Wrapper = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;

  word-break: break-word;

  p,
  table,
  blockquote,
  .math {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul > li > ${CheckBoxWrapper}, ul > li > p > ${CheckBoxWrapper} {
    display: inline-flex;
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 0;
    padding: 0;
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

  ul,
  ol {
    padding-inline-start: 0;

    li {
      margin-inline-start: 0;
      margin-left: 20px;
    }
  }

  .math {
    [aria-hidden='true'] {
      ${baseVisuallyHiddenStyle};
    }
  }
`;

export const ListItem = styled.li`
  list-style: none;
  margin-left: 0 !important;
  padding-inline-start: 20px;
  position: relative;
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
  white-space: pre-wrap;
`;

export const Href = styled.a`
  white-space: pre-wrap;
`;

export const FileName = styled.span`
  white-space: pre-wrap;
`;

export const ImgHref = styled.a`
  text-decoration: none !important;
  border: none !important;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 400px;
`;

export function getListStyle(depth: boolean): CSSProperties {
  return depth ? { marginTop: 4 } : { marginBottom: 16 };
}

export const VisuallyHidden = styled.span`
  ${baseVisuallyHiddenStyle};
`;
