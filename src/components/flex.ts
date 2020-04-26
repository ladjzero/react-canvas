import { Node } from './node';

export default class FlexLayout extends Node {
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  render(ctx) {
    this.layout();
    this.children && this.children.forEach(c => {
      c.render(ctx);
    })
  }
}
