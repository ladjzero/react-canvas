export type LayoutContext = CanvasRenderingContext2D & { style?: React.CSSProperties }

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

export interface Renderable {
    layout: (
      ctx: LayoutContext,
      x: number,
      y: number,
      w?: number,
      h?: number
    ) => LayoutRect
    rect: LayoutRect
    props: Props
    children: Renderable[]
    render: (ctx: CanvasRenderingContext2D) => void
    appendChild: (r: Renderable) => void
    removeChild: (r: Renderable) => void
  }
