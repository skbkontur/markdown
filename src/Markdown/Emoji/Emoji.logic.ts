import { Textarea } from '@skbkontur/react-ui';

import { setMarkdownPastedHtml } from '../MarkdownHelpers/markdownHelpers';
import { Nullable } from '../types';

/** FIXME: разобраться как достать тип EmojiData из либы emoji-mart */
export interface IEmojiData {
  emoticons: string[];
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}

export const useEmojiLogic = (textarea?: Nullable<Textarea>) => {
  const onSelectEmoji = (emoji: IEmojiData) => {
    const textareaNode = (textarea as any).node as HTMLTextAreaElement;

    return setMarkdownPastedHtml(emoji.native, textareaNode);
  };

  return {
    onSelectEmoji,
  };
};
