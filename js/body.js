var App = require('./components/app.js');
var PassForm = require('./components/passform.js');
var Header = require('./components/header.js');


var Body = React.createClass({
	render: function(){
		return (
			<div id="wrapper">
				<Header />
				<App />
				<PassForm />
			</div>
		)
	}
});

React.render(
	<Body />,
	document.getElementById('mount')
);