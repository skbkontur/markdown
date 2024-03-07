import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import { MarkdownTheme } from './theme';

const {
  default: styled,
  css,
  ThemeProvider,
  createGlobalStyle,
  useTheme,
} = (styledComponents as unknown) as ThemedStyledComponentsModule<MarkdownTheme>;

export { css, ThemeProvider, useTheme, createGlobalStyle };
export default styled;
