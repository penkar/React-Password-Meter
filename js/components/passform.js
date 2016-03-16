'use strict';
import React from 'react';
import Variable from './form/variable.js';

class PassForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			lengths: false,
			letters: false,
			specials: false,
			numbers: false,
			capitals: false
		}
	}
	change(e) {
		let id = e.target.id;
		const { dispatch } = this.props;
		dispatch({type:'SET_VARIABLE',variable: id})
	}

	rows() {
		let types = [
			{title:'Required Length',id:'lengths'},
			{title:'Required Letter Count',id:'letters'},
			{title:'Required Number Count',id:'numbers'},
			{title:'Special Characters',id:'specials'},
			{title:'Capital Letters',id:'capitals'}
		]
		types = types.map((data) =>
			<Variable vars={data} key={data.id} change={::this.change}/>
		)
		return types;
	}

	render() {console.log(this.props.variables)
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
						{::this.rows()}
					</tbody>
				</table>
				{errors}
			</div>
		)
	}
}

export default PassForm;
