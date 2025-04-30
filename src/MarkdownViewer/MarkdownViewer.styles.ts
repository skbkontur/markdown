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
  position: relative;

  word-break: break-word;

  p,
  hr,
  table,
  blockquote {
    margin-bottom: 16px;
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

  h1 {
    margin-top: 36px;
    margin-bottom: 28px;
  }

  h2 {
    margin-top: 32px;
    margin-bottom: 24px;
  }

  h3 {
    margin-top: 28px;
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 24px;
    margin-bottom: 16px;
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

  blockquote {
    margin: 24px 0;
    padding-left: 16px;
  }

  hr {
    margin-top: 0;
  }

  code {
    display: inline-block;
    white-space: pre-wrap;
    padding: 4px;
    border-radius: 8px;
    border: 1px solid ${p => p.theme?.colors?.grayDefault};
  }

  ul,
  ol {
    padding-inline-start: 0;

    li {
      margin-inline-start: 0;
      margin: 8px 0 8px 20px;
    }
  }

  .math {
    [aria-hidden='true'] {
      ${baseVisuallyHiddenStyle};
    }
  }

  & > *:first-child {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
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
