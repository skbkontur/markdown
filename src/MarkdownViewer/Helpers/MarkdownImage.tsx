import React, { FC } from 'react';

import { ImgHref } from '../MarkdownViewer.styles';

interface Props {
  src: string;
}

export const MarkdownImage: FC<Props> = ({ src }) => {
  return (
    <ImgHref href={src} target="_blank" rel="noopener noreferrer">
      <img src={src} alt="" />
    </ImgHref>
  );
};
