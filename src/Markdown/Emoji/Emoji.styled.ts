import { getColor } from './helpers';
import styled from '../../styles/styled-components';

/**
 * Все доступные переменные для кастомизации стилей можно посмотреть здесь:
 * https://github.com/missive/emoji-mart/blob/main/packages/emoji-mart-website/example-custom-styles.html
 */

/* stylelint-disable function-name-case */
export const EmojiPickerWrapper = styled.div`
  em-emoji-picker {
    --font-family: inherit;
    --shadow: unset;
    --rgb-accent: ${({ theme }) => getColor(theme.colors.brand)};
    --color-border: ${({ theme }) => getColor(theme.colors.grayDefault)};
    --rgb-background: ${({ theme }) => getColor(theme.colors.emojiPickerBackgroundRGBColor)};
    --rgb-input: ${({ theme }) => getColor(theme.colors.emojiPickerBackgroundRGBColor)};
    --rgb-color: ${({ theme }) => getColor(theme.colors.text)};

    max-height: 300px;
    width: 100%;
  }
`;
