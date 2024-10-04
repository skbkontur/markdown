import { TestCase, Token } from '../types';

export const MarkdownTextareaHelpersTestCases: TestCase<string, Token[]>[] = [
  { name: 'empty', values: '', expected: [] },
  {
    name: 'only new line',
    values: 'test\ntest',
    expected: [
      { value: 'test', positions: [0, 4] },
      { value: '\n', positions: [5, 5] },
      { value: 'test', positions: [6, 9] },
    ],
  },
  {
    name: 'with mention',
    values: 'test\ntest @Цып',
    expected: [
      { value: 'test', positions: [0, 4] },
      { value: '\n', positions: [5, 5] },
      { value: 'test', positions: [6, 9] },
      { value: ' ', positions: [10, 10] },
      { value: '@Цып', positions: [11, 14] },
    ],
  },
  {
    name: 'with mention and linked mention',
    values: 'test\ntest @Цып\n[Цыпилов Максим](@tsypilov_m) test',
    expected: [
      { value: 'test', positions: [0, 4] },
      { value: '\n', positions: [5, 5] },
      { value: 'test', positions: [6, 9] },
      { value: ' ', positions: [10, 10] },
      { value: '@Цып', positions: [11, 14] },
      { value: '\n', positions: [15, 15] },
      { value: '[Цыпилов Максим](@tsypilov_m)', positions: [16, 44] },
      { value: ' ', positions: [45, 45] },
      { value: 'test', positions: [46, 49] },
    ],
  },
];
