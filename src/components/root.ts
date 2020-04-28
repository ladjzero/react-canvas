import { Node, Props } from './node';


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
    this.layout();
    this.children.forEach(c => c.render(this.ctx))
  }
}
