/// <reference path="../index.d.ts" />
import React from 'react';
import { requestNewContext } from './utils';
import ReactCanvas from '../reconciler';

export const homeNavigator = () => {
  const { context, canvas } = requestNewContext({ width: 300, height: 400, title: 'App Home' });

  setTimeout(() => {
    ReactCanvas.render(
      <flex style={{ height: 400, width: 300 }}>
        <view style={{ height: 30, width: 300, backgroundColor: 'blue', textAlign: 'center' }}>Navigator</view>
        <view style={{ height: 340, width: 300, backgroundColor: 'green', textAlign: 'center' }}>Content</view>
        <view style={{ height: 30, width: 300, backgroundColor: 'red', textAlign: 'center' }}>Tabbar</view>
      </flex>
      , context
    );
  }, 0);
  
  return canvas;
};

export default { title: 'App' }