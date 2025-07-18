import { Button, MenuItem, THEME_2022, ThemeFactory } from '@skbkontur/react-ui';
import { CSSProperties } from 'react';

import { FULLSCREEN_HEIGHT } from './constants';
import { HorizontalPaddings, Nullable, ReactUIThemeType, ViewMode } from './types';
import styled, { css } from '../styles/styled-components';
import { MarkdownTheme } from '../styles/theme';

interface PanelProps extends HorizontalPaddings {
  theme: MarkdownTheme;
}

type MutableTheme = { -readonly [K in keyof ReactUIThemeType]?: ReactUIThemeType[K] };

type KeyOfReactUITheme = keyof ReactUIThemeType;

type WrapperBaseProps = { width?: Nullable<number | string> } & HorizontalPaddings;

const panelStyle = ({ panelPadding, theme }: PanelProps) => css`
  padding: 6px ${panelPadding ?? 0}px;
  background-color: ${theme.colors.panelBg};
  margin-bottom: 12px;
`;

function getAllowedCssValue(value: CSSProperties['width'] | CSSProperties['padding']) {
  return typeof value === 'number' ? value + 'px' : value;
}

function getMarkdownActionsPadding(isPadding: boolean, padding?: string | number) {
  return isPadding ? getAllowedCssValue(padding) : 0;
}

export const Wrapper = styled.div`
  position: relative;

  &:focus-visible {
    outline: 1px solid ${p => p.theme.colors.brand};
  }
`;

const scrollbarStyle = css`
  height: ${FULLSCREEN_HEIGHT};
  overflow-y: auto;
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const SplitViewMaxWidth = styled.div`
  max-width: 1580px;
  width: 100%;
`;

export const SplitViewContainer = styled.div`
  display: flex;
  gap: 32px;

  @media (width >= 1980px) {
    gap: 48px;
  }
`;

export const SplitViewPreviewContainer = styled.div<{
  textareaWidth?: React.CSSProperties['width'];
}>`
  ${scrollbarStyle};

  width: ${p => (p.textareaWidth ? getAllowedCssValue(p.textareaWidth) : undefined)};
  ${p => !p.textareaWidth && 'flex: 1 0 0'};
`;

export const SplitViewEditContainer = styled.div`
  width: 100%;
  min-width: 420px;
  flex: 1 0 0;
`;

export const Avatar = styled.img.attrs({ alt: '' })`
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.colors.grayDefault};
  border-radius: 50%;
  object-fit: cover;
`;

export const UserWrapper = styled.div`
  width: 244px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DroppablePlaceholder = styled.div<HorizontalPaddings>`
  position: absolute;
  top: ${p => (p.panelPadding || p.fullscreenPadding ? 0 : -8)}px;
  left: ${p => (p.panelPadding || p.fullscreenPadding ? 0 : -8)}px;
  width: 100%;
  height: 100%;
  padding: ${p => (p.panelPadding || p.fullscreenPadding ? 0 : 8)}px;
  border-radius: 8px;
  z-index: 100;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
    rgba(255, 255, 255, ${p => (p.theme.themeMode === 'dark' ? 0.1 : 0.7)});
  background-image: ${p => p.theme?.droppablePlaceholderBgImage ?? ''};
`;

export const MentionWrapper = styled.div``;

export const MarkdownPreview = styled.div<WrapperBaseProps & { viewMode: ViewMode }>`
  padding: 6px
    ${({ panelPadding, fullscreenPadding, viewMode }) => {
      if (viewMode === ViewMode.Split) return 0;

      return fullscreenPadding ?? panelPadding ?? 8;
    }}px;
  ${p => p.width && `width: ${getAllowedCssValue(p.width)};`}
  box-sizing: border-box;
`;

export const MarkdownActionsWrapper = styled.div<WrapperBaseProps & { fullscreen?: boolean }>`
  padding: ${p => getMarkdownActionsPadding(!!p.fullscreenPadding, '16px')}
    ${p => getMarkdownActionsPadding(!!p.fullscreenPadding, p.fullscreenPadding)} 0;
  margin-bottom: ${p => (p.fullscreen ? 12 : 4)}px;
  box-sizing: border-box;
  ${p => p.width && `width: ${getAllowedCssValue(p.width)};`}
  ${({ theme, panelPadding, fullscreen }) => {
    if (panelPadding && !fullscreen) return panelStyle({ theme, panelPadding });
  }}
  
  a {
    border: none !important;
    text-decoration: none !important;
  }
`;

export const ButtonsWrapper = styled.div<{ fullscreen?: boolean }>`
  display: flex;
  justify-content: space-between;
  border-bottom: ${p => (p.fullscreen ? `1px solid ${p.theme.colors.grayDefault}` : 'none')};
`;

export const ActionsRightWrapper = styled.div`
  display: flex;
`;

export const ActionsLeftWrapper = styled(ActionsRightWrapper)`
  flex-wrap: wrap;
`;

export const MarkdownButtonWrapper = styled(Button)`
  button {
    padding: 4px;
    border: none;
    box-sizing: border-box;
  }
`;

export const MarkdownButtonIcon = styled.div`
  height: 24px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MarkdownDropdown = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 1px;

  button {
    font-size: ${p => p.theme.elementsFontSize};
  }
`;

export const MarkdownSymbolWrapper = styled.span`
  color: ${p => p.theme.colors.brand};
  font-weight: 700;
`;

export const MarkdownMenuItem = styled(MenuItem)`
  padding-left: 8px;
  padding-right: 8px;
  color: ${p => p.theme.colors.grayDefault};
`;

export const MarkdownEditorBlock = styled.div`
  position: relative;
`;

export const getMarkdownMentionStyle = (x: number, y: number): CSSProperties => ({
  position: 'absolute',
  top: y,
  left: x,
});

export const UserDescriptions = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  margin-top: 4px;
`;

export const MentionMenuItem = styled(MenuItem)`
  padding: 4px 28px;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const EmptyPreviewContainer = styled.div`
  display: flex;
  width: 407px;
  flex-direction: column;
`;

export const EmptyPreviewText = styled.span`
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: #d6d6d6;
`;

export const EmptyPreviewIconWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;
`;

const extendThemeConfigWithSized = (config: MutableTheme): ReactUIThemeType => {
  const finalConfig: MutableTheme = {};
  const configKeys = Object.keys(config) as KeyOfReactUITheme[];

  configKeys.forEach(key => {
    if (key !== 'prototype') {
      finalConfig[`${key}Small` as KeyOfReactUITheme] = config[key];
      finalConfig[`${key}Medium` as KeyOfReactUITheme] = config[key];
      finalConfig[`${key}Large` as KeyOfReactUITheme] = config[key];
    }
  });

  return finalConfig;
};

const borderlessTextareaVariables: Partial<typeof THEME_2022> = {
  textareaBorderColor: 'transparent',
  textareaBorderColorFocus: 'transparent',
  textareaBorderTopColor: 'transparent',
  textareaBorderColorHover: 'transparent',
  textareaShadow: 'none',
};

export const getMarkdownReactUiTheme = (
  theme: MarkdownTheme,
  viewMode: ViewMode,
  reactUiTheme?: typeof THEME_2022,
  panelHorizontalPadding?: number,
  fullScreenTextareaPadding?: number,
  borderless?: boolean,
  isFullscreen?: boolean,
) => {
  const { elementsFontSize, elementsLineHeight, themeMode, colors } = theme;
  const isSplitMode = viewMode === ViewMode.Split;
  const sidePagePaddingX = isSplitMode ? '56px' : '0';
  const isFullscreenNotSplitMode = isFullscreen && !isSplitMode;

  return ThemeFactory.create(
    {
      ...extendThemeConfigWithSized({
        tabFontSize: elementsFontSize,
        tabPaddingY: '0',
        tabPaddingX: '6px',
        tabLineHeight: elementsLineHeight,
        checkboxPaddingY: '0',
        checkboxBoxSize: elementsFontSize,
        menuItemFontSize: elementsFontSize,
        menuItemPaddingY: '4px',
        menuItemPaddingX: '28px',
      }),
      dropdownPaddingXSmall: '4px',
      dropdownPaddingYSmall: '4px',
      tabColorHover: 'transparent',
      tabColorFocus: 'transparent',
      tabBorderWidth: '0',
      selectBorderWidth: '0',
      btnDefaultBg: 'transparent',
      btnDefaultActiveBorderColor: 'transparent',
      btnDisabledBg: 'transparent',
      btnDisabledBorderColor: 'transparent',
      btnDisabledTextColor: colors.disabledButton,
      btnDefaultHoverBg: themeMode === 'light' ? reactUiTheme?.btnDefaultHoverBg : reactUiTheme?.btnDisabledBg,
      btnFontSizeSmall: elementsFontSize,
      checkboxBg: 'transparent',
      checkboxHoverBg: 'transparent',
      checkboxCheckedBg: 'transparent',
      checkboxShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxShadowHover: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedHoverShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedActiveShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxShadowActive: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedColor: colors.grayDefault,
      hintFontSize: elementsFontSize,
      hintColor: colors.textInverse,
      selectPaddingXSmall: '8px',
      selectLineHeightSmall: '24px',
      dropdownBorderWidth: '0',
      ...(panelHorizontalPadding &&
        !isSplitMode &&
        (extendThemeConfigWithSized({
          textareaPaddingX: `${panelHorizontalPadding}px`,
        }) as ReactUIThemeType)),
      ...((borderless || (isFullscreen && viewMode === ViewMode.Edit)) && borderlessTextareaVariables),
      ...(isFullscreen &&
        ({
          sidePagePaddingLeft: sidePagePaddingX,
          sidePagePaddingRight: sidePagePaddingX,
          textareaBorderColorError: 'transparent',
          textareaBorderColorWarning: 'transparent',
          textareaShadow: 'none',
          ...extendThemeConfigWithSized({
            textareaMinHeight: FULLSCREEN_HEIGHT,
            ...(isFullscreenNotSplitMode && {
              textareaPaddingX: `${fullScreenTextareaPadding}px`,
              textareaPaddingY: '0',
            }),
          }),
        } as ReactUIThemeType)),
    },
    reactUiTheme,
  );
};
