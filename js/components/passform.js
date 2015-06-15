'use strict';
var actions = require('../store/actions.js');

var PassForm = module.exports = React.createClass({
	change: function(e){
		actions[e.target.id](e.target.value);
	},
	render: function(){
		return (<table>
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
				<td><input id="specialChar" onChange={this.change} /></td>
			</tr>
			<tr>
				<td>Capital Letters</td>
				<td><input id="capLetters" onChange={this.change} /></td>
			</tr>
			</tbody>
		</table>)
	}
})