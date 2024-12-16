import styled from '../../styles/styled-components';

/**
 * Все доступные переменные для кастомизации стилей можно посмотреть здесь:
 * https://github.com/missive/emoji-mart/blob/main/packages/emoji-mart-website/example-custom-styles.html
 */

export const EmojiPickerWrapper = styled.div`
  em-emoji-picker {
    --font-family: inherit;
    --shadow: unset;
    --rgb-accent: ${p => p.theme.colors.brand};
    --color-border: rgba(0, 0, 0, 0);
  }
`;
