import { ThemeProvider, ThemeConsumer } from 'styled-components';

import { MarkdownThemeConsumerType, MarkdownThemeProviderType } from './src/styles/types';

const MarkdownThemeProvider = ThemeProvider as MarkdownThemeProviderType;
const MarkdownThemeConsumer = ThemeConsumer as MarkdownThemeConsumerType;

export { Markdown, MarkdownProps } from './src/Markdown/Markdown';
export { MarkdownCombination } from './src/Markdown/MarkdownHelpers/MarkdownCombination';
export {
  markdownHelpItems,
  markdownHelpFiles,
  markdownHelpLists,
  markdownHelpOther,
} from './src/Markdown/MarkdownHelpItems';
export { MarkdownViewer } from './src/MarkdownViewer/MarkdownViewer';
export { MarkdownTheme } from './src/styles/theme';
export { MarkdownApi, RefItem, User, Token, HorizontalPaddings, ViewMode } from '././src/Markdown/types';
export { ThemeMode, ColorScheme } from './src/styles/types';
export { MarkdownThemeProvider, MarkdownThemeConsumer };
