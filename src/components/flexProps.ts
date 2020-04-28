import { Style, Props } from './node';

export type FlexLayoutStyle = Style & { flexDirection?: 'row' | 'column' }

export interface FlexLayoutProps extends Props {
  style: FlexLayoutStyle
}