import React from 'react';
import App from '../components/app.js';
import PassForm from '../components/passform.js';
import Header from '../components/header.js';
import { connect } from 'react-redux';

class Body extends React.Component{
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<div>
				<Header />
				<App />
				<PassForm variables={this.props.variables} dispatch={this.props.dispatch}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    variables: state.variables
  };
}

export default connect(mapStateToProps)(Body);
