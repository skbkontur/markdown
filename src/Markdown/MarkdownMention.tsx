import { Toast } from '@skbkontur/react-ui';
import { Menu } from '@skbkontur/react-ui/internal/Menu';
import { ZIndex } from '@skbkontur/react-ui/internal/ZIndex';
import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { MARKDOWN_RENDER_CONTAINER, INPUT_DEBOUNCE_TIME } from './constants';
import { getMarkdownMentionStyle, MentionMenuItem, UserDescriptions, UserWrapper, Avatar } from './Markdown.styled';
import { getAvatarUrl, useMenuKeyListener } from './MarkdownHelpers/markdownMentionHelpers';
import { User } from './types';

interface Props {
  getUsersApi: (value: string) => Promise<User[]>;
  onSelectUser: (login: string, name: string) => void;
  value: string;
  x: number;
  y: number;
}

export const MarkdownMention: FC<Props> = ({ value, onSelectUser, x, y, getUsersApi }) => {
  const [users, setUsers] = useState<User[]>();

  const menuRef = useRef<Menu>(null);
  const markdownMentionsRef = useRef(document.getElementById(MARKDOWN_RENDER_CONTAINER));
  const timerRef = useRef<number>(INPUT_DEBOUNCE_TIME);
  const usersLength = users?.length ?? 0;

  if (!markdownMentionsRef.current) {
    const container = document.createElement('div');
    container.id = MARKDOWN_RENDER_CONTAINER;
    document.body.appendChild(container);
    markdownMentionsRef.current = container;
  }

  useEffect(() => {
    window.clearTimeout(timerRef.current);

    try {
      const load = async () => {
        const result = await getUsersApi(value);

        result && setUsers(result);
      };

      timerRef.current = window.setTimeout(() => void load(), INPUT_DEBOUNCE_TIME);
    } catch (e) {
      Toast.push('Ошибка в получении списка пользователей');
    }
  }, [getUsersApi, value]);

  useMenuKeyListener(handleSelectUser, menuRef);

  if (!usersLength) return null;

  return createPortal(
    <ZIndex priority="Toast" style={getMarkdownMentionStyle(x, y)}>
      <Menu ref={menuRef} preventWindowScroll hasShadow initialSelectedItemIndex={0} maxHeight={300} width={320}>
        {users?.map((user, idx) => (
          <MentionMenuItem key={user.id} id={`${idx}`} onClick={() => handleSelectUser(idx)}>
            <UserWrapper>
              <Avatar height={48} width={48} src={getAvatarUrl(user.sid)} />
              <div>
                <div>{user.name}</div>
                <UserDescriptions>{user?.teams.map(t => t.caption).join(', ')}</UserDescriptions>
              </div>
            </UserWrapper>
          </MentionMenuItem>
        ))}
      </Menu>
    </ZIndex>,
    markdownMentionsRef.current as HTMLElement,
  );

  function handleSelectUser(idx: number) {
    if (users) {
      const selectedUser = users[idx];

      if (selectedUser) {
        const { login, name } = selectedUser;
        onSelectUser(login, name);
      }
    }
  }
};
