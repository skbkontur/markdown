import { THEME_2022, THEME_2022_DARK } from '@skbkontur/react-ui';

export enum ViewMode {
  Preview = 'Preview',
  Edit = 'Edit',
}

export interface Token {
  positions: number[];
  value: string;
}

export interface HorizontalPaddings {
  fullscreenPadding?: number;
  panelPadding?: number;
}

export type Nullable<T> = T | null | undefined;

export interface RefItem {
  caption: string;
  id: string;
}

export type ReactUiTheme = typeof THEME_2022 | typeof THEME_2022_DARK;

export interface User {
  id: string;
  login: string;
  name: string;
  teams: RefItem[];
  sid?: string;
}

export interface MarkdownApi {
  /** Метод для загрузки файла */
  fileDownloadApi?: (id: string) => Promise<File>;
  /** Метод для скачивания файла */
  fileUploadApi?: (file: File) => Promise<RefItem>;
  /** Метод для получения списка пользователей */
  getUsersApi?: (query: string) => Promise<User[]>;
}

export interface TestCase<V, E> {
  expected: E;
  name: string;
  values: V;
}
