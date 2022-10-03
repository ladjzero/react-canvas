import { LayoutContext, LayoutRect, Renderable } from "./types"

export class Node implements Renderable {
  rect: LayoutRect
  type: string
  children: Node[]
  props: any

  constructor(props?: any) {
    this.props = props
    this.children = []
  }

  appendChild(el: Node) {
    this.children.push(el);
  }

  removeChild(el: Node) {
    this.children = this.children.filter(c => c !== el);
  }

  layout(
    ctx: LayoutContext,
    x: number = 0,
    y: number = 0,
    w: number = this.props?.style?.width,
    h: number = this.props?.style?.height,
  ) {
    const styleBefore = ctx.style;
    const styleAfter = {...ctx.style, ...this.props?.style };
    ctx.style = styleAfter;

    this.children.forEach(c => {
      let childY = y;
      const layoutRect = c.layout(ctx, x, childY, w, h);
      childY += layoutRect.h;
      if (typeof w === 'undefined') w = (w || 0) + layoutRect.w
      if (typeof h === 'undefined') h = (h || 0) + layoutRect.h
    });

    ctx.style = styleBefore;

    return this.rect = { x, y, w, h };
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.rect.x , this.rect.y, this.rect.w, this.rect.h);
    ctx.clip();
    this.children.forEach(c => c.render(ctx));
  }
}
