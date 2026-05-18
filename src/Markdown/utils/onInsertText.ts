export function onInsertText(value?: string) {
  document.execCommand('insertText', false, value);
}
