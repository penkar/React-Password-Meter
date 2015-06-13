var Body = React.createClass({
	render: function(){
		return (
			<div id="wrapper"></div>
		)
	}
});

function initialize() {
	React.render(
		<Body />,
		document.getElementById('map')
	);
}