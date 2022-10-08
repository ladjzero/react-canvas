/// <reference path="../index.d.ts" />
import React, { useEffect, useState } from 'react';
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

export const timer = () => {
  const { context, canvas } = requestNewContext({ width: 300, height: 400, title: 'App Home' });

  const App = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => setCount(count + 1), 1000);

      return () => clearInterval(timer);
    })

    return (
      <text>{count}</text>
    )
  }

  setTimeout(() => {
    ReactCanvas.render(
      <App />
      , context
    );
  }, 0);
  
  return canvas;
}

export default { title: 'App' }