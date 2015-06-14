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
				<td><input id="capitalLetters" /></td>
			</tr>
			<tr>
				<td>Required Letter Count</td>
				<td><input id="capitalLetters" /></td>
			</tr>
			<tr>
				<td>Required Number Count</td>
				<td><input id="numbers" /></td>
			</tr>
			<tr>
				<td>Special Characters</td>
				<td><input id="capitalLetters" /></td>
			</tr>
			<tr>
				<td>Capital Letters</td>
				<td><input id="capitalLetters" /></td>
			</tr>
			</tbody>
		</table>)
	}
})