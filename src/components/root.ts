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
    this.rect = this.layout(this.ctx);
    this.children.forEach(c => c.render(this.ctx))
  }
}
