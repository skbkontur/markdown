import * as styledComponents from 'styled-components';

import { MarkdownTheme } from './theme';

const {
  default: styled,
  css,
  ThemeProvider: MarkdownThemeProvider,
  ThemeConsumer: MarkdownThemeConsumer,
} = styledComponents as unknown as styledComponents.ThemedStyledComponentsModule<MarkdownTheme>;

export { css, MarkdownThemeProvider, MarkdownThemeConsumer };
export default styled;
