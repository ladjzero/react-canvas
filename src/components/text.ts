import { Node } from './node';
import { TextStyle } from 'react-native';
import { LayoutContext } from './types';

export interface TextProps {
  style?: TextStyle,
  children: string | [string]
}

export default class TextElement extends Node {
  constructor(props: TextProps) {
    super();
    this.props = props;
  }

  layout(
    ctx: LayoutContext,
    x: number = 0,
    y: number = 0,
    w: number = 0,
    h: number = 0,
  ) {
    const fontBefore = ctx.font;
    const fontSize = this.props?.style?.fontSize || 12;
    ctx.font = `${fontSize}px serif`;
    const textMetrics = ctx.measureText(String(this.props.children));
    console.log('textMetrics', textMetrics, this.props.children)
    ctx.font = fontBefore;
    switch(ctx.style.textAlign) {
      case 'center':
        return this.rect =  {
          x: x + (w - textMetrics.width) / 2,
          y,
          w: textMetrics.width,
          h: textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent,
        };
      case 'right':
        return this.rect = { 
          x: x + w - textMetrics.width,
          y,
          w: textMetrics.width,
          h: textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent,
      };
      default:
        return this.rect = { x, y, w: textMetrics.width, h };
      }
  }

  render(ctx: CanvasRenderingContext2D) {
    const fontSize = this.props?.style?.fontSize || 12;
    const color = this.props?.style?.color || 'black';

    ctx.save();
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = color;
    ctx.fillText(String(this.props.children), this.rect.x, this.rect.y + fontSize);
    ctx.restore();
  }
}
