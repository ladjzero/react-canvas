type RequestNewContextOption = {
  title?: string,
  width?: number,
  height?: number,
  root?: HTMLElement,
}

export function requestNewContext({ width = 200, height = 200 }: RequestNewContextOption = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return { context: canvas.getContext('2d'), canvas };
}