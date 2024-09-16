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

export type ListMucType = ListExerciseType[];

export type ChapterCardType = {
  id: number | string;
  title: string;
  content: string;
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
