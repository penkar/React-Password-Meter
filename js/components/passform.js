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
		// return val.match(/[A-Z]/g).length
	}

	switchVal(variable, val) {
		switch (variable) {
			case 'lengths':
			case 'letters':
			case 'numbers':
			case 'capitals':
				return parseInt(val);
			case 'specials':
				return val.split('').filter( (v,p,self) => self.indexOf(v) == p )
			default:
				return false;
		}
	}

	change(e) {
		let variable = e.target.id;
		let val = ::this.switchVal(variable, e.target.value)
		const { dispatch } = this.props;
		dispatch({type:'SET_VARIABLE', variable, val})
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
						{::this.rows()}
					</tbody>
				</table>
				{errors}
			</div>
		)
	}
}

export default PassForm;
