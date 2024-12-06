import styled from '../../styles/styled-components';

interface EmojiPickerWrapperProps {
  backgroundRgb?: string;
  borderRadius?: number;
  categoryIconSize?: string;
  colorBorder?: string;
  colorBorderOver?: string;
  fontFamily?: string;
  fontSize?: string;
  rgbAccent?: string;
  rgbBackground?: string;
  rgbColor?: string;
  rgbInput?: string;
  shadow?: string;
}

export const EmojiPickerWrapper = styled.div<EmojiPickerWrapperProps>`
  em-emoji-picker {
    --border-radius: ${({ borderRadius }) => borderRadius || 'unset'};
    --category-icon-size: ${({ categoryIconSize }) => categoryIconSize};
    --background-rgb: ${({ backgroundRgb }) => backgroundRgb || 'unset'};
    --color-border-over: ${({ colorBorderOver }) => colorBorderOver || 'unset'};
    --color-border: ${({ colorBorder }) => colorBorder || 'unset'};
    --font-family: 'Lab Grotesque', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans';
    --font-size: ${({ fontSize }) => fontSize};
    --rgb-accent: ${({ rgbAccent }) => rgbAccent || 'unset'};
    --rgb-background: ${({ rgbBackground }) => rgbBackground || 'unset'};
    --rgb-color: ${({ rgbColor }) => rgbColor || 'unset'};
    --rgb-input: ${({ rgbInput }) => rgbInput || 'unset'};
    --shadow: ${({ shadow }) => shadow || 'unset'};
  }
`;
