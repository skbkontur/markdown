import { ReactNode, SyntheticEvent } from 'react';

export interface MarkdownButtonProps {
  hintText: ReactNode;
  icon: ReactNode;
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  showShortKey?: boolean;
}
