import { AnchorHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';
import { LiProps, SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';

export type MarkdownLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

export type MarkdownInputProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export type MarkdownLiProps = PropsWithChildren<LiProps>;

export type CustomComponentsProps =
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined;
