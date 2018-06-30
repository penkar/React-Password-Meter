import React from 'react';
import App from '../components/app.js';
import PassForm from '../components/passform.js';
import Template from '../components/template.js';
import { connect } from 'react-redux';

class Body extends React.Component{
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<div>
				<div style={{backgroundColor:'gainsboro', marginBottom:'20px'}} id="header" className="clearfix">
					5 Paramater React Password Strength RegEx
				</div>
				<App />
				<div className="pure-g">
					<div className="pure-u-1-5"></div>
					<div className="pure-u-3-5">
						<PassForm variables={this.props.variables} dispatch={this.props.dispatch}/>
					</div>
				</div>
				<Template />
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
