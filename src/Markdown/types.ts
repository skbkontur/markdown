import { THEME_2022 } from '@skbkontur/react-ui';

import { MarkdownFormat } from './MarkdownFormat';

export enum ViewMode {
  Preview = 'Preview',
  Edit = 'Edit',
  Split = 'Split',
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

export type ReactUIThemeType = Partial<typeof THEME_2022>;

export type HideActionsOptions = Partial<
  Record<MarkdownFormat | 'heading' | 'emoji' | 'viewMode' | 'screenMode' | 'help' | 'allActions', boolean>
>;
