type RequestNewContextOption = {
  title?: string,
  width?: number,
  height?: number,
  root?: HTMLElement,
}

export function requestNewContext({ title = '', width = 200, height = 200, root = document.body }: RequestNewContextOption = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const wrapperEl = document.createElement('div');
  wrapperEl.className = 'wrapper';
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  wrapperEl.append(titleEl);
  wrapperEl.append(canvas);
  root.append(wrapperEl);
  return canvas.getContext('2d');
}