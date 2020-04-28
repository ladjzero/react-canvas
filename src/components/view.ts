import { Node, Props } from './node';

export default class View extends Node {
  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = '';

    if (this.props?.style?.backgroundColor) {
      ctx.fillStyle = this.props.style.backgroundColor;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    } else {
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    ctx.restore();

    this.children && this.children.forEach(c => {
      c.render(ctx);
    })
  }
}
