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
  onUserSelect: (login: string, name: string) => void;
  value: string;
  x: number;
  y: number;
}

export const MarkdownMention: FC<Props> = ({ value, onUserSelect, x, y, getUsersApi }) => {
  const [users, setUsers] = useState<User[]>();

  const menuRef = useRef<Menu>(null);
  const markdownMentionsRef = useRef(document.getElementById(MARKDOWN_RENDER_CONTAINER));
  const timerRef = useRef<number>(INPUT_DEBOUNCE_TIME);

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

  useMenuKeyListener(onUserSelect, users, menuRef);

  if (!users?.length) return null;

  return createPortal(
    <ZIndex priority="Toast" style={getMarkdownMentionStyle(x, y)}>
      <Menu ref={menuRef} preventWindowScroll hasShadow maxHeight={300} width={320}>
        {users?.map(user => (
          <MentionMenuItem key={user.id} onClick={() => onUserSelect(user?.login ?? '', user.name)}>
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
};
