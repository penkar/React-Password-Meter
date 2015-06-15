'use strict';
var actions = require('./actions.js');
var Reflux = require('reflux');

var VariableStore = module.exports = Reflux.createStore({
	listenables: [actions],
	getInitialState: function(){
		var variable = {};
		return this.variable = variable;
	},
	onLengths: function(value){
		var variable = this.variable;
		variable.length = parseInt(value);
		this.variable = variable;
		this.trigger(this.variable)
	},
	onLetters: function(){
		console.log('onLetters');
	},
	onNumbers: function(){
		console.log('onNumbers');
	},
	onSpecialChar: function(){
		console.log('onSpecialChar');
	},
	onCapLetters: function(){
		console.log('onCapLetters');
	}
});