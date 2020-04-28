export interface LayoutRect {
  x: number
  y: number
  w: number
  h: number
}

export interface Style {
  width?: number
  height?: number
  backgroundColor?: string
}

export interface Props {
  style?: Style
  children: Node[] | string
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

  layout(x: number = 0, y: number = 0, w: number = this.props?.style?.width || 0, h: number = this.props?.style?.height || 0) {
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
    ctx.save();
  }
}
