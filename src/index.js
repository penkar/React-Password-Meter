'use strict';
import React from 'react';
import {render} from 'react-dom';
import App from './containers/app.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { variableApp } from './reducers';
require('./style.css');

let store = createStore(variableApp);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('mount')
);
