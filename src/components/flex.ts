import { Node } from './node';
import { FlexLayoutProps } from './flexProps';

export default class FlexLayout extends Node {
  props: FlexLayoutProps

  layout(x: number = 0, y: number = 0, w: number = this.props?.style?.width, h: number = this.props?.style?.height) {
    const flexDirection = this.props?.style?.flexDirection;

    if (flexDirection === 'row') {
      this.children.forEach(c => {
        const layoutRect = c.layout(x, y);
        x += layoutRect.w;
      });
    } else {
      this.children.forEach(c => {
        const layoutRect = c.layout(x, y);
        y += layoutRect.h;
      });
    }
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    return { x, y, w, h };
  }


  render(ctx: CanvasRenderingContext2D) {
    this.layout();
    this.children && this.children.forEach(c => {
      c.render(ctx);
    })
  }
}
