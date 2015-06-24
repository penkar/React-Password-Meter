'use strict';
var VariableStore = require('../store/variablestore.js');
var Reflux = require('reflux');

var App = module.exports = React.createClass({
	mixins: [Reflux.connect(VariableStore, 'variable')],
	getInitialState: function(){
		return ({
			password: ''
		})
	},
	press: function(e){
		e = e || window.event;
		if (e.keyCode == 27) {
		alert("Escape");
		}
	},
	change: function(e){
		var newpass = e.target.value;
		this.setState({
			password: newpass
		})
	},
	render: function(){
		var variable = this.state.variable, array=[], errors = [];
    var password = this.state.password;
    if(password){
      if(password.length < variable.lengths){
  			errors.push(<li>Password is not long enough.</li>);
  		}
  		if(password.match(/[a-zA-Z]/g).length < variable.letters){
  			errors.push(<li>Password does not contain enough Letters.</li>)
  		}
      var numMatch = password.match(/\d/g) || [];
  		if(numMatch.length < (variable.numbers || 0 )){
  			errors.push(<li>Password does not contain enough numbers.</li>)
  		}
  		
      var specials = variable.specials || '';
      for(var j = 0; j < specials.length; j++){
        var r = new RegExp(specials[j]);
        console.log(password.search(r));
        if(password.search(r)=== -1){
          errors.push(<li>Password is missing a {specials[j]}.</li>)
        }
      }
  		if(password.match(/[a-zA-Z]/g).length < variable.capitals){
  			errors.push(<li>Password does not have enough capital letters.</li>)
  		}
    }
		return(
			<div>
				<input id="password" value={variable.length} onChange={this.change} onKeyDown={this.press}/>
				{array}
				<ul>
					{errors}
				</ul>
			</div>
		)
	}
})