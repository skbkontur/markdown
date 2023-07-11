## Редактор и вьювер Markdown

#### Компоненты

- Markdown - редактор
- MarkdownViewer - вьювер MD текста

Компоненты работают на основе библиотеки [react-ui](https://tech.skbkontur.ru/react-ui/).

В `peerDependencies` указана совместимая версия пакета `@skbkontur/react-ui`.

Тема `Textarea` берется из ThemeContext из react-ui.
Стилизация `Markdown` через `MarkdownThemeProvider`.

### [Примеры использования](https://stackblitz.com/edit/skbkontur-markdown?file=src%2FApp.tsx)

### Markdown
#### Props

| prop                    | type                         | default | description |
|-------------------------|------------------------------|-------|-----------------------------------------------------|
| api?                    | MarkdownApi                  | undefined | Методы апи для загрузки/скачивания файлов и меншена |
| fileApiUrl?             | string                       | undefined | Url апи для файлов |
| profileUrl?             | string                       | undefined | Url для профиля сотрудника |
| hideMarkdownActions?    | boolean                      | undefined | Скрыть панель действий (кнопки помощи форматирования текста) |
| markdownViewer?         | (value: string) => ReactNode | undefined | Превьювер мардауна, по умолчанию используется MarkdownViewer |
| panelHorizontalPadding? | number                      | undefined | Padding markdownActions (кнопки помощи форматирования текста), включает режим panel |
| renderFilesValidation?  | (horizontalPadding: HorizontalPaddings, onReset: () => void) => ReactNode                      | undefined | Render валидации файла, если она нужна, максимальный размер файла = 10mb |

#### MarkdownApi

| prop             | type                         | default   | description |
|------------------|------------------------------|-----------|-----------------------------------------------------|
| fileDownloadApi? |(id: string) => Promise<File>| undefined |Метод для загрузки файла|
| fileUploadApi?   |(file: File) => Promise<RefItem>| undefined |Метод для скачивания файла|
| getUsersApi?     |(query: string) => Promise<User[]>| undefined |Метод для получения списка пользователей|

#### HorizontalPaddings

| prop               | type                               | default   |
|--------------------|------------------------------------|-----------|
| fullscreenPadding? | number | undefined |
| panelPadding?      | nmber | undefined |

#### MarkdownTheme

| prop | type                        | description                                                                                                        |
| ---- |-----------------------------|--------------------------------------------------------------------------------------------------------------------|
| colors |ColorScheme | Цветовая схема                                                                                                     |
| elementsFontSize |string| font-size переменных темы react-ui: tabFontSize, btnFontSizeSmall, hintFontSize, checkboxBoxSize, menuItemFontSize |
| elementsLineHeight |string| line-height переменных темы react-ui: tabLineHeight                                                                |
| themeMode |string| Темный/светлый режим темы                                                                                          |
| droppablePlaceholderBgImage |string| Значение background-image для DroppablePlaceholder, если нужна пунктирная обводка в состоянии onDrag               |
| reactUiTheme |string| Тема react-ui                                                                                                      |

#### ColorScheme

| prop           | type   | description                                                            |
|----------------|--------|------------------------------------------------------------------------|
| brand          | string | Цвет сервиса                                                           |
| disabledButton | string | Цвет текста кнопки для переменной btnDisabledTextColor                 |
| grayDefault    | string | Основной серый цвет, используется в кнопках, чекбоксах, иконках и т.д. |
| link           | string | Цвет ссылок                                                            |
| panelBg        | string | Цвет панели, в режиме panel                                            |
| white          | string | Белый цвет                                                             |
