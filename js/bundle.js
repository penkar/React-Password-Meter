(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App = require('./components/app.js');
var PassForm = require('./components/passform.js');

var Body = React.createClass({displayName: "Body",
	render: function(){
		return (
			React.createElement("div", {id: "wrapper"}, 
				React.createElement(App, null), 
				React.createElement(PassForm, null)
			)
		)
	}
});

React.render(
	React.createElement(Body, null),
	document.getElementById('mount')
);
},{"./components/app.js":2,"./components/passform.js":3}],2:[function(require,module,exports){
var App = module.exports = React.createClass({displayName: "exports",
	render: function(){
		return(
			React.createElement("div", null, 
				React.createElement("input", {id: "password"})
			)
		)
	}
})
},{}],3:[function(require,module,exports){
var PassForm = module.exports = React.createClass({displayName: "exports",
	render: function(){
		return (React.createElement("table", null, 
			React.createElement("thead", null, 
			React.createElement("tr", null, 
				React.createElement("th", null, "Variable"), 
				React.createElement("th", null, "Limit")
			)
			), 
			React.createElement("tbody", null, 
			React.createElement("tr", null, 
				React.createElement("td", null, "Required Length"), 
				React.createElement("td", null, React.createElement("input", {id: "capitalLetters"}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Required Letter Count"), 
				React.createElement("td", null, React.createElement("input", {id: "capitalLetters"}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Required Number Count"), 
				React.createElement("td", null, React.createElement("input", {id: "numbers"}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Special Characters"), 
				React.createElement("td", null, React.createElement("input", {id: "capitalLetters"}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Capital Letters"), 
				React.createElement("td", null, React.createElement("input", {id: "capitalLetters"}))
			)
			)
		))
	}
})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvYm9keS5qcyIsImpzL2NvbXBvbmVudHMvYXBwLmpzIiwianMvY29tcG9uZW50cy9wYXNzZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYXBwLmpzJyk7XG52YXIgUGFzc0Zvcm0gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGFzc2Zvcm0uanMnKTtcblxudmFyIEJvZHkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQm9keVwiLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcIndyYXBwZXJcIn0sIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFBhc3NGb3JtLCBudWxsKVxuXHRcdFx0KVxuXHRcdClcblx0fVxufSk7XG5cblJlYWN0LnJlbmRlcihcblx0UmVhY3QuY3JlYXRlRWxlbWVudChCb2R5LCBudWxsKSxcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdW50Jylcbik7IiwidmFyIEFwcCA9IG1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcImV4cG9ydHNcIixcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybihcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7aWQ6IFwicGFzc3dvcmRcIn0pXG5cdFx0XHQpXG5cdFx0KVxuXHR9XG59KSIsInZhciBQYXNzRm9ybSA9IG1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcImV4cG9ydHNcIixcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIG51bGwsIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRoZWFkXCIsIG51bGwsIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgXCJWYXJpYWJsZVwiKSwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBudWxsLCBcIkxpbWl0XCIpXG5cdFx0XHQpXG5cdFx0XHQpLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIFwiUmVxdWlyZWQgTGVuZ3RoXCIpLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7aWQ6IFwiY2FwaXRhbExldHRlcnNcIn0pKVxuXHRcdFx0KSwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBcIlJlcXVpcmVkIExldHRlciBDb3VudFwiKSwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge2lkOiBcImNhcGl0YWxMZXR0ZXJzXCJ9KSlcblx0XHRcdCksIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgXCJSZXF1aXJlZCBOdW1iZXIgQ291bnRcIiksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtpZDogXCJudW1iZXJzXCJ9KSlcblx0XHRcdCksIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgXCJTcGVjaWFsIENoYXJhY3RlcnNcIiksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtpZDogXCJjYXBpdGFsTGV0dGVyc1wifSkpXG5cdFx0XHQpLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIFwiQ2FwaXRhbCBMZXR0ZXJzXCIpLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7aWQ6IFwiY2FwaXRhbExldHRlcnNcIn0pKVxuXHRcdFx0KVxuXHRcdFx0KVxuXHRcdCkpXG5cdH1cbn0pIl19
