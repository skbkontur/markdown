import React, { ReactNode } from 'react';

import { Table, TableWrapper } from '../MarkdownViewer.styles';

interface Props {
  children: ReactNode;
}

export const MarkdownTable = ({ children }: Props) => {
  return (
    <TableWrapper>
      <Table>{children}</Table>
    </TableWrapper>
  );
};
