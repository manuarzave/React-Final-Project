import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import getRoutes from './routes/';
import 'whatwg-fetch';

ReactDOM.render(
	<BrowserRouter>
	{getRoutes()}
	</BrowserRouter>,
	document.getElementById('root')
);