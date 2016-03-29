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

	switchVal(variable, val) {
		let newval = parseInt(val);
		switch (variable) {
			case 'lengths':
			case 'letters':
			case 'numbers':
			case 'capitals':
				if(newval != val){
					this.setState({[variable]:true});
				} else {
					this.setState({[variable]:false});
				}
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
			{title:'Required Length',id:'lengths', description: "Minimum amount of characters required."},
			{title:'Letter Count',id:'letters', description: "Minimum amount of letters required."},
			{title:'Number Count',id:'numbers', description: "Minimum amount of numbers required."},
			{title:'Special Chars',id:'specials', description: "Special characters required in password."},
			{title:'Capital Letters',id:'capitals', description: "Minimum amount of capital letters required."}
		]
		types = types.map((data) =>
			<Variable vars={data} key={data.id} change={::this.change}/>
		)
		return types;
	}

	_errors() {
		let errors = [];
		let state = this.state;
		for(let i in state){
			let disp = state[i];
			if(disp){
				errors.push(<div className="error">{i} should be an integer</div>)
			}
		}
		return errors;
	}

	render() {
		return (
			<div>
				<table className="pure-table pure-form" style={{width:'100%'}}>
					<thead>
						<tr>
							<th>Variable</th>
							<th>Limit</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{::this.rows()}
					</tbody>
				</table>
				{::this._errors()}
			</div>
		)
	}
}

export default PassForm;
