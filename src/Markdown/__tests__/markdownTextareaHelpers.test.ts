import { MarkdownTextareaHelpersTestCases } from '../__mocks__/markdownTextareaHelpers.mock';
import { getTextareaTokens } from '../MarkdownHelpers/markdownTextareaHelpers';

describe('MarkdownTextareaHelpers', () => {
  describe('getTextareaTokens', () => {
    MarkdownTextareaHelpersTestCases.forEach(({ name, values, expected }) => {
      it(name, () => expect(getTextareaTokens(values)).toStrictEqual(expected));
    });
  });
});
