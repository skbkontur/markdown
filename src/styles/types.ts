import { Consumer, PropsWithChildren } from 'react';

import { MarkdownTheme } from './theme';

export interface ColorScheme {
  brand: string;
  disabledButton: string;
  grayDefault: string;
  link: string;
  panelBg: string;
  white: string;
}

export type ThemeMode = 'dark' | 'light';

export type MarkdownThemeProviderType = ({
  children,
  theme,
}: PropsWithChildren<{ theme: MarkdownTheme }>) => JSX.Element | null;

export type MarkdownThemeConsumerType = Consumer<MarkdownTheme | undefined>;
