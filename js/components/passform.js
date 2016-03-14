'use strict';
import React from 'react';
import Actions from '../store/actions.js';
// import VariableRow from './form/variables.js';

class PassForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			lengths: false,
			letters: false,
			specialChar: false,
			numbers: false,
			capLetters: false
		}
	}
	change(e) {
		var num = e.target.value, id = e.target.id, state = this.state;
		state[id] = num
		if(parseInt(num)){
			Actions[id](num);
			this.setState(state);
		} else {
			this.setState(state);
		}
	}
	change2(e) {
		Actions[e.target.id](e.target.value);
	}
	render() {
		var errors = [];
		var state = this.state;
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
}

export default PassForm;
