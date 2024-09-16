import { classNames } from './../components/classNames';
import { ReactNode } from 'react';

export type InputProps = {
  title: string;
  valid?: 'default' | 'error' | 'success';
  placeholder?: string;
  value?: string;
  radioValues?: string[];
  readOnly?: boolean;
  onChange: (e: any) => void;
  required?: boolean;
  type?: string;
  suport?: string;
};

export type ButtonProps = {
  content?: string;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  iconLeft?: ReactNode | null;
  iconRight?: ReactNode | null;
  onClick?: () => void;
};

export type HeaderProps = {
  title?: string | string[];
};

export type ExerciseType = {
  title: string;
  href: string;
};

export type ListExerciseType = {
  titleChuong: string;
  Exercises: ExerciseType[];
};

export type Modal_taoBTProps = {
  onSubmit?: () => void;
};

export type ListMucType = ListExerciseType[];

export type ButtonPropsCusGV = {
  content?: string;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  iconLeft?: ReactNode | null;
  iconRight?: ReactNode | null;
  onClick?: () => void;
  index: number;
  isChoosed: boolean;
};

export type PaginationProps = {
  totalPages: number;
  page: number;
  limit: number;
  siblings: number;
  onPageChange: (page: number | string) => void;
}

export type ChapterCardType = {
  id: number | string;
  title: string;
  content: string;
  href: string;
};

export type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export type MarkdownEditorHandle = {
  focus: () => void;
  clearContent: () => void;
  addFormatting: (text: string) => void;
  addText: (text: string) => void;
};

export type ProfileType = {
  name: string;
  email: string;
  username: string;
  sex: string;
  phone: string;
  address: string;
}