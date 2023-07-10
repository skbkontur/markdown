import { Menu } from '@skbkontur/react-ui/internal/Menu';
import { ChangeEvent, MouseEvent, RefObject, SyntheticEvent, useEffect } from 'react';

import { getTextareaTokens } from './markdownTextareaHelpers';
import { Token, User } from '../types';

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

export const useMenuKeyListener = (
  onUserSelect: (login: string, name: string) => void,
  users?: User[],
  menuRef?: RefObject<Menu>,
) => {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (menuRef?.current) {
        if (ArrowsVertical.includes(event.key)) {
          event.preventDefault();
          if (event.key === 'ArrowUp') menuRef.current.up();
          if (event.key === 'ArrowDown') menuRef.current.down();
        }

        if (event.key === 'Enter' && users?.length) {
          event.preventDefault();
          const selected = users[menuRef.current.state.highlightedIndex];
          onUserSelect(selected.login ?? '', selected.name);
        }
      }
    };

    window.addEventListener('keydown', keyListener);

    return () => window.removeEventListener('keydown', keyListener);
  }, [menuRef, onUserSelect, users]);
};

export const getMentionValue = (mention?: Token | null) => mention?.value?.replace('@', '') ?? '';

export function getAvatarUrl(sid: undefined | null | string): string {
  if (!sid) {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANTSURBVFhH7Zg/aBNRHMebXEv+CFKxSusgBAcXRdDJWnA4qAVdRMzgIogScCldmj8dQighoRgh/hnataCSSXRyCA7BQS0OdVGHgrGCOqQiUmNiEr+v960Ycum9dy9m8gPH789d775573fv/a4D/9HEQ6tFLpcL1Gq1Cx6Px9dsNj/CvonFYu9hW7zENdoCk8mk1+/3ZyBmlqktWq3WOkwB+TzElq2sOq4Ezs/PHzIMY9br9U5CyBhEDCHttc52UMU1sXg8nmeshEErTTabnYCwEo5xhMMQNwi70w8dxDVTpmkaxWLxKXPSKI1gPp/3bW5uvsMDDzIlDUaxhR9lRqNRJZHdpsWWarV6xo04Af7OgxcoxVAaJYF4wEm6bplYWFgYpS+FkkAwRusKMYqNRuMEQymUBKKG6Gmxl1YK1SneoKvDD1oppAVieREvxx4r0mIUi/tu+o6ojOAKSugyfdfgHrcCgcBdho5ICSwUCmJB32dF+ojdh64jUgLD4XADN/3GUBuMYoWuI9JTjJu+oNsLpO+lIvA2jHb7BDawFi7Td0RaIPbQR1hmpjDVaaaUECWC4zrEjc/NzX1m2hHldmtxcXGoUqmsY0T3MyUFxN1Hy3WJoTTSI7hNJBKpw6j2dk3sQjfpK6EsUBAMBnMwL63IGYzeDZTICkMlXAmcnp7+iVo6iwe/ZaoruOYe2rQ4Q2W0vknE9gcBr1GP3bau0tramrm0tCTKwhWuRnAb8TEEcV8Y2rGqI06gJZD8orVjp3NSaAlkd9y1v8P0H0bnIj6qXOOqBkW7hI7kKtwEDqcGdBVlkAyFQo/Fns6cNNICIWoEy4uJUTmH4zweuounpMDfiA/5Bzie4D4lsRJsnXBgR4GizcJbeBHuNTzgNEQpf0d34TuOh9g67yQSiedWyp6uAjOZzDGYZYg6amX+DfjhBb/fH5mZmfnKVBu2AtPp9BHDMJ7BlW7NdYDIV1jMT6VSqSpTf7B9i7Fvio6lL+IEmKXjPp/vCsM2OgSyvTetqH9gUCbpttEhsFwuH1B9Q3uEba13CKzX6yN0+wrqcJhuG3Y1qPTl30NqtG10CEQtBOn2FZSV7Zdeh0Asnq62vx7wibYNuynuxf9flEENfqD7FwMDvwH9BxCkLLaB+AAAAABJRU5ErkJggg==';
  }

  return `https://staff.skbkontur.ru/api/avatar/${sid}?size=s}`;
}
