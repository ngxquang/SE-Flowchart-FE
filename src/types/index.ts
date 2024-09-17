import { classNames } from './../components/classNames';
import { ReactNode } from 'react';
import {
  FlowNode,
  StartNode,
  EndNode,
  InputNode,
  OutputNode,
  ProcessNode,
  WhileNode,
  ConditionNode,
  TempNode
} from './FlowNode';
import { FlowchartConfigurer } from './FlowchartConfigurer';
import { FlowchartPositions } from './FlowchartPositions';
import { Flowchart } from './Flowchart';

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

export type FlowchartProps = {
  pseudo: string;
};

export interface IFlowchartConfig {
  rectangleWidth: number;
  rectangleHeight: number;
  arrowWidth: number;
  arrowHeight: number;
  lineWidth: number;
  lineHeight: number;
  circleRadius: number;
  fontFamily: string;
  fontColor: string;
}

export interface IFlowchartPosition {
  id: string;
  title: string;
}

export {
  FlowNode,
  StartNode,
  EndNode,
  InputNode,
  OutputNode,
  ProcessNode,
  WhileNode,
  ConditionNode,
  TempNode
};

export { FlowchartConfigurer, FlowchartPositions, Flowchart };
