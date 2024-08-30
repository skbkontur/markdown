import React, { ReactNode } from 'react';

import { TableWrapper } from '../MarkdownViewer.styles';

interface Props {
  children: ReactNode;
}

export const MarkdownTable = ({ children }: Props) => {
  return <TableWrapper>{children}</TableWrapper>;
};
