import React from 'react';

import { EmptyPreviewArrow } from '../../MarkdownIcons/EmptyPrviewArrow';
import { EmptyPreviewContainer, EmptyPreviewIconWrapper, EmptyPreviewText } from '../Markdown.styled';

export const EmptyPreview = () => {
  return (
    <EmptyPreviewContainer>
      <EmptyPreviewText>Начни вводить текст в редакторе </EmptyPreviewText>
      <EmptyPreviewIconWrapper>
        <EmptyPreviewArrow />
      </EmptyPreviewIconWrapper>
      <EmptyPreviewText>и увидишь его превью здесь</EmptyPreviewText>
    </EmptyPreviewContainer>
  );
};
