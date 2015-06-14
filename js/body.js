var App = require('./components/app.js');
var PassForm = require('./components/passform.js');

var Body = React.createClass({
	render: function(){
		return (
			<div id="wrapper">
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