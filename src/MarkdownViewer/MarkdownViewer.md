### Вьювер Markdown

Позволяет отобразить MD-текст в HTML.

Для темизации нужно передать такую-же тему, как для Markdown.

```jsx harmony
import { useState } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { allVariantsMarkdownMock } from '../Markdown/__mocks__/markdown.mock.ts';

const [value, setValue] = useState('');

<>
  <MarkdownViewer source={allVariantsMarkdownMock} />
</>;
```
