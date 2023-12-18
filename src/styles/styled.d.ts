import 'styled-components';
import { MarkdownTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends MarkdownTheme {}
}
