import { Menu } from '@skbkontur/react-ui/internal/Menu';
import { ChangeEvent, MouseEvent, RefObject, SyntheticEvent, useEffect } from 'react';

import { EMPTY_AVATAR, MENU_ITEM_HOVERED_STATE_DATA_ATTRIBUTE } from './constants';
import { getTextareaTokens } from './markdownTextareaHelpers';
import { Token } from '../types';

const ArrowsVertical: string[] = ['ArrowUp', 'ArrowDown'];

export function mentionActions(
  event:
    | ChangeEvent<HTMLTextAreaElement>
    | MouseEvent<HTMLTextAreaElement>
    | SyntheticEvent<HTMLTextAreaElement, Event>,
  setToken: (token?: Token) => void,
) {
  const { value, selectionStart } = event.currentTarget;

  const tokens = getTextareaTokens(value as string);

  const mention = tokens.find(
    t => selectionStart >= t.positions[0] && selectionStart <= t.positions[1] && t.value.startsWith('@'),
  );

  if (mention) {
    setToken(mention);
  } else {
    setToken(undefined);
  }
}

export const useMenuKeyListener = (onSelectUser: (idx: number) => void, menuRef?: RefObject<Menu>) => {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (menuRef?.current) {
        if (ArrowsVertical.includes(event.key)) {
          if (event.key === 'ArrowUp') {
            menuRef.current.up();
          }
          if (event.key === 'ArrowDown') {
            menuRef.current.down();
          }
        }

        if (event.key === 'Enter') {
          const hoveredElement = document.querySelector(MENU_ITEM_HOVERED_STATE_DATA_ATTRIBUTE);
          if (hoveredElement) {
            onSelectUser(Number(hoveredElement.id || 0));
          }
        }
      }
    };

    window.addEventListener('keydown', keyListener);

    return () => window.removeEventListener('keydown', keyListener);
  }, [menuRef, onSelectUser]);
};

export const getMentionValue = (mention?: Token | null) => mention?.value?.replace('@', '') ?? '';

export function getAvatarUrl(sid: undefined | null | string): string {
  if (!sid) return EMPTY_AVATAR;

  return `https://staff.skbkontur.ru/api/avatar/${sid}?size=s}`;
}
