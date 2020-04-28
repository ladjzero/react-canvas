import { Node } from './node';
import { TextStyle } from 'react-native';

export interface TextProps {
  style?: TextStyle,
  children: string | [string]
}

export default class TextElement extends Node {
  constructor(props: TextProps) {
    super();
    this.props = props;
  }

  render(ctx: CanvasRenderingContext2D) {
    const fontSize = this.props?.style?.fontSize || 12;
    const color = this.props?.style?.color || 'black';

    ctx.save();
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = color;
    ctx.fillText(String(this.props.children), this.x, this.y + fontSize);
    ctx.restore();
  }
}
