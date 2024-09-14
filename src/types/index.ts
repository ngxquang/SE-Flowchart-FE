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
