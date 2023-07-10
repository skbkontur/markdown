### Редактор Markdown

Принимает все свойства Textarea

```jsx harmony
import { useState } from 'react';
import { Markdown } from './Markdown';

const [value, setValue] = useState('');

<>
  <Markdown value={value} onValueChange={setValue} />
</>;
```

#### Без кнопок

```jsx harmony
import { useState } from 'react';
import { Markdown } from './Markdown';

const [value, setValue] = useState('');

<>
  <Markdown hideMarkdownActions value={value} onValueChange={setValue} />
</>;
```

#### С панелью

```jsx harmony
import { useState } from 'react';
import { Markdown } from './Markdown';

const [value, setValue] = useState('');

<>
  <Markdown panelHorizontalPadding={20} value={value} onValueChange={setValue} />
</>;
```
