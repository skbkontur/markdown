import React from 'react';

import { MarkdownLinkProps } from '../types';

export const MarkdownLink = ({ href, children, target }: MarkdownLinkProps) => (
  <a href={href} target={target ?? '_blank'} rel="noopener noreferrer">
    {children}
  </a>
);
