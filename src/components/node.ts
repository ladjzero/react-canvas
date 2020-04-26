export interface LayoutRect {
  x: number
  y: number
  w: number
  h: number
}

export type Style = {
  width: number
  height: number
}

export interface Props {
  style?: Style
}

export interface Renderable extends LayoutRect {
  layout: (x: number, y: number, w: number, h: number) => { x: number, y: number, w: number, h: number }
  props: Props
  children: Renderable[]
  render: (ctx: CanvasRenderingContext2D) => void
  appendChild: (r: Renderable) => void
  removeChild: (r: Renderable) => void
}

export class Node implements Renderable {
  x: number
  y: number
  w: number
  h: number
  type: string
  children: Node[]
  props: Props

  constructor(props?: Props) {
    this.props = props
    this.children = []
  }

  appendChild(el: Node) {
    this.children.push(el);
  }

  removeChild(el: Node) {
    this.children = this.children.filter(c => c !== el);
  }

  layout(x: number = 0, y: number = 0, w: number = this.props?.style?.width, h: number = this.props?.style?.height) {
    this.children.forEach(c => {
      const layoutRect = c.layout(x, y);
      y += layoutRect.h;
    });
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    return { x, y, w, h };
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x , this.y, this.w, this.h);
    ctx.clip();
    this.children.forEach(c => c.render(ctx));
  }
}
