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
				<div className="pure-g">
					<div className="pure-u-1-5"></div>
					<div className="pure-u-3-5">
						<PassForm variables={this.props.variables} dispatch={this.props.dispatch}/>
					</div>
				</div>
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
