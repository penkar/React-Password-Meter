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
		variable.lengths = parseInt(value);
		this.variable = variable;
		this.trigger(this.variable)
	},
	onLetters: function(value){
		var variable = this.variable;
		variable.letters = parseInt(value);
		this.variable = variable;
		this.trigger(this.variable)	
	},
	onNumbers: function(value){
		var variable = this.variable;
		variable.numbers = parseInt(value);
		this.variable = variable;
		this.trigger(this.variable)	
	},
	onSpecialChar: function(value){
		var variable = this.variable;
		variable.specials = value;
		this.variable = variable;
		this.trigger(this.variable)	
	},
	onCapLetters: function(value){
		var variable = this.variable;
		variable.capitals = parseInt(value);
		this.variable = variable;
		this.trigger(this.variable)	
	}
});