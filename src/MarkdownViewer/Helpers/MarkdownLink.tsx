import React from 'react';

import { Href } from '../MarkdownViewer.styles';
import { MarkdownLinkProps } from '../types';

export const MarkdownLink = ({ href, children, target }: MarkdownLinkProps) => (
  <Href href={href} target={target ?? '_blank'} rel="noopener noreferrer">
    {children}
  </Href>
);
