import { AIMethod, MarkdownApi, RefItem, User } from '../types';

export const allVariantsMarkdownMock = `# Заголовок 1
## Заголовок 2
### Заголовок 3
#### Заголовок 4
##### Заголовок 5

**Жирный**
~~Зачеркнутый~~
[Максим из отдела test test test test test test test test test test test](@tsypilov_m)

---

1. Список
2. Список

* [ ] Не чек
* [x] Чек
* [ ] Не чек

* [x] чек
* [x] чек
* [ ] Не чек

* dfs
* ds

* level 1
  * level 2
    * [ ] level 3
    * level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3
    1. level 3
    * [x] level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3
    1. * [x] level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3 level 3
  1. level 2


![img](https://s.kontur.ru/common-v2/logos/logo-matrix-32.svg)
подпись картинки


\`const { bar } = foo\` подпись кода
> Цитата
линия
линия


\`\`\`const { bar } = foo\`\`\`
подпись блока кода

[text.txt test test test test test test test test test test test](/api/file/download/)

![img](https://s.kontur.ru/common-v2/logos/logo-matrix-32.svg)

| Заголовок | Заголовок | Заголовок | Заголовок | Заголовок | Заголовок |
| ------ | ------ | ------ | ------ | ------ | ------ |
| Ячейка | Ячейка | Ячейка | Ячейка | Ячейка | Ячейка |
| Ячейка | Ячейка | Ячейка | Ячейка | Ячейка | Ячейка |

$$L = \\frac{1}{2} \\rho v^2 S C_L$$
`;

export const emojiMarkdownMock = `😞😟🙁☹️😐🤨🙂😃😁😆😅😂🤣`;

const availableAIMethodsMock: AIMethod[] = [
  { method: 'correctSpelling', caption: 'Исправить ошибки' },
  { method: 'rewriteText', caption: 'Другими словами' },
];

export const apiMock: MarkdownApi = {
  fileDownloadApi: () => new Promise<File>(resolve => resolve(new File(['a'], 'test.txt'))),
  fileUploadApi: () => new Promise<RefItem>(resolve => resolve({ id: 'i', caption: 'test.txt' })),
  AIApi: {
    onSendMessage: () => new Promise<string>(resolve => resolve('Привет, как дела?')),
    availableMethods: availableAIMethodsMock,
  },
  getUsersApi: () =>
    new Promise<User[]>(resolve =>
      resolve([
        { id: '1', name: 'Максим', login: 'login', teams: [] },
        { id: '2', name: 'Максим2', login: 'login2', teams: [] },
        { id: '3', name: 'Максим3', login: 'login3', teams: [] },
        { id: '4', name: 'Максим4', login: 'login4', teams: [] },
        { id: '5', name: 'Максим5', login: 'login5', teams: [] },
        { id: '6', name: 'Максим6', login: 'login6', teams: [] },
        { id: '7', name: 'Максим7', login: 'login7', teams: [] },
        { id: '8', name: 'Максим8', login: 'login8', teams: [] },
        { id: '9', name: 'Максим9', login: 'login9', teams: [] },
      ]),
    ),
};
