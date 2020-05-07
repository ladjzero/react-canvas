import { Node } from './node';

export default class FlexLayout extends Node {
  layout(x: number = 0, y: number = 0, w: number = this.props?.style?.width, h: number = this.props?.style?.height) {
    const flexDirection = this.props?.style?.flexDirection;
    const justifyContent = this.props?.style?.justifyContent;

    if (flexDirection === 'row') {
      let childrenWidthSum = 0;
      let xpointer = x;

      this.children.forEach(c => {
        const layoutRect = c.layout(x, y);
        childrenWidthSum += layoutRect.w;
        x += layoutRect.w;
      });

      if (justifyContent) {
        switch (justifyContent) {
          case 'space-between': {
            if (this.children.length > 1) {
              const space = (w - childrenWidthSum) / (this.children.length - 1);
              xpointer = x;
              this.children.forEach(c => {
                const layoutRect = c.layout(xpointer, y);
                xpointer += layoutRect.w + space;
              });
            }
          }
        }
      }
    } else {
      let childrenHeightSum = 0;
      let ypointer = y;

      this.children.forEach(c => {
        const layoutRect = c.layout(x, ypointer);
        childrenHeightSum += layoutRect.h;
        ypointer += layoutRect.h;
      });

      if (justifyContent) {
        switch (justifyContent) {
          case 'space-between': {
            if (this.children.length > 1) {
              const space = (h - childrenHeightSum) / (this.children.length - 1);
              ypointer = y;
              this.children.forEach(c => {
                const layoutRect = c.layout(x, ypointer);
                ypointer += layoutRect.h + space;
              });
            }
          }
        }
      }
    }
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    return { x, y, w, h };
  }


  render(ctx: CanvasRenderingContext2D) {
    this.layout();
    this.children && this.children.forEach(c => {
      c.render(ctx);
    })
  }
}
