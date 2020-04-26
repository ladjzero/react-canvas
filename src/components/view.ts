import { Node } from './node';

export default class View extends Node {
  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    this.children && this.children.forEach(c => {
      c.render(ctx);
    })
  }
}
