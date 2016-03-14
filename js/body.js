'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import PassForm from './components/passform.js';
import Header from './components/header.js';


class Body extends React.Component{
	constructor(props) {
    super(props);
  }
	render() {
		return (
			<div id="wrapper">
				<Header />
				<App />
				<PassForm />
			</div>
		)
	}
}

ReactDOM.render(
	<Body />,
	document.getElementById('mount')
);
