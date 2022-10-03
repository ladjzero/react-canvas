import { Node } from './node';

export default class View extends Node {
  render(ctx: CanvasRenderingContext2D) {
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = '';

    if (this.props?.style?.backgroundColor) {
      ctx.fillStyle = this.props.style.backgroundColor;
      ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    } else {
      ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    }

    ctx.restore();

    this.children && this.children.forEach(c => {
      c.render(ctx);
    })
  }
}
