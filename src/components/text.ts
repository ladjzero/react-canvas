import { Node } from './node';

export default class TextElement extends Node {
  textContent: string | number;
  constructor(text: string | number) {
    super();
    this.textContent = text
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = '48px serif'
    ctx.fillText(String(this.textContent), 0, 50)
  }
}
