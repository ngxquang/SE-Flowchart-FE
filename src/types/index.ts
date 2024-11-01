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
import { NodeType } from '@/enums';

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
  onEnter?: (e: any) => void;
  autoFocus?: boolean;
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
};

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

export type PseudoEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export type PseudoEditorHandle = {
  focus: () => void;
  clearContent: () => void;
  addText: (text: string) => void;
};

export type ProfileType = {
  name: string;
  email: string;
  username: string;
  sex: string;
  phone: string;
  address: string;
};

export type FlowchartProps = {
  pseudo: string;
};

export type FlowchartDynamicHandle = {
  next: () => void;
  prev: () => void;
  stopRunAuto: () => void;
  startRunAuto: () => void;
  forwardToEnd: () => void;
  backwardToStart: () => void;
};

export type FlowchartDynamicProps = {
  pseudo: string;
  isRunAuto: boolean;
  setIsRunAuto: (value: boolean) => void;
};

export type ContentPair = {
  left: string;
  right: string;
  type: NodeType;
};

export type ValidType = 'success' | 'error' | 'default' | undefined;

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

export type HomeScreenItemsProps = {
  title: string;
  des: string;
  image: string;
};
