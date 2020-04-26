/// <reference path="../index.d.ts" />
import { requestNewContext } from './utils';
import ReactCanvas from '../reconciler';

const context = requestNewContext({ title: 'text' });
ReactCanvas.render('hello, my name is chen', context);
