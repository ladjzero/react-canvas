declare namespace JSX {
  interface IntrinsicElements {
    "flex": {
      style: React.CSSProperties
      children?: Element | Element[]
    }
    "view": {
      style: React.CSSProperties
      children?: Element | Element[] | string
    }
  }
}
