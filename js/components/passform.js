'use strict';
var Actions = require('../store/actions.js');

var PassForm = module.exports = React.createClass({
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
				<td><input id="length" onChange={Actions.length} /></td>
			</tr>
			<tr>
				<td>Required Letter Count</td>
				<td><input id="letters" onChange={Actions.letters}  /></td>
			</tr>
			<tr>
				<td>Required Number Count</td>
				<td><input id="numbers" onChange={Actions.numbers}  /></td>
			</tr>
			<tr>
				<td>Special Characters</td>
				<td><input id="specialChar" onChange={Actions.specialChar}  /></td>
			</tr>
			<tr>
				<td>Capital Letters</td>
				<td><input id="capLetters" onChange={Actions.capLetters}  /></td>
			</tr>
			</tbody>
		</table>)
	}
})