'use strict';
import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {password:''}
	}

	change(e) {
		var newpass = e.target.value;
		this.setState({password: newpass});
	}

	_lengths(password) {
		console.log(password);
		let variable = this.props.variables.lengths;
		if(!variable || password.replace(/\s/g, '').length >= variable){
			return null
		}
		return <li key='length'>Your password needs to be atleast {variable} characters long.</li>
	}

	_letters(password) {
		let variable = this.props.variables.letters;
		if(!variable || password.replace(/\W/g, '').replace(/\d/g, '').length >= variable){
			return null
		}
		return <li key='letters'>Your password must contain atleast {variable} letters.</li>
	}

	_capitals(password) {
		let variable = this.props.variables.capitals;
		if(!variable || password.replace(/[^A-Z]/g, '').length >= variable){
			return null
		}
		return <li key='capitals'>Your password must contain atleast {variable} capital letters.</li>
	}

	_numbers(password) {
		let variable = this.props.variables.numbers;
		if(!variable || password.replace(/\D/g, '').length >= variable){
			return null
		}
		return <li key='numbers'>Your password must contain atleast {variable} numbers.</li>
	}

	_specials(password) {
		let variable = this.props.variables.specials;
		if(!variable){
			return null
		}
		for(var i = 0; i < variable.length; i++){
			let v = variable[i];
			if(password.indexOf(v) === -1){return <li key='specials'>Your password must contain the characters: {variable.join(' ')}.</li>;}
		}
		return null
	}

	_errors() {
		let password = this.state.password
		if(!password){
			return null;
		}
		return [
			::this._lengths(password),
			::this._letters(password),
			::this._capitals(password),
			::this._numbers(password),
			::this._specials(password)
		]
	}

	render() {
		return(
			<div className='pure-g'>
				<div className='pure-u-1-5'>&nbsp;
				</div>
				<div className='pure-u-3-5 pure-form'>
					<input onChange={::this.change} style={{width:'100%'}}/>
					<br/>
					<ul className='error'>
						{::this._errors()}
					</ul>
				</div>
			</div>
		)
	}
}
var mapStateToProps = function(state){
    return {variables:state.variables};
};

export default connect(mapStateToProps)(App);
