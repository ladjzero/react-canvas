import { Node } from './node';


export default class RootElement extends Node {
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    super()
    this.ctx = ctx
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  render() {
    // @ts-ignore
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.rect = this.layout(this.ctx);
    this.children.forEach(c => c.render(this.ctx))
  }
}
