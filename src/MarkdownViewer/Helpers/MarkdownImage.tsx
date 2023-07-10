import React, { FC } from 'react';

interface Props {
  src: string;
}

export const MarkdownImage: FC<Props> = ({ src }) => {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <img src={src} alt="" />
    </a>
  );
};
