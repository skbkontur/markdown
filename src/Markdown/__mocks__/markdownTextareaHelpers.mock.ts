import { TestCase, Token } from '../types';

export const MarkdownTextareaHelpersTestCases: TestCase<string, Token[]>[] = [
  { name: 'empty', values: '', expected: [] },
  {
    name: 'only new line',
    values: 'test\ntest',
    expected: [
      { value: 'test', positions: [0, 4] },
      { value: '\n', positions: [5, 4] },
      { value: 'test', positions: [5, 8] },
    ],
  },
  {
    name: 'with mention',
    values: 'test\ntest @Цып',
    expected: [
      { value: 'test', positions: [0, 4] },
      { value: '\n', positions: [5, 4] },
      { value: 'test', positions: [5, 8] },
      { value: ' ', positions: [9, 9] },
      { value: '@Цып', positions: [10, 13] },
    ],
  },
  {
    name: 'with mention and linked mention',
    values: 'test\ntest @Цып\n[Цыпилов Максим](@tsypilov_m) test',
    expected: [
      { value: 'test', positions: [0, 4] },
      { value: '\n', positions: [5, 4] },
      { value: 'test', positions: [5, 8] },
      { value: ' ', positions: [9, 9] },
      { value: '@Цып', positions: [10, 13] },
      { value: '\n', positions: [14, 13] },
      { value: '[Цыпилов Максим](@tsypilov_m)', positions: [14, 42] },
      { value: ' ', positions: [43, 43] },
      { value: 'test', positions: [44, 47] },
    ],
  },
];
