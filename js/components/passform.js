'use strict';
var actions = require('../store/actions.js');

var PassForm = module.exports = React.createClass({
	getInitialState: function(){
		return ({
			lengths: false,
			letters: false,
			specialChar: false,
			numbers: false,
			capLetters: false
		});
	},
	change: function(e){
		var num = e.target.value, id = e.target.id, state = this.state;
		state[id] = num
		if(parseInt(num)){
			actions[id](num);
			this.setState(state);
		} else {
			this.setState(state);
		}
	},
	change2: function(e){
		actions[e.target.id](e.target.value);
	},
	render: function(){
		var errors = [], state = this.state;
		for(var i in state){
			var disp = state[i];
			if(disp){
				errors.push(<div className="error">{i} should be an integer</div>)
			}
		}
		return (
		<div className="main">
			<table>
				<thead>
				<tr>
					<th>Variable</th>
					<th>Limit</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>Required Length</td>
					<td><input id="lengths" onChange={this.change} /></td>
				</tr>
				<tr>
					<td>Required Letter Count</td>
					<td><input id="letters" onChange={this.change} /></td>
				</tr>
				<tr>
					<td>Required Number Count</td>
					<td><input id="numbers" onChange={this.change} /></td>
				</tr>
				<tr>
					<td>Special Characters</td>
					<td><input id="specialChar" onChange={this.change2} /></td>
				</tr>
				<tr>
					<td>Capital Letters</td>
					<td><input id="capLetters" onChange={this.change} /></td>
				</tr>
				</tbody>
			</table>
		{errors}
		</div>
		)
	}
})