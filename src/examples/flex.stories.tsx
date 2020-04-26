/// <reference path="../index.d.ts" />
import React from 'react';
import { requestNewContext } from './utils';
import ReactCanvas from '../reconciler';

const context = requestNewContext({ title: 'flex-direction: column' });

ReactCanvas.render(
  <flex style={{ height: 200, width: 200 }} >
    <view style={{ height: 60, width: 60 }} />
    <view style={{ height: 20, width: 100 }} />
    <view style={{ height: 20, width: 20 }} />
  </flex>
  , context
);
