/// <reference path="../index.d.ts" />
import React from 'react';
import { requestNewContext } from './utils';
import ReactCanvas from '../reconciler';


export const singleLine = () => {
  const { context, canvas } = requestNewContext({ width: 400 });

  setTimeout(() => {
    ReactCanvas.render('hello, my name is chen', context);
  }, 0);

  return canvas;
}

export const styled = () => {
  const { context, canvas } = requestNewContext({ width: 400 });

  setTimeout(() => {
    ReactCanvas.render(
      <text style={{ color: 'red', fontSize: 24 }} >
        red 24px
      </text>
      , context
    );
  }, 0);

  return canvas;
}


export default { title: 'text' }