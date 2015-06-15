'use strict';
var Actions = 
var Reflux = require('reflux');

var module.exports = Reflux.createStore({
	onLength: function(){
		console.log('onLength');
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