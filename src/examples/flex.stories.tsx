/// <reference path="../index.d.ts" />
import React from 'react';
import { requestNewContext } from './utils';
import ReactCanvas from '../reconciler';

export const directionColumn = () => {
  const { context, canvas } = requestNewContext({ title: 'flex-direction: column' });

  setTimeout(() => {
    ReactCanvas.render(
      <flex style={{ height: 200, width: 200 }}>
        <view style={{ height: 60, width: 60, backgroundColor: 'red' }}>60 x 60</view>
        <view style={{ height: 20, width: 100, backgroundColor: 'blue' }}>20 x 100</view>
        <view style={{ height: 40, width: 40, backgroundColor: 'green' }}>40 x 40</view>
      </flex>
      , context
    );
  }, 0);
  
  return canvas;
};

export const justifyContentSpaceBetween = () => {
  const { context, canvas } = requestNewContext();

  setTimeout(() => {
    ReactCanvas.render(
      <flex style={{ height: 200, width: 200, justifyContent: 'space-between' }}>
        <view style={{ height: 60, width: 60, backgroundColor: 'red' }}>60 x 60</view>
        <view style={{ height: 20, width: 100, backgroundColor: 'blue' }}>20 x 100</view>
        <view style={{ height: 40, width: 40, backgroundColor: 'green' }}>40 x 40</view>
      </flex>
      , context
    );
  }, 0);
  
  return canvas;
};

export const directionRow = () => {
  const { context, canvas } = requestNewContext({ title: 'flex-direction: column' });

  setTimeout(() => {
    ReactCanvas.render(
      <flex style={{ height: 200, width: 200, flexDirection: 'row' }} >
        <view style={{ height: 60, width: 60, backgroundColor: 'red' }}>60 x 60</view>
        <view style={{ height: 20, width: 100, backgroundColor: 'blue' }}>20 x 100</view>
        <view style={{ height: 40, width: 40, backgroundColor: 'green' }}>40 x 40</view>
      </flex>
      , context
    );
  }, 0);
  
  return canvas;
};

export default { title: 'flex layout' }