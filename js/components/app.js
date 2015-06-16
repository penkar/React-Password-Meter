'use strict';
var VariableStore = require('../store/variablestore.js');
var Reflux = require('reflux');

var App = module.exports = React.createClass({
	mixins: [Reflux.connect(VariableStore, 'variable')],
	getInitialState: function(){
		return ({
			password: ''
		})
	},
	change: function(e){
		var newpass = e.target.value;
		this.setState({password: newpass})
	},
	render: function(){
		var variable = this.state.variable, array=[];
		for(var i in variable){
			array.push(<div>{i}</div>);
		}
		return(
			<div>
				<input id="password" value={variable.length} />
				{array}
			</div>
		)
	}
})