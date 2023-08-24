export type TextAlign = 'left' | 'center' | 'right';

export interface RulesType {
  required?: boolean;
  type?: string;
  message?: string;
  min?: number;
  max?: number;
  validator?: Function;
}
