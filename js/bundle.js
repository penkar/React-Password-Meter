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
'use strict';
var VariableStore = require('../store/variablestore.js');
var Reflux = require('reflux');

var App = module.exports = React.createClass({displayName: "exports",
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
  			errors.push(React.createElement("li", null, "Password is not long enough."));
  		}
  		if(password.match(/[a-zA-Z]/g).length < variable.letters){
  			errors.push(React.createElement("li", null, "Password does not contain enough Letters."))
  		}
      var numMatch = password.match(/\d/g) || [];
  		if(numMatch.length < (variable.numbers || 0 )){
  			errors.push(React.createElement("li", null, "Password does not contain enough numbers."))
  		}
  		
      // var specials = variable.specials || '';
      // for(var j = 0; j < specials.length; j++){
      //   var r = new RegExp(specials[j]);
      //   console.log(password.search(r));
      //   if(!password.search(r)){
      //     errors.push(<li>Password is missing a {specials[j]}.</li>)
      //   }
      // }
  		if(password.match(/[a-zA-Z]/g).length < variable.capitals){
  			errors.push(React.createElement("li", null, "Password does not have enough capital letters."))
  		}
    }
		// for(var i in variable){
		// 	array.push(<div>{i}-=-{variable[i]}</div>);
		// }
		return(
			React.createElement("div", null, 
				React.createElement("input", {id: "password", value: variable.length, onChange: this.change, onKeyDown: this.press}), 
				array, 
				React.createElement("ul", null, 
					errors
				)
			)
		)
	}
})
},{"../store/variablestore.js":5,"reflux":6}],3:[function(require,module,exports){
'use strict';
var actions = require('../store/actions.js');

var PassForm = module.exports = React.createClass({displayName: "exports",
	change: function(e){
		actions[e.target.id](e.target.value);
	},
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
				React.createElement("td", null, React.createElement("input", {id: "lengths", onChange: this.change}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Required Letter Count"), 
				React.createElement("td", null, React.createElement("input", {id: "letters", onChange: this.change}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Required Number Count"), 
				React.createElement("td", null, React.createElement("input", {id: "numbers", onChange: this.change}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Special Characters"), 
				React.createElement("td", null, React.createElement("input", {id: "specialChar", onChange: this.change}))
			), 
			React.createElement("tr", null, 
				React.createElement("td", null, "Capital Letters"), 
				React.createElement("td", null, React.createElement("input", {id: "capLetters", onChange: this.change}))
			)
			)
		))
	}
})
},{"../store/actions.js":4}],4:[function(require,module,exports){
'use strict';
var Reflux = require('reflux');

var actions = module.exports = Reflux.createActions([
	'lengths',
	'letters',
	'numbers',
	'specialChar',
	'capLetters'
]);
},{"reflux":6}],5:[function(require,module,exports){
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
},{"./actions.js":4,"reflux":6}],6:[function(require,module,exports){
module.exports = require('./src');

},{"./src":20}],7:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],8:[function(require,module,exports){
(function (global){
/*! Native Promise Only
    v0.7.8-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(c=n(o))?(u=new f(a),c.call(o,function(){r.apply(u,arguments)},function(){i.apply(u,arguments)})):(a.msg=o,a.state=1,a.chain.length>0&&t(e,a))}catch(s){i.call(u||new f(a),s)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return a.prototype=g,s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
/**
 * A module of methods that you want to include in all actions.
 * This module is consumed by `createAction`.
 */
module.exports = {
};

},{}],10:[function(require,module,exports){
exports.createdStores = [];

exports.createdActions = [];

exports.reset = function() {
    while(exports.createdStores.length) {
        exports.createdStores.pop();
    }
    while(exports.createdActions.length) {
        exports.createdActions.pop();
    }
};

},{}],11:[function(require,module,exports){
var _ = require('./utils'),
    maker = require('./joins').instanceJoinCreator;

/**
 * Extract child listenables from a parent from their
 * children property and return them in a keyed Object
 *
 * @param {Object} listenable The parent listenable
 */
var mapChildListenables = function(listenable) {
    var i = 0, children = {}, childName;
    for (;i < (listenable.children||[]).length; ++i) {
        childName = listenable.children[i];
        if(listenable[childName]){
            children[childName] = listenable[childName];
        }
    }
    return children;
};

/**
 * Make a flat dictionary of all listenables including their
 * possible children (recursively), concatenating names in camelCase.
 *
 * @param {Object} listenables The top-level listenables
 */
var flattenListenables = function(listenables) {
    var flattened = {};
    for(var key in listenables){
        var listenable = listenables[key];
        var childMap = mapChildListenables(listenable);

        // recursively flatten children
        var children = flattenListenables(childMap);

        // add the primary listenable and chilren
        flattened[key] = listenable;
        for(var childKey in children){
            var childListenable = children[childKey];
            flattened[key + _.capitalize(childKey)] = childListenable;
        }
    }

    return flattened;
};

/**
 * A module of methods related to listening.
 */
module.exports = {

    /**
     * An internal utility function used by `validateListening`
     *
     * @param {Action|Store} listenable The listenable we want to search for
     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
     */
    hasListener: function(listenable) {
        var i = 0, j, listener, listenables;
        for (;i < (this.subscriptions||[]).length; ++i) {
            listenables = [].concat(this.subscriptions[i].listenable);
            for (j = 0; j < listenables.length; j++){
                listener = listenables[j];
                if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * A convenience method that listens to all listenables in the given object.
     *
     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
     */
    listenToMany: function(listenables){
        var allListenables = flattenListenables(listenables);
        for(var key in allListenables){
            var cbname = _.callbackName(key),
                localname = this[cbname] ? cbname : this[key] ? key : undefined;
            if (localname){
                this.listenTo(allListenables[key],localname,this[cbname+"Default"]||this[localname+"Default"]||localname);
            }
        }
    },

    /**
     * Checks if the current context can listen to the supplied listenable
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @returns {String|Undefined} An error message, or undefined if there was no problem.
     */
    validateListening: function(listenable){
        if (listenable === this) {
            return "Listener is not able to listen to itself";
        }
        if (!_.isFunction(listenable.listen)) {
            return listenable + " is missing a listen method";
        }
        if (listenable.hasListener && listenable.hasListener(this)) {
            return "Listener cannot listen to this listenable because of circular loop";
        }
    },

    /**
     * Sets up a subscription to the given listenable for the context object
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @param {Function|String} callback The callback to register as event handler
     * @param {Function|String} defaultCallback The callback to register as default handler
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
     */
    listenTo: function(listenable, callback, defaultCallback) {
        var desub, unsubscriber, subscriptionobj, subs = this.subscriptions = this.subscriptions || [];
        _.throwIf(this.validateListening(listenable));
        this.fetchInitialState(listenable, defaultCallback);
        desub = listenable.listen(this[callback]||callback, this);
        unsubscriber = function() {
            var index = subs.indexOf(subscriptionobj);
            _.throwIf(index === -1,'Tried to remove listen already gone from subscriptions list!');
            subs.splice(index, 1);
            desub();
        };
        subscriptionobj = {
            stop: unsubscriber,
            listenable: listenable
        };
        subs.push(subscriptionobj);
        return subscriptionobj;
    },

    /**
     * Stops listening to a single listenable
     *
     * @param {Action|Store} listenable The action or store we no longer want to listen to
     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
     */
    stopListeningTo: function(listenable){
        var sub, i = 0, subs = this.subscriptions || [];
        for(;i < subs.length; i++){
            sub = subs[i];
            if (sub.listenable === listenable){
                sub.stop();
                _.throwIf(subs.indexOf(sub)!==-1,'Failed to remove listen from subscriptions list!');
                return true;
            }
        }
        return false;
    },

    /**
     * Stops all subscriptions and empties subscriptions array
     */
    stopListeningToAll: function(){
        var remaining, subs = this.subscriptions || [];
        while((remaining=subs.length)){
            subs[0].stop();
            _.throwIf(subs.length!==remaining-1,'Failed to remove listen from subscriptions list!');
        }
    },

    /**
     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.
     * @param {Action|Store} listenable The publisher we want to get initial state from
     * @param {Function|String} defaultCallback The method to receive the data
     */
    fetchInitialState: function (listenable, defaultCallback) {
        defaultCallback = (defaultCallback && this[defaultCallback]) || defaultCallback;
        var me = this;
        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getInitialState)) {
            var data = listenable.getInitialState();
            if (data && _.isFunction(data.then)) {
                data.then(function() {
                    defaultCallback.apply(me, arguments);
                });
            } else {
                defaultCallback.call(this, data);
            }
        }
    },

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with the last emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinTrailing: maker("last"),

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with the first emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinLeading: maker("first"),

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with all emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinConcat: maker("all"),

    /**
     * The callback will be called once all listenables have triggered.
     * If a callback triggers twice before that happens, an error is thrown.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinStrict: maker("strict")
};

},{"./joins":21,"./utils":25}],12:[function(require,module,exports){
var _ = require('./utils'),
    ListenerMethods = require('./ListenerMethods');

/**
 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
 * Note that if you're using the `connect` mixin you don't need this mixin, as connect will
 * import everything this mixin contains!
 */
module.exports = _.extend({

    /**
     * Cleans up all listener previously registered.
     */
    componentWillUnmount: ListenerMethods.stopListeningToAll

}, ListenerMethods);

},{"./ListenerMethods":11,"./utils":25}],13:[function(require,module,exports){
var _ = require('./utils');

/**
 * A module of methods for object that you want to be able to listen to.
 * This module is consumed by `createStore` and `createAction`
 */
module.exports = {

    /**
     * Hook used by the publisher that is invoked before emitting
     * and before `shouldEmit`. The arguments are the ones that the action
     * is invoked with. If this function returns something other than
     * undefined, that will be passed on as arguments for shouldEmit and
     * emission.
     */
    preEmit: function() {},

    /**
     * Hook used by the publisher after `preEmit` to determine if the
     * event should be emitted with given arguments. This may be overridden
     * in your application, default implementation always returns true.
     *
     * @returns {Boolean} true if event should be emitted
     */
    shouldEmit: function() { return true; },

    /**
     * Subscribes the given callback for action triggered
     *
     * @param {Function} callback The callback to register as event handler
     * @param {Mixed} [optional] bindContext The context to bind the callback with
     * @returns {Function} Callback that unsubscribes the registered event handler
     */
    listen: function(callback, bindContext) {
        bindContext = bindContext || this;
        var eventHandler = function(args) {
            if (aborted){
                return;
            }
            callback.apply(bindContext, args);
        }, me = this, aborted = false;
        this.emitter.addListener(this.eventLabel, eventHandler);
        return function() {
            aborted = true;
            me.emitter.removeListener(me.eventLabel, eventHandler);
        };
    },

    /**
     * Attach handlers to promise that trigger the completed and failed
     * child publishers, if available.
     *
     * @param {Object} The promise to attach to
     */
    promise: function(promise) {
        var me = this;

        var canHandlePromise =
            this.children.indexOf('completed') >= 0 &&
            this.children.indexOf('failed') >= 0;

        if (!canHandlePromise){
            throw new Error('Publisher must have "completed" and "failed" child publishers');
        }

        promise.then(function(response) {
            return me.completed(response);
        }, function(error) {
            return me.failed(error);
        });
    },

    /**
     * Subscribes the given callback for action triggered, which should
     * return a promise that in turn is passed to `this.promise`
     *
     * @param {Function} callback The callback to register as event handler
     */
    listenAndPromise: function(callback, bindContext) {
        var me = this;
        bindContext = bindContext || this;
        this.willCallPromise = (this.willCallPromise || 0) + 1;

        var removeListen = this.listen(function() {

            if (!callback) {
                throw new Error('Expected a function returning a promise but got ' + callback);
            }

            var args = arguments,
                promise = callback.apply(bindContext, args);
            return me.promise.call(me, promise);
        }, bindContext);

        return function () {
          me.willCallPromise--;
          removeListen.call(me);
        };

    },

    /**
     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
     */
    trigger: function() {
        var args = arguments,
            pre = this.preEmit.apply(this, args);
        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
        if (this.shouldEmit.apply(this, args)) {
            this.emitter.emit(this.eventLabel, args);
        }
    },

    /**
     * Tries to publish the event on the next tick
     */
    triggerAsync: function(){
        var args = arguments,me = this;
        _.nextTick(function() {
            me.trigger.apply(me, args);
        });
    },

    /**
     * Returns a Promise for the triggered action
     *
     * @return {Promise}
     *   Resolved by completed child action.
     *   Rejected by failed child action.
     *   If listenAndPromise'd, then promise associated to this trigger.
     *   Otherwise, the promise is for next child action completion.
     */
    triggerPromise: function(){
        var me = this;
        var args = arguments;

        var canHandlePromise =
            this.children.indexOf('completed') >= 0 &&
            this.children.indexOf('failed') >= 0;

        var promise = _.createPromise(function(resolve, reject) {
            // If `listenAndPromise` is listening
            // patch `promise` w/ context-loaded resolve/reject
            if (me.willCallPromise) {
                _.nextTick(function() {
                    var old_promise_method = me.promise;
                    me.promise = function (promise) {
                        promise.then(resolve, reject);
                        // Back to your regularly schedule programming.
                        me.promise = old_promise_method;
                        return me.promise.apply(me, arguments);
                    };
                    me.trigger.apply(me, args);
                });
                return;
            }

            if (canHandlePromise) {
                var removeSuccess = me.completed.listen(function(args) {
                    removeSuccess();
                    removeFailed();
                    resolve(args);
                });

                var removeFailed = me.failed.listen(function(args) {
                    removeSuccess();
                    removeFailed();
                    reject(args);
                });
            }

            me.triggerAsync.apply(me, args);

            if (!canHandlePromise) {
                resolve();
            }
        });

        return promise;
    }
};

},{"./utils":25}],14:[function(require,module,exports){
/**
 * A module of methods that you want to include in all stores.
 * This module is consumed by `createStore`.
 */
module.exports = {
};

},{}],15:[function(require,module,exports){
module.exports = function(store, definition) {
  for (var name in definition) {
    if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(definition, name);

        if (!propertyDescriptor.value || typeof propertyDescriptor.value !== 'function' || !definition.hasOwnProperty(name)) {
            continue;
        }

        store[name] = definition[name].bind(store);
    } else {
        var property = definition[name];

        if (typeof property !== 'function' || !definition.hasOwnProperty(name)) {
            continue;
        }

        store[name] = property.bind(store);
    }
  }

  return store;
};

},{}],16:[function(require,module,exports){
var Reflux = require('./index'),
    _ = require('./utils');

module.exports = function(listenable,key){
    return {
        getInitialState: function(){
            if (!_.isFunction(listenable.getInitialState)) {
                return {};
            } else if (key === undefined) {
                return listenable.getInitialState();
            } else {
                return _.object([key],[listenable.getInitialState()]);
            }
        },
        componentDidMount: function(){
            _.extend(this,Reflux.ListenerMethods);
            var me = this, cb = (key === undefined ? this.setState : function(v){
                if (typeof me.isMounted === "undefined" || me.isMounted() === true) {
                    me.setState(_.object([key],[v]));    
                }
            });
            this.listenTo(listenable,cb);
        },
        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
    };
};

},{"./index":20,"./utils":25}],17:[function(require,module,exports){
var Reflux = require('./index'),
  _ = require('./utils');

module.exports = function(listenable, key, filterFunc) {
    filterFunc = _.isFunction(key) ? key : filterFunc;
    return {
        getInitialState: function() {
            if (!_.isFunction(listenable.getInitialState)) {
                return {};
            } else if (_.isFunction(key)) {
                return filterFunc.call(this, listenable.getInitialState());
            } else {
                // Filter initial payload from store.
                var result = filterFunc.call(this, listenable.getInitialState());
                if (result) {
                  return _.object([key], [result]);
                } else {
                  return {};
                }
            }
        },
        componentDidMount: function() {
            _.extend(this, Reflux.ListenerMethods);
            var me = this;
            var cb = function(value) {
                if (_.isFunction(key)) {
                    me.setState(filterFunc.call(me, value));
                } else {
                    var result = filterFunc.call(me, value);
                    me.setState(_.object([key], [result]));
                }
            };

            this.listenTo(listenable, cb);
        },
        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
    };
};


},{"./index":20,"./utils":25}],18:[function(require,module,exports){
var _ = require('./utils'),
    Reflux = require('./index'),
    Keep = require('./Keep'),
    allowed = {preEmit:1,shouldEmit:1};

/**
 * Creates an action functor object. It is mixed in with functions
 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
 * be overridden in the definition object.
 *
 * @param {Object} definition The action object definition
 */
var createAction = function(definition) {

    definition = definition || {};
    if (!_.isObject(definition)){
        definition = {actionName: definition};
    }

    for(var a in Reflux.ActionMethods){
        if (!allowed[a] && Reflux.PublisherMethods[a]) {
            throw new Error("Cannot override API method " + a +
                " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && Reflux.PublisherMethods[d]) {
            throw new Error("Cannot override API method " + d +
                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    definition.children = definition.children || [];
    if (definition.asyncResult){
        definition.children = definition.children.concat(["completed","failed"]);
    }

    var i = 0, childActions = {};
    for (; i < definition.children.length; i++) {
        var name = definition.children[i];
        childActions[name] = createAction(name);
    }

    var context = _.extend({
        eventLabel: "action",
        emitter: new _.EventEmitter(),
        _isAction: true
    }, Reflux.PublisherMethods, Reflux.ActionMethods, definition);

    var functor = function() {
        return functor[functor.sync?"trigger":"triggerPromise"].apply(functor, arguments);
    };

    _.extend(functor,childActions,context);

    Keep.createdActions.push(functor);

    return functor;

};

module.exports = createAction;

},{"./Keep":10,"./index":20,"./utils":25}],19:[function(require,module,exports){
var _ = require('./utils'),
    Reflux = require('./index'),
    Keep = require('./Keep'),
    mixer = require('./mixer'),
    allowed = {preEmit:1,shouldEmit:1},
    bindMethods = require('./bindMethods');

/**
 * Creates an event emitting Data Store. It is mixed in with functions
 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
 * and `shouldEmit` may be overridden in the definition object.
 *
 * @param {Object} definition The data store object definition
 * @returns {Store} A data store instance
 */
module.exports = function(definition) {

    definition = definition || {};

    for(var a in Reflux.StoreMethods){
        if (!allowed[a] && (Reflux.PublisherMethods[a] || Reflux.ListenerMethods[a])){
            throw new Error("Cannot override API method " + a +
                " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && (Reflux.PublisherMethods[d] || Reflux.ListenerMethods[d])){
            throw new Error("Cannot override API method " + d +
                " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
            );
        }
    }

    definition = mixer(definition);

    function Store() {
        var i=0, arr;
        this.subscriptions = [];
        this.emitter = new _.EventEmitter();
        this.eventLabel = "change";
        bindMethods(this, definition);
        if (this.init && _.isFunction(this.init)) {
            this.init();
        }
        if (this.listenables){
            arr = [].concat(this.listenables);
            for(;i < arr.length;i++){
                this.listenToMany(arr[i]);
            }
        }
    }

    _.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, Reflux.StoreMethods, definition);

    var store = new Store();
    Keep.createdStores.push(store);

    return store;
};

},{"./Keep":10,"./bindMethods":15,"./index":20,"./mixer":24,"./utils":25}],20:[function(require,module,exports){
exports.ActionMethods = require('./ActionMethods');

exports.ListenerMethods = require('./ListenerMethods');

exports.PublisherMethods = require('./PublisherMethods');

exports.StoreMethods = require('./StoreMethods');

exports.createAction = require('./createAction');

exports.createStore = require('./createStore');

exports.connect = require('./connect');

exports.connectFilter = require('./connectFilter');

exports.ListenerMixin = require('./ListenerMixin');

exports.listenTo = require('./listenTo');

exports.listenToMany = require('./listenToMany');


var maker = require('./joins').staticJoinCreator;

exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility

exports.joinLeading = maker("first");

exports.joinStrict = maker("strict");

exports.joinConcat = maker("all");

var _ = require('./utils');

exports.EventEmitter = _.EventEmitter;

exports.Promise = _.Promise;

/**
 * Convenience function for creating a set of actions
 *
 * @param definitions the definitions for the actions to be created
 * @returns an object with actions of corresponding action names
 */
exports.createActions = function(definitions) {
    var actions = {};
    for (var k in definitions){
        if (definitions.hasOwnProperty(k)) {
            var val = definitions[k],
                actionName = _.isObject(val) ? k : val;

            actions[actionName] = exports.createAction(val);
        }
    }
    return actions;
};

/**
 * Sets the eventmitter that Reflux uses
 */
exports.setEventEmitter = function(ctx) {
    var _ = require('./utils');
    exports.EventEmitter = _.EventEmitter = ctx;
};


/**
 * Sets the Promise library that Reflux uses
 */
exports.setPromise = function(ctx) {
    var _ = require('./utils');
    exports.Promise = _.Promise = ctx;
};


/**
 * Sets the Promise factory that creates new promises
 * @param {Function} factory has the signature `function(resolver) { return [new Promise]; }`
 */
exports.setPromiseFactory = function(factory) {
    var _ = require('./utils');
    _.createPromise = factory;
};


/**
 * Sets the method used for deferring actions and stores
 */
exports.nextTick = function(nextTick) {
    var _ = require('./utils');
    _.nextTick = nextTick;
};

/**
 * Provides the set of created actions and stores for introspection
 */
exports.__keep = require('./Keep');

/**
 * Warn if Function.prototype.bind not available
 */
if (!Function.prototype.bind) {
  console.error(
    'Function.prototype.bind not available. ' +
    'ES5 shim required. ' +
    'https://github.com/spoike/refluxjs#es5'
  );
}

},{"./ActionMethods":9,"./Keep":10,"./ListenerMethods":11,"./ListenerMixin":12,"./PublisherMethods":13,"./StoreMethods":14,"./connect":16,"./connectFilter":17,"./createAction":18,"./createStore":19,"./joins":21,"./listenTo":22,"./listenToMany":23,"./utils":25}],21:[function(require,module,exports){
/**
 * Internal module used to create static and instance join methods
 */

var slice = Array.prototype.slice,
    _ = require("./utils"),
    createStore = require("./createStore"),
    strategyMethodNames = {
        strict: "joinStrict",
        first: "joinLeading",
        last: "joinTrailing",
        all: "joinConcat"
    };

/**
 * Used in `index.js` to create the static join methods
 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
 */
exports.staticJoinCreator = function(strategy){
    return function(/* listenables... */) {
        var listenables = slice.call(arguments);
        return createStore({
            init: function(){
                this[strategyMethodNames[strategy]].apply(this,listenables.concat("triggerAsync"));
            }
        });
    };
};

/**
 * Used in `ListenerMethods.js` to create the instance join methods
 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
 */
exports.instanceJoinCreator = function(strategy){
    return function(/* listenables..., callback*/){
        _.throwIf(arguments.length < 3,'Cannot create a join with less than 2 listenables!');
        var listenables = slice.call(arguments),
            callback = listenables.pop(),
            numberOfListenables = listenables.length,
            join = {
                numberOfListenables: numberOfListenables,
                callback: this[callback]||callback,
                listener: this,
                strategy: strategy
            }, i, cancels = [], subobj;
        for (i = 0; i < numberOfListenables; i++) {
            _.throwIf(this.validateListening(listenables[i]));
        }
        for (i = 0; i < numberOfListenables; i++) {
            cancels.push(listenables[i].listen(newListener(i,join),this));
        }
        reset(join);
        subobj = {listenable: listenables};
        subobj.stop = makeStopper(subobj,cancels,this);
        this.subscriptions = (this.subscriptions || []).concat(subobj);
        return subobj;
    };
};

// ---- internal join functions ----

function makeStopper(subobj,cancels,context){
    return function() {
        var i, subs = context.subscriptions,
            index = (subs ? subs.indexOf(subobj) : -1);
        _.throwIf(index === -1,'Tried to remove join already gone from subscriptions list!');
        for(i=0;i < cancels.length; i++){
            cancels[i]();
        }
        subs.splice(index, 1);
    };
}

function reset(join) {
    join.listenablesEmitted = new Array(join.numberOfListenables);
    join.args = new Array(join.numberOfListenables);
}

function newListener(i,join) {
    return function() {
        var callargs = slice.call(arguments);
        if (join.listenablesEmitted[i]){
            switch(join.strategy){
                case "strict": throw new Error("Strict join failed because listener triggered twice.");
                case "last": join.args[i] = callargs; break;
                case "all": join.args[i].push(callargs);
            }
        } else {
            join.listenablesEmitted[i] = true;
            join.args[i] = (join.strategy==="all"?[callargs]:callargs);
        }
        emitIfAllListenablesEmitted(join);
    };
}

function emitIfAllListenablesEmitted(join) {
    for (var i = 0; i < join.numberOfListenables; i++) {
        if (!join.listenablesEmitted[i]) {
            return;
        }
    }
    join.callback.apply(join.listener,join.args);
    reset(join);
}

},{"./createStore":19,"./utils":25}],22:[function(require,module,exports){
var Reflux = require('./index');


/**
 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
 * without having to manually set listeners in the `componentDidMount` method.
 *
 * @param {Action|Store} listenable An Action or Store that should be
 *  listened to.
 * @param {Function|String} callback The callback to register as event handler
 * @param {Function|String} defaultCallback The callback to register as default handler
 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
 */
module.exports = function(listenable,callback,initial){
    return {
        /**
         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
         * and then make the call to `listenTo` with the arguments provided to the factory function
         */
        componentDidMount: function() {
            for(var m in Reflux.ListenerMethods){
                if (this[m] !== Reflux.ListenerMethods[m]){
                    if (this[m]){
                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
                    }
                    this[m] = Reflux.ListenerMethods[m];
                }
            }
            this.listenTo(listenable,callback,initial);
        },
        /**
         * Cleans up all listener previously registered.
         */
        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
    };
};

},{"./index":20}],23:[function(require,module,exports){
var Reflux = require('./index');

/**
 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
 * without having to manually set listeners in the `componentDidMount` method. This version is used
 * to automatically set up a `listenToMany` call.
 *
 * @param {Object} listenables An object of listenables
 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
 */
module.exports = function(listenables){
    return {
        /**
         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
         * and then make the call to `listenTo` with the arguments provided to the factory function
         */
        componentDidMount: function() {
            for(var m in Reflux.ListenerMethods){
                if (this[m] !== Reflux.ListenerMethods[m]){
                    if (this[m]){
                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
                    }
                    this[m] = Reflux.ListenerMethods[m];
                }
            }
            this.listenToMany(listenables);
        },
        /**
         * Cleans up all listener previously registered.
         */
        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
    };
};

},{"./index":20}],24:[function(require,module,exports){
var _ = require('./utils');

module.exports = function mix(def) {
    var composed = {
        init: [],
        preEmit: [],
        shouldEmit: []
    };

    var updated = (function mixDef(mixin) {
        var mixed = {};
        if (mixin.mixins) {
            mixin.mixins.forEach(function (subMixin) {
                _.extend(mixed, mixDef(subMixin));
            });
        }
        _.extend(mixed, mixin);
        Object.keys(composed).forEach(function (composable) {
            if (mixin.hasOwnProperty(composable)) {
                composed[composable].push(mixin[composable]);
            }
        });
        return mixed;
    }(def));

    if (composed.init.length > 1) {
        updated.init = function () {
            var args = arguments;
            composed.init.forEach(function (init) {
                init.apply(this, args);
            }, this);
        };
    }
    if (composed.preEmit.length > 1) {
        updated.preEmit = function () {
            return composed.preEmit.reduce(function (args, preEmit) {
                var newValue = preEmit.apply(this, args);
                return newValue === undefined ? args : [newValue];
            }.bind(this), arguments);
        };
    }
    if (composed.shouldEmit.length > 1) {
        updated.shouldEmit = function () {
            var args = arguments;
            return !composed.shouldEmit.some(function (shouldEmit) {
                return !shouldEmit.apply(this, args);
            }, this);
        };
    }
    Object.keys(composed).forEach(function (composable) {
        if (composed[composable].length === 1) {
            updated[composable] = composed[composable][0];
        }
    });

    return updated;
};

},{"./utils":25}],25:[function(require,module,exports){
/*
 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
 * order to remove the dependency
 */
var isObject = exports.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

exports.extend = function(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
                Object.defineProperty(obj, prop, propertyDescriptor);
            } else {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};

exports.isFunction = function(value) {
    return typeof value === 'function';
};

exports.EventEmitter = require('eventemitter3');

exports.nextTick = function(callback) {
    setTimeout(callback, 0);
};

exports.capitalize = function(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
};

exports.callbackName = function(string){
    return "on"+exports.capitalize(string);
};

exports.object = function(keys,vals){
    var o={}, i=0;
    for(;i < keys.length; i++){
        o[keys[i]] = vals[i];
    }
    return o;
};

exports.Promise = require("native-promise-only");

exports.createPromise = function(resolver) {
    return new exports.Promise(resolver);
};

exports.isArguments = function(value) {
    return typeof value === 'object' && ('callee' in value) && typeof value.length === 'number';
};

exports.throwIf = function(val,msg){
    if (val){
        throw Error(msg||val);
    }
};

},{"eventemitter3":7,"native-promise-only":8}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvYm9keS5qcyIsImpzL2NvbXBvbmVudHMvYXBwLmpzIiwianMvY29tcG9uZW50cy9wYXNzZm9ybS5qcyIsImpzL3N0b3JlL2FjdGlvbnMuanMiLCJqcy9zdG9yZS92YXJpYWJsZXN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L25vZGVfbW9kdWxlcy9uYXRpdmUtcHJvbWlzZS1vbmx5L25wby5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL0FjdGlvbk1ldGhvZHMuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9LZWVwLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvTGlzdGVuZXJNZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvTGlzdGVuZXJNaXhpbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL1B1Ymxpc2hlck1ldGhvZHMuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9TdG9yZU1ldGhvZHMuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9iaW5kTWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2Nvbm5lY3QuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9jb25uZWN0RmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvY3JlYXRlQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvY3JlYXRlU3RvcmUuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2pvaW5zLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvbGlzdGVuVG8uanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9saXN0ZW5Ub01hbnkuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9taXhlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYXBwLmpzJyk7XG52YXIgUGFzc0Zvcm0gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGFzc2Zvcm0uanMnKTtcblxudmFyIEJvZHkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQm9keVwiLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcIndyYXBwZXJcIn0sIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFBhc3NGb3JtLCBudWxsKVxuXHRcdFx0KVxuXHRcdClcblx0fVxufSk7XG5cblJlYWN0LnJlbmRlcihcblx0UmVhY3QuY3JlYXRlRWxlbWVudChCb2R5LCBudWxsKSxcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdW50Jylcbik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIFZhcmlhYmxlU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZS92YXJpYWJsZXN0b3JlLmpzJyk7XG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XG5cbnZhciBBcHAgPSBtb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJleHBvcnRzXCIsXG5cdG1peGluczogW1JlZmx1eC5jb25uZWN0KFZhcmlhYmxlU3RvcmUsICd2YXJpYWJsZScpXSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoe1xuXHRcdFx0cGFzc3dvcmQ6ICcnXG5cdFx0fSlcblx0fSxcblx0cHJlc3M6IGZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblx0XHRpZiAoZS5rZXlDb2RlID09IDI3KSB7XG5cdFx0YWxlcnQoXCJFc2NhcGVcIik7XG5cdFx0fVxuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdHZhciBuZXdwYXNzID0gZS50YXJnZXQudmFsdWU7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRwYXNzd29yZDogbmV3cGFzc1xuXHRcdH0pXG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHR2YXIgdmFyaWFibGUgPSB0aGlzLnN0YXRlLnZhcmlhYmxlLCBhcnJheT1bXSwgZXJyb3JzID0gW107XG4gICAgdmFyIHBhc3N3b3JkID0gdGhpcy5zdGF0ZS5wYXNzd29yZDtcbiAgICBpZihwYXNzd29yZCl7XG4gICAgICBpZihwYXNzd29yZC5sZW5ndGggPCB2YXJpYWJsZS5sZW5ndGhzKXtcbiAgXHRcdFx0ZXJyb3JzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFwiUGFzc3dvcmQgaXMgbm90IGxvbmcgZW5vdWdoLlwiKSk7XG4gIFx0XHR9XG4gIFx0XHRpZihwYXNzd29yZC5tYXRjaCgvW2EtekEtWl0vZykubGVuZ3RoIDwgdmFyaWFibGUubGV0dGVycyl7XG4gIFx0XHRcdGVycm9ycy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcIlBhc3N3b3JkIGRvZXMgbm90IGNvbnRhaW4gZW5vdWdoIExldHRlcnMuXCIpKVxuICBcdFx0fVxuICAgICAgdmFyIG51bU1hdGNoID0gcGFzc3dvcmQubWF0Y2goL1xcZC9nKSB8fCBbXTtcbiAgXHRcdGlmKG51bU1hdGNoLmxlbmd0aCA8ICh2YXJpYWJsZS5udW1iZXJzIHx8IDAgKSl7XG4gIFx0XHRcdGVycm9ycy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcIlBhc3N3b3JkIGRvZXMgbm90IGNvbnRhaW4gZW5vdWdoIG51bWJlcnMuXCIpKVxuICBcdFx0fVxuICBcdFx0XG4gICAgICAvLyB2YXIgc3BlY2lhbHMgPSB2YXJpYWJsZS5zcGVjaWFscyB8fCAnJztcbiAgICAgIC8vIGZvcih2YXIgaiA9IDA7IGogPCBzcGVjaWFscy5sZW5ndGg7IGorKyl7XG4gICAgICAvLyAgIHZhciByID0gbmV3IFJlZ0V4cChzcGVjaWFsc1tqXSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHBhc3N3b3JkLnNlYXJjaChyKSk7XG4gICAgICAvLyAgIGlmKCFwYXNzd29yZC5zZWFyY2gocikpe1xuICAgICAgLy8gICAgIGVycm9ycy5wdXNoKDxsaT5QYXNzd29yZCBpcyBtaXNzaW5nIGEge3NwZWNpYWxzW2pdfS48L2xpPilcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuICBcdFx0aWYocGFzc3dvcmQubWF0Y2goL1thLXpBLVpdL2cpLmxlbmd0aCA8IHZhcmlhYmxlLmNhcGl0YWxzKXtcbiAgXHRcdFx0ZXJyb3JzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFwiUGFzc3dvcmQgZG9lcyBub3QgaGF2ZSBlbm91Z2ggY2FwaXRhbCBsZXR0ZXJzLlwiKSlcbiAgXHRcdH1cbiAgICB9XG5cdFx0Ly8gZm9yKHZhciBpIGluIHZhcmlhYmxlKXtcblx0XHQvLyBcdGFycmF5LnB1c2goPGRpdj57aX0tPS17dmFyaWFibGVbaV19PC9kaXY+KTtcblx0XHQvLyB9XG5cdFx0cmV0dXJuKFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtpZDogXCJwYXNzd29yZFwiLCB2YWx1ZTogdmFyaWFibGUubGVuZ3RoLCBvbkNoYW5nZTogdGhpcy5jaGFuZ2UsIG9uS2V5RG93bjogdGhpcy5wcmVzc30pLCBcblx0XHRcdFx0YXJyYXksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXG5cdFx0XHRcdFx0ZXJyb3JzXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpXG5cdH1cbn0pIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuLi9zdG9yZS9hY3Rpb25zLmpzJyk7XG5cbnZhciBQYXNzRm9ybSA9IG1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcImV4cG9ydHNcIixcblx0Y2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRhY3Rpb25zW2UudGFyZ2V0LmlkXShlLnRhcmdldC52YWx1ZSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCBudWxsLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiLCBudWxsLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIFwiVmFyaWFibGVcIiksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgXCJMaW1pdFwiKVxuXHRcdFx0KVxuXHRcdFx0KSwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgbnVsbCwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBcIlJlcXVpcmVkIExlbmd0aFwiKSwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge2lkOiBcImxlbmd0aHNcIiwgb25DaGFuZ2U6IHRoaXMuY2hhbmdlfSkpXG5cdFx0XHQpLCBcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIFwiUmVxdWlyZWQgTGV0dGVyIENvdW50XCIpLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7aWQ6IFwibGV0dGVyc1wiLCBvbkNoYW5nZTogdGhpcy5jaGFuZ2V9KSlcblx0XHRcdCksIFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgXCJSZXF1aXJlZCBOdW1iZXIgQ291bnRcIiksIFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtpZDogXCJudW1iZXJzXCIsIG9uQ2hhbmdlOiB0aGlzLmNoYW5nZX0pKVxuXHRcdFx0KSwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBcIlNwZWNpYWwgQ2hhcmFjdGVyc1wiKSwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge2lkOiBcInNwZWNpYWxDaGFyXCIsIG9uQ2hhbmdlOiB0aGlzLmNoYW5nZX0pKVxuXHRcdFx0KSwgXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBcIkNhcGl0YWwgTGV0dGVyc1wiKSwgXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge2lkOiBcImNhcExldHRlcnNcIiwgb25DaGFuZ2U6IHRoaXMuY2hhbmdlfSkpXG5cdFx0XHQpXG5cdFx0XHQpXG5cdFx0KSlcblx0fVxufSkiLCIndXNlIHN0cmljdCc7XG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XG5cbnZhciBhY3Rpb25zID0gbW9kdWxlLmV4cG9ydHMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyhbXG5cdCdsZW5ndGhzJyxcblx0J2xldHRlcnMnLFxuXHQnbnVtYmVycycsXG5cdCdzcGVjaWFsQ2hhcicsXG5cdCdjYXBMZXR0ZXJzJ1xuXSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcbnZhciBSZWZsdXggPSByZXF1aXJlKCdyZWZsdXgnKTtcblxudmFyIFZhcmlhYmxlU3RvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IFJlZmx1eC5jcmVhdGVTdG9yZSh7XG5cdGxpc3RlbmFibGVzOiBbYWN0aW9uc10sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcblx0XHR2YXIgdmFyaWFibGUgPSB7fTtcblx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZSA9IHZhcmlhYmxlO1xuXHR9LFxuXHRvbkxlbmd0aHM6IGZ1bmN0aW9uKHZhbHVlKXtcblx0XHR2YXIgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlO1xuXHRcdHZhcmlhYmxlLmxlbmd0aHMgPSBwYXJzZUludCh2YWx1ZSk7XG5cdFx0dGhpcy52YXJpYWJsZSA9IHZhcmlhYmxlO1xuXHRcdHRoaXMudHJpZ2dlcih0aGlzLnZhcmlhYmxlKVxuXHR9LFxuXHRvbkxldHRlcnM6IGZ1bmN0aW9uKHZhbHVlKXtcblx0XHR2YXIgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlO1xuXHRcdHZhcmlhYmxlLmxldHRlcnMgPSBwYXJzZUludCh2YWx1ZSk7XG5cdFx0dGhpcy52YXJpYWJsZSA9IHZhcmlhYmxlO1xuXHRcdHRoaXMudHJpZ2dlcih0aGlzLnZhcmlhYmxlKVx0XG5cdH0sXG5cdG9uTnVtYmVyczogZnVuY3Rpb24odmFsdWUpe1xuXHRcdHZhciB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGU7XG5cdFx0dmFyaWFibGUubnVtYmVycyA9IHBhcnNlSW50KHZhbHVlKTtcblx0XHR0aGlzLnZhcmlhYmxlID0gdmFyaWFibGU7XG5cdFx0dGhpcy50cmlnZ2VyKHRoaXMudmFyaWFibGUpXHRcblx0fSxcblx0b25TcGVjaWFsQ2hhcjogZnVuY3Rpb24odmFsdWUpe1xuXHRcdHZhciB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGU7XG5cdFx0dmFyaWFibGUuc3BlY2lhbHMgPSB2YWx1ZTtcblx0XHR0aGlzLnZhcmlhYmxlID0gdmFyaWFibGU7XG5cdFx0dGhpcy50cmlnZ2VyKHRoaXMudmFyaWFibGUpXHRcblx0fSxcblx0b25DYXBMZXR0ZXJzOiBmdW5jdGlvbih2YWx1ZSl7XG5cdFx0dmFyIHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZTtcblx0XHR2YXJpYWJsZS5jYXBpdGFscyA9IHBhcnNlSW50KHZhbHVlKTtcblx0XHR0aGlzLnZhcmlhYmxlID0gdmFyaWFibGU7XG5cdFx0dGhpcy50cmlnZ2VyKHRoaXMudmFyaWFibGUpXHRcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIEV2ZW50RW1pdHRlciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBFdmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgQ29udGV4dCBmb3IgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgZW1pdCBvbmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIE1pbmltYWwgRXZlbnRFbWl0dGVyIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkgeyAvKiBOb3RoaW5nIHRvIHNldCAqLyB9XG5cbi8qKlxuICogSG9sZHMgdGhlIGFzc2lnbmVkIEV2ZW50RW1pdHRlcnMgYnkgbmFtZS5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgYXNzaWduZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGxpc3RlZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gW107XG4gIGlmICh0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSByZXR1cm4gW3RoaXMuX2V2ZW50c1tldmVudF0uZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSB0aGlzLl9ldmVudHNbZXZlbnRdW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgbGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgRXZlbnRMaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIGFuIEV2ZW50TGlzdGVuZXIgdGhhdCdzIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzLCB0cnVlKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZlbnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSwgbGlzdGVuZXJcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3ZSB3YW50IHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciB0aGF0IHdlIG5lZWQgdG8gZmluZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmNlIGxpc3RlbmVycy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIG9uY2UpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBldmVudHMgPSBbXTtcblxuICBpZiAoZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLmZuICYmIChsaXN0ZW5lcnMuZm4gIT09IGZuIHx8IChvbmNlICYmICFsaXN0ZW5lcnMub25jZSkpKSB7XG4gICAgICBldmVudHMucHVzaChsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICBpZiAoIWxpc3RlbmVycy5mbikgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHwgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgLy9cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBvciBvbmx5IHRoZSBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3YW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcblxuICBpZiAoZXZlbnQpIGRlbGV0ZSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICBlbHNlIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgYXBwbHkgYW55bW9yZS5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbiIsIi8qISBOYXRpdmUgUHJvbWlzZSBPbmx5XG4gICAgdjAuNy44LWEgKGMpIEt5bGUgU2ltcHNvblxuICAgIE1JVCBMaWNlbnNlOiBodHRwOi8vZ2V0aWZ5Lm1pdC1saWNlbnNlLm9yZ1xuKi9cbiFmdW5jdGlvbih0LG4sZSl7blt0XT1uW3RdfHxlKCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9blt0XTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShmdW5jdGlvbigpe3JldHVybiBuW3RdfSl9KFwiUHJvbWlzZVwiLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOnRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsbil7bC5hZGQodCxuKSxofHwoaD15KGwuZHJhaW4pKX1mdW5jdGlvbiBuKHQpe3ZhciBuLGU9dHlwZW9mIHQ7cmV0dXJuIG51bGw9PXR8fFwib2JqZWN0XCIhPWUmJlwiZnVuY3Rpb25cIiE9ZXx8KG49dC50aGVuKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246ITF9ZnVuY3Rpb24gZSgpe2Zvcih2YXIgdD0wO3Q8dGhpcy5jaGFpbi5sZW5ndGg7dCsrKW8odGhpcywxPT09dGhpcy5zdGF0ZT90aGlzLmNoYWluW3RdLnN1Y2Nlc3M6dGhpcy5jaGFpblt0XS5mYWlsdXJlLHRoaXMuY2hhaW5bdF0pO3RoaXMuY2hhaW4ubGVuZ3RoPTB9ZnVuY3Rpb24gbyh0LGUsbyl7dmFyIHIsaTt0cnl7ZT09PSExP28ucmVqZWN0KHQubXNnKToocj1lPT09ITA/dC5tc2c6ZS5jYWxsKHZvaWQgMCx0Lm1zZykscj09PW8ucHJvbWlzZT9vLnJlamVjdChUeXBlRXJyb3IoXCJQcm9taXNlLWNoYWluIGN5Y2xlXCIpKTooaT1uKHIpKT9pLmNhbGwocixvLnJlc29sdmUsby5yZWplY3QpOm8ucmVzb2x2ZShyKSl9Y2F0Y2goYyl7by5yZWplY3QoYyl9fWZ1bmN0aW9uIHIobyl7dmFyIGMsdSxhPXRoaXM7aWYoIWEudHJpZ2dlcmVkKXthLnRyaWdnZXJlZD0hMCxhLmRlZiYmKGE9YS5kZWYpO3RyeXsoYz1uKG8pKT8odT1uZXcgZihhKSxjLmNhbGwobyxmdW5jdGlvbigpe3IuYXBwbHkodSxhcmd1bWVudHMpfSxmdW5jdGlvbigpe2kuYXBwbHkodSxhcmd1bWVudHMpfSkpOihhLm1zZz1vLGEuc3RhdGU9MSxhLmNoYWluLmxlbmd0aD4wJiZ0KGUsYSkpfWNhdGNoKHMpe2kuY2FsbCh1fHxuZXcgZihhKSxzKX19fWZ1bmN0aW9uIGkobil7dmFyIG89dGhpcztvLnRyaWdnZXJlZHx8KG8udHJpZ2dlcmVkPSEwLG8uZGVmJiYobz1vLmRlZiksby5tc2c9bixvLnN0YXRlPTIsby5jaGFpbi5sZW5ndGg+MCYmdChlLG8pKX1mdW5jdGlvbiBjKHQsbixlLG8pe2Zvcih2YXIgcj0wO3I8bi5sZW5ndGg7cisrKSFmdW5jdGlvbihyKXt0LnJlc29sdmUobltyXSkudGhlbihmdW5jdGlvbih0KXtlKHIsdCl9LG8pfShyKX1mdW5jdGlvbiBmKHQpe3RoaXMuZGVmPXQsdGhpcy50cmlnZ2VyZWQ9ITF9ZnVuY3Rpb24gdSh0KXt0aGlzLnByb21pc2U9dCx0aGlzLnN0YXRlPTAsdGhpcy50cmlnZ2VyZWQ9ITEsdGhpcy5jaGFpbj1bXSx0aGlzLm1zZz12b2lkIDB9ZnVuY3Rpb24gYShuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2lmKDAhPT10aGlzLl9fTlBPX18pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgcHJvbWlzZVwiKTt0aGlzLl9fTlBPX189MTt2YXIgbz1uZXcgdSh0aGlzKTt0aGlzLnRoZW49ZnVuY3Rpb24obixyKXt2YXIgaT17c3VjY2VzczpcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246ITAsZmFpbHVyZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiByP3I6ITF9O3JldHVybiBpLnByb21pc2U9bmV3IHRoaXMuY29uc3RydWN0b3IoZnVuY3Rpb24odCxuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2kucmVzb2x2ZT10LGkucmVqZWN0PW59KSxvLmNoYWluLnB1c2goaSksMCE9PW8uc3RhdGUmJnQoZSxvKSxpLnByb21pc2V9LHRoaXNbXCJjYXRjaFwiXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCx0KX07dHJ5e24uY2FsbCh2b2lkIDAsZnVuY3Rpb24odCl7ci5jYWxsKG8sdCl9LGZ1bmN0aW9uKHQpe2kuY2FsbChvLHQpfSl9Y2F0Y2goYyl7aS5jYWxsKG8sYyl9fXZhciBzLGgsbCxwPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcseT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2V0SW1tZWRpYXRlP2Z1bmN0aW9uKHQpe3JldHVybiBzZXRJbW1lZGlhdGUodCl9OnNldFRpbWVvdXQ7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcInhcIix7fSkscz1mdW5jdGlvbih0LG4sZSxvKXtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7dmFsdWU6ZSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6byE9PSExfSl9fWNhdGNoKGQpe3M9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0W25dPWUsdH19bD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuKXt0aGlzLmZuPXQsdGhpcy5zZWxmPW4sdGhpcy5uZXh0PXZvaWQgMH12YXIgbixlLG87cmV0dXJue2FkZDpmdW5jdGlvbihyLGkpe289bmV3IHQocixpKSxlP2UubmV4dD1vOm49byxlPW8sbz12b2lkIDB9LGRyYWluOmZ1bmN0aW9uKCl7dmFyIHQ9bjtmb3Iobj1lPWg9dm9pZCAwO3Q7KXQuZm4uY2FsbCh0LnNlbGYpLHQ9dC5uZXh0fX19KCk7dmFyIGc9cyh7fSxcImNvbnN0cnVjdG9yXCIsYSwhMSk7cmV0dXJuIGEucHJvdG90eXBlPWcscyhnLFwiX19OUE9fX1wiLDAsITEpLHMoYSxcInJlc29sdmVcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVybiB0JiZcIm9iamVjdFwiPT10eXBlb2YgdCYmMT09PXQuX19OUE9fXz90Om5ldyBuKGZ1bmN0aW9uKG4sZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtuKHQpfSl9KSxzKGEsXCJyZWplY3RcIixmdW5jdGlvbih0KXtyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24obixlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBufHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2UodCl9KX0pLHMoYSxcImFsbFwiLGZ1bmN0aW9uKHQpe3ZhciBuPXRoaXM7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiIT1wLmNhbGwodCk/bi5yZWplY3QoVHlwZUVycm9yKFwiTm90IGFuIGFycmF5XCIpKTowPT09dC5sZW5ndGg/bi5yZXNvbHZlKFtdKTpuZXcgbihmdW5jdGlvbihlLG8pe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7dmFyIHI9dC5sZW5ndGgsaT1BcnJheShyKSxmPTA7YyhuLHQsZnVuY3Rpb24odCxuKXtpW3RdPW4sKytmPT09ciYmZShpKX0sbyl9KX0pLHMoYSxcInJhY2VcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVyblwiW29iamVjdCBBcnJheV1cIiE9cC5jYWxsKHQpP24ucmVqZWN0KFR5cGVFcnJvcihcIk5vdCBhbiBhcnJheVwiKSk6bmV3IG4oZnVuY3Rpb24oZSxvKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBvKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2Mobix0LGZ1bmN0aW9uKHQsbil7ZShuKX0sbyl9KX0pLGF9KTtcbiIsIi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyB0aGF0IHlvdSB3YW50IHRvIGluY2x1ZGUgaW4gYWxsIGFjdGlvbnMuXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlQWN0aW9uYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG59O1xuIiwiZXhwb3J0cy5jcmVhdGVkU3RvcmVzID0gW107XG5cbmV4cG9ydHMuY3JlYXRlZEFjdGlvbnMgPSBbXTtcblxuZXhwb3J0cy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHdoaWxlKGV4cG9ydHMuY3JlYXRlZFN0b3Jlcy5sZW5ndGgpIHtcbiAgICAgICAgZXhwb3J0cy5jcmVhdGVkU3RvcmVzLnBvcCgpO1xuICAgIH1cbiAgICB3aGlsZShleHBvcnRzLmNyZWF0ZWRBY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICBleHBvcnRzLmNyZWF0ZWRBY3Rpb25zLnBvcCgpO1xuICAgIH1cbn07XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBtYWtlciA9IHJlcXVpcmUoJy4vam9pbnMnKS5pbnN0YW5jZUpvaW5DcmVhdG9yO1xuXG4vKipcbiAqIEV4dHJhY3QgY2hpbGQgbGlzdGVuYWJsZXMgZnJvbSBhIHBhcmVudCBmcm9tIHRoZWlyXG4gKiBjaGlsZHJlbiBwcm9wZXJ0eSBhbmQgcmV0dXJuIHRoZW0gaW4gYSBrZXllZCBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZSBUaGUgcGFyZW50IGxpc3RlbmFibGVcbiAqL1xudmFyIG1hcENoaWxkTGlzdGVuYWJsZXMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlKSB7XG4gICAgdmFyIGkgPSAwLCBjaGlsZHJlbiA9IHt9LCBjaGlsZE5hbWU7XG4gICAgZm9yICg7aSA8IChsaXN0ZW5hYmxlLmNoaWxkcmVufHxbXSkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGROYW1lID0gbGlzdGVuYWJsZS5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYobGlzdGVuYWJsZVtjaGlsZE5hbWVdKXtcbiAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV0gPSBsaXN0ZW5hYmxlW2NoaWxkTmFtZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgZmxhdCBkaWN0aW9uYXJ5IG9mIGFsbCBsaXN0ZW5hYmxlcyBpbmNsdWRpbmcgdGhlaXJcbiAqIHBvc3NpYmxlIGNoaWxkcmVuIChyZWN1cnNpdmVseSksIGNvbmNhdGVuYXRpbmcgbmFtZXMgaW4gY2FtZWxDYXNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5hYmxlcyBUaGUgdG9wLWxldmVsIGxpc3RlbmFibGVzXG4gKi9cbnZhciBmbGF0dGVuTGlzdGVuYWJsZXMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlcykge1xuICAgIHZhciBmbGF0dGVuZWQgPSB7fTtcbiAgICBmb3IodmFyIGtleSBpbiBsaXN0ZW5hYmxlcyl7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlID0gbGlzdGVuYWJsZXNba2V5XTtcbiAgICAgICAgdmFyIGNoaWxkTWFwID0gbWFwQ2hpbGRMaXN0ZW5hYmxlcyhsaXN0ZW5hYmxlKTtcblxuICAgICAgICAvLyByZWN1cnNpdmVseSBmbGF0dGVuIGNoaWxkcmVuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGZsYXR0ZW5MaXN0ZW5hYmxlcyhjaGlsZE1hcCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBwcmltYXJ5IGxpc3RlbmFibGUgYW5kIGNoaWxyZW5cbiAgICAgICAgZmxhdHRlbmVkW2tleV0gPSBsaXN0ZW5hYmxlO1xuICAgICAgICBmb3IodmFyIGNoaWxkS2V5IGluIGNoaWxkcmVuKXtcbiAgICAgICAgICAgIHZhciBjaGlsZExpc3RlbmFibGUgPSBjaGlsZHJlbltjaGlsZEtleV07XG4gICAgICAgICAgICBmbGF0dGVuZWRba2V5ICsgXy5jYXBpdGFsaXplKGNoaWxkS2V5KV0gPSBjaGlsZExpc3RlbmFibGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmxhdHRlbmVkO1xufTtcblxuLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIHJlbGF0ZWQgdG8gbGlzdGVuaW5nLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICAqIEFuIGludGVybmFsIHV0aWxpdHkgZnVuY3Rpb24gdXNlZCBieSBgdmFsaWRhdGVMaXN0ZW5pbmdgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgbGlzdGVuYWJsZSB3ZSB3YW50IHRvIHNlYXJjaCBmb3JcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVGhlIHJlc3VsdCBvZiBhIHJlY3Vyc2l2ZSBzZWFyY2ggYW1vbmcgYHRoaXMuc3Vic2NyaXB0aW9uc2BcbiAgICAgKi9cbiAgICBoYXNMaXN0ZW5lcjogZnVuY3Rpb24obGlzdGVuYWJsZSkge1xuICAgICAgICB2YXIgaSA9IDAsIGosIGxpc3RlbmVyLCBsaXN0ZW5hYmxlcztcbiAgICAgICAgZm9yICg7aSA8ICh0aGlzLnN1YnNjcmlwdGlvbnN8fFtdKS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGlzdGVuYWJsZXMgPSBbXS5jb25jYXQodGhpcy5zdWJzY3JpcHRpb25zW2ldLmxpc3RlbmFibGUpO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpc3RlbmFibGVzLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmFibGVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuYWJsZSB8fCBsaXN0ZW5lci5oYXNMaXN0ZW5lciAmJiBsaXN0ZW5lci5oYXNMaXN0ZW5lcihsaXN0ZW5hYmxlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBIGNvbnZlbmllbmNlIG1ldGhvZCB0aGF0IGxpc3RlbnMgdG8gYWxsIGxpc3RlbmFibGVzIGluIHRoZSBnaXZlbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZXMgQW4gb2JqZWN0IG9mIGxpc3RlbmFibGVzLiBLZXlzIHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjayBtZXRob2QgbmFtZXMuXG4gICAgICovXG4gICAgbGlzdGVuVG9NYW55OiBmdW5jdGlvbihsaXN0ZW5hYmxlcyl7XG4gICAgICAgIHZhciBhbGxMaXN0ZW5hYmxlcyA9IGZsYXR0ZW5MaXN0ZW5hYmxlcyhsaXN0ZW5hYmxlcyk7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGFsbExpc3RlbmFibGVzKXtcbiAgICAgICAgICAgIHZhciBjYm5hbWUgPSBfLmNhbGxiYWNrTmFtZShrZXkpLFxuICAgICAgICAgICAgICAgIGxvY2FsbmFtZSA9IHRoaXNbY2JuYW1lXSA/IGNibmFtZSA6IHRoaXNba2V5XSA/IGtleSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChsb2NhbG5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG8oYWxsTGlzdGVuYWJsZXNba2V5XSxsb2NhbG5hbWUsdGhpc1tjYm5hbWUrXCJEZWZhdWx0XCJdfHx0aGlzW2xvY2FsbmFtZStcIkRlZmF1bHRcIl18fGxvY2FsbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IGNvbnRleHQgY2FuIGxpc3RlbiB0byB0aGUgc3VwcGxpZWQgbGlzdGVuYWJsZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gICAgICogIGxpc3RlbmVkIHRvLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBBbiBlcnJvciBtZXNzYWdlLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgd2FzIG5vIHByb2JsZW0uXG4gICAgICovXG4gICAgdmFsaWRhdGVMaXN0ZW5pbmc6IGZ1bmN0aW9uKGxpc3RlbmFibGUpe1xuICAgICAgICBpZiAobGlzdGVuYWJsZSA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIFwiTGlzdGVuZXIgaXMgbm90IGFibGUgdG8gbGlzdGVuIHRvIGl0c2VsZlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUubGlzdGVuKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmFibGUgKyBcIiBpcyBtaXNzaW5nIGEgbGlzdGVuIG1ldGhvZFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5hYmxlLmhhc0xpc3RlbmVyICYmIGxpc3RlbmFibGUuaGFzTGlzdGVuZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkxpc3RlbmVyIGNhbm5vdCBsaXN0ZW4gdG8gdGhpcyBsaXN0ZW5hYmxlIGJlY2F1c2Ugb2YgY2lyY3VsYXIgbG9vcFwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBzdWJzY3JpcHRpb24gdG8gdGhlIGdpdmVuIGxpc3RlbmFibGUgZm9yIHRoZSBjb250ZXh0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gICAgICogIGxpc3RlbmVkIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGRlZmF1bHQgaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyB0aGUgb2JqZWN0IGJlaW5nIGxpc3RlbmVkIHRvXG4gICAgICovXG4gICAgbGlzdGVuVG86IGZ1bmN0aW9uKGxpc3RlbmFibGUsIGNhbGxiYWNrLCBkZWZhdWx0Q2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRlc3ViLCB1bnN1YnNjcmliZXIsIHN1YnNjcmlwdGlvbm9iaiwgc3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuc3Vic2NyaXB0aW9ucyB8fCBbXTtcbiAgICAgICAgXy50aHJvd0lmKHRoaXMudmFsaWRhdGVMaXN0ZW5pbmcobGlzdGVuYWJsZSkpO1xuICAgICAgICB0aGlzLmZldGNoSW5pdGlhbFN0YXRlKGxpc3RlbmFibGUsIGRlZmF1bHRDYWxsYmFjayk7XG4gICAgICAgIGRlc3ViID0gbGlzdGVuYWJsZS5saXN0ZW4odGhpc1tjYWxsYmFja118fGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgdW5zdWJzY3JpYmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzdWJzLmluZGV4T2Yoc3Vic2NyaXB0aW9ub2JqKTtcbiAgICAgICAgICAgIF8udGhyb3dJZihpbmRleCA9PT0gLTEsJ1RyaWVkIHRvIHJlbW92ZSBsaXN0ZW4gYWxyZWFkeSBnb25lIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICAgICAgc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVzdWIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3Vic2NyaXB0aW9ub2JqID0ge1xuICAgICAgICAgICAgc3RvcDogdW5zdWJzY3JpYmVyLFxuICAgICAgICAgICAgbGlzdGVuYWJsZTogbGlzdGVuYWJsZVxuICAgICAgICB9O1xuICAgICAgICBzdWJzLnB1c2goc3Vic2NyaXB0aW9ub2JqKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbm9iajtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgbGlzdGVuaW5nIHRvIGEgc2luZ2xlIGxpc3RlbmFibGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIFRoZSBhY3Rpb24gb3Igc3RvcmUgd2Ugbm8gbG9uZ2VyIHdhbnQgdG8gbGlzdGVuIHRvXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgYSBzdWJzY3JpcHRpb24gd2FzIGZvdW5kIGFuZCByZW1vdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZ1RvOiBmdW5jdGlvbihsaXN0ZW5hYmxlKXtcbiAgICAgICAgdmFyIHN1YiwgaSA9IDAsIHN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW107XG4gICAgICAgIGZvcig7aSA8IHN1YnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc3ViID0gc3Vic1tpXTtcbiAgICAgICAgICAgIGlmIChzdWIubGlzdGVuYWJsZSA9PT0gbGlzdGVuYWJsZSl7XG4gICAgICAgICAgICAgICAgc3ViLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBfLnRocm93SWYoc3Vicy5pbmRleE9mKHN1YikhPT0tMSwnRmFpbGVkIHRvIHJlbW92ZSBsaXN0ZW4gZnJvbSBzdWJzY3JpcHRpb25zIGxpc3QhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgZW1wdGllcyBzdWJzY3JpcHRpb25zIGFycmF5XG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZ1RvQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcmVtYWluaW5nLCBzdWJzID0gdGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdO1xuICAgICAgICB3aGlsZSgocmVtYWluaW5nPXN1YnMubGVuZ3RoKSl7XG4gICAgICAgICAgICBzdWJzWzBdLnN0b3AoKTtcbiAgICAgICAgICAgIF8udGhyb3dJZihzdWJzLmxlbmd0aCE9PXJlbWFpbmluZy0xLCdGYWlsZWQgdG8gcmVtb3ZlIGxpc3RlbiBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluIGBsaXN0ZW5Ub2AuIEZldGNoZXMgaW5pdGlhbCBkYXRhIGZyb20gYSBwdWJsaXNoZXIgaWYgaXQgaGFzIGEgYGdldEluaXRpYWxTdGF0ZWAgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIFRoZSBwdWJsaXNoZXIgd2Ugd2FudCB0byBnZXQgaW5pdGlhbCBzdGF0ZSBmcm9tXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGRlZmF1bHRDYWxsYmFjayBUaGUgbWV0aG9kIHRvIHJlY2VpdmUgdGhlIGRhdGFcbiAgICAgKi9cbiAgICBmZXRjaEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKGxpc3RlbmFibGUsIGRlZmF1bHRDYWxsYmFjaykge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2sgPSAoZGVmYXVsdENhbGxiYWNrICYmIHRoaXNbZGVmYXVsdENhbGxiYWNrXSkgfHwgZGVmYXVsdENhbGxiYWNrO1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGRlZmF1bHRDYWxsYmFjaykgJiYgXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgXy5pc0Z1bmN0aW9uKGRhdGEudGhlbikpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjay5hcHBseShtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdENhbGxiYWNrLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggdGhlIGxhc3QgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pblRyYWlsaW5nOiBtYWtlcihcImxhc3RcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQgYXQgbGVhc3Qgb25jZS5cbiAgICAgKiBJdCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgZmlyc3QgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pbkxlYWRpbmc6IG1ha2VyKFwiZmlyc3RcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQgYXQgbGVhc3Qgb25jZS5cbiAgICAgKiBJdCB3aWxsIGJlIGludm9rZWQgd2l0aCBhbGwgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pbkNvbmNhdDogbWFrZXIoXCJhbGxcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQuXG4gICAgICogSWYgYSBjYWxsYmFjayB0cmlnZ2VycyB0d2ljZSBiZWZvcmUgdGhhdCBoYXBwZW5zLCBhbiBlcnJvciBpcyB0aHJvd24uXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pblN0cmljdDogbWFrZXIoXCJzdHJpY3RcIilcbn07XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBMaXN0ZW5lck1ldGhvZHMgPSByZXF1aXJlKCcuL0xpc3RlbmVyTWV0aG9kcycpO1xuXG4vKipcbiAqIEEgbW9kdWxlIG1lYW50IHRvIGJlIGNvbnN1bWVkIGFzIGEgbWl4aW4gYnkgYSBSZWFjdCBjb21wb25lbnQuIFN1cHBsaWVzIHRoZSBtZXRob2RzIGZyb21cbiAqIGBMaXN0ZW5lck1ldGhvZHNgIG1peGluIGFuZCB0YWtlcyBjYXJlIG9mIHRlYXJkb3duIG9mIHN1YnNjcmlwdGlvbnMuXG4gKiBOb3RlIHRoYXQgaWYgeW91J3JlIHVzaW5nIHRoZSBgY29ubmVjdGAgbWl4aW4geW91IGRvbid0IG5lZWQgdGhpcyBtaXhpbiwgYXMgY29ubmVjdCB3aWxsXG4gKiBpbXBvcnQgZXZlcnl0aGluZyB0aGlzIG1peGluIGNvbnRhaW5zIVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF8uZXh0ZW5kKHtcblxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBhbGwgbGlzdGVuZXIgcHJldmlvdXNseSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBMaXN0ZW5lck1ldGhvZHMuc3RvcExpc3RlbmluZ1RvQWxsXG5cbn0sIExpc3RlbmVyTWV0aG9kcyk7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIGZvciBvYmplY3QgdGhhdCB5b3Ugd2FudCB0byBiZSBhYmxlIHRvIGxpc3RlbiB0by5cbiAqIFRoaXMgbW9kdWxlIGlzIGNvbnN1bWVkIGJ5IGBjcmVhdGVTdG9yZWAgYW5kIGBjcmVhdGVBY3Rpb25gXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLyoqXG4gICAgICogSG9vayB1c2VkIGJ5IHRoZSBwdWJsaXNoZXIgdGhhdCBpcyBpbnZva2VkIGJlZm9yZSBlbWl0dGluZ1xuICAgICAqIGFuZCBiZWZvcmUgYHNob3VsZEVtaXRgLiBUaGUgYXJndW1lbnRzIGFyZSB0aGUgb25lcyB0aGF0IHRoZSBhY3Rpb25cbiAgICAgKiBpcyBpbnZva2VkIHdpdGguIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBzb21ldGhpbmcgb3RoZXIgdGhhblxuICAgICAqIHVuZGVmaW5lZCwgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiBhcyBhcmd1bWVudHMgZm9yIHNob3VsZEVtaXQgYW5kXG4gICAgICogZW1pc3Npb24uXG4gICAgICovXG4gICAgcHJlRW1pdDogZnVuY3Rpb24oKSB7fSxcblxuICAgIC8qKlxuICAgICAqIEhvb2sgdXNlZCBieSB0aGUgcHVibGlzaGVyIGFmdGVyIGBwcmVFbWl0YCB0byBkZXRlcm1pbmUgaWYgdGhlXG4gICAgICogZXZlbnQgc2hvdWxkIGJlIGVtaXR0ZWQgd2l0aCBnaXZlbiBhcmd1bWVudHMuIFRoaXMgbWF5IGJlIG92ZXJyaWRkZW5cbiAgICAgKiBpbiB5b3VyIGFwcGxpY2F0aW9uLCBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGFsd2F5cyByZXR1cm5zIHRydWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBldmVudCBzaG91bGQgYmUgZW1pdHRlZFxuICAgICAqL1xuICAgIHNob3VsZEVtaXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBhY3Rpb24gdHJpZ2dlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IFtvcHRpb25hbF0gYmluZENvbnRleHQgVGhlIGNvbnRleHQgdG8gYmluZCB0aGUgY2FsbGJhY2sgd2l0aFxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQ2FsbGJhY2sgdGhhdCB1bnN1YnNjcmliZXMgdGhlIHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIGxpc3RlbjogZnVuY3Rpb24oY2FsbGJhY2ssIGJpbmRDb250ZXh0KSB7XG4gICAgICAgIGJpbmRDb250ZXh0ID0gYmluZENvbnRleHQgfHwgdGhpcztcbiAgICAgICAgdmFyIGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhYm9ydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShiaW5kQ29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIG1lID0gdGhpcywgYWJvcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuYWRkTGlzdGVuZXIodGhpcy5ldmVudExhYmVsLCBldmVudEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG1lLmVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobWUuZXZlbnRMYWJlbCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIGhhbmRsZXJzIHRvIHByb21pc2UgdGhhdCB0cmlnZ2VyIHRoZSBjb21wbGV0ZWQgYW5kIGZhaWxlZFxuICAgICAqIGNoaWxkIHB1Ymxpc2hlcnMsIGlmIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgcHJvbWlzZSB0byBhdHRhY2ggdG9cbiAgICAgKi9cbiAgICBwcm9taXNlOiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGNhbkhhbmRsZVByb21pc2UgPVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdjb21wbGV0ZWQnKSA+PSAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmluZGV4T2YoJ2ZhaWxlZCcpID49IDA7XG5cbiAgICAgICAgaWYgKCFjYW5IYW5kbGVQcm9taXNlKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHVibGlzaGVyIG11c3QgaGF2ZSBcImNvbXBsZXRlZFwiIGFuZCBcImZhaWxlZFwiIGNoaWxkIHB1Ymxpc2hlcnMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lLmNvbXBsZXRlZChyZXNwb25zZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbWUuZmFpbGVkKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBhY3Rpb24gdHJpZ2dlcmVkLCB3aGljaCBzaG91bGRcbiAgICAgKiByZXR1cm4gYSBwcm9taXNlIHRoYXQgaW4gdHVybiBpcyBwYXNzZWQgdG8gYHRoaXMucHJvbWlzZWBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byByZWdpc3RlciBhcyBldmVudCBoYW5kbGVyXG4gICAgICovXG4gICAgbGlzdGVuQW5kUHJvbWlzZTogZnVuY3Rpb24oY2FsbGJhY2ssIGJpbmRDb250ZXh0KSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIGJpbmRDb250ZXh0ID0gYmluZENvbnRleHQgfHwgdGhpcztcbiAgICAgICAgdGhpcy53aWxsQ2FsbFByb21pc2UgPSAodGhpcy53aWxsQ2FsbFByb21pc2UgfHwgMCkgKyAxO1xuXG4gICAgICAgIHZhciByZW1vdmVMaXN0ZW4gPSB0aGlzLmxpc3RlbihmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBwcm9taXNlIGJ1dCBnb3QgJyArIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IGNhbGxiYWNrLmFwcGx5KGJpbmRDb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiBtZS5wcm9taXNlLmNhbGwobWUsIHByb21pc2UpO1xuICAgICAgICB9LCBiaW5kQ29udGV4dCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBtZS53aWxsQ2FsbFByb21pc2UtLTtcbiAgICAgICAgICByZW1vdmVMaXN0ZW4uY2FsbChtZSk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHVibGlzaGVzIGFuIGV2ZW50IHVzaW5nIGB0aGlzLmVtaXR0ZXJgIChpZiBgc2hvdWxkRW1pdGAgYWdyZWVzKVxuICAgICAqL1xuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICAgIHByZSA9IHRoaXMucHJlRW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgYXJncyA9IHByZSA9PT0gdW5kZWZpbmVkID8gYXJncyA6IF8uaXNBcmd1bWVudHMocHJlKSA/IHByZSA6IFtdLmNvbmNhdChwcmUpO1xuICAgICAgICBpZiAodGhpcy5zaG91bGRFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCh0aGlzLmV2ZW50TGFiZWwsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIHB1Ymxpc2ggdGhlIGV2ZW50IG9uIHRoZSBuZXh0IHRpY2tcbiAgICAgKi9cbiAgICB0cmlnZ2VyQXN5bmM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLG1lID0gdGhpcztcbiAgICAgICAgXy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lLnRyaWdnZXIuYXBwbHkobWUsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFByb21pc2UgZm9yIHRoZSB0cmlnZ2VyZWQgYWN0aW9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqICAgUmVzb2x2ZWQgYnkgY29tcGxldGVkIGNoaWxkIGFjdGlvbi5cbiAgICAgKiAgIFJlamVjdGVkIGJ5IGZhaWxlZCBjaGlsZCBhY3Rpb24uXG4gICAgICogICBJZiBsaXN0ZW5BbmRQcm9taXNlJ2QsIHRoZW4gcHJvbWlzZSBhc3NvY2lhdGVkIHRvIHRoaXMgdHJpZ2dlci5cbiAgICAgKiAgIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgZm9yIG5leHQgY2hpbGQgYWN0aW9uIGNvbXBsZXRpb24uXG4gICAgICovXG4gICAgdHJpZ2dlclByb21pc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAgIHZhciBjYW5IYW5kbGVQcm9taXNlID1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignY29tcGxldGVkJykgPj0gMCAmJlxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdmYWlsZWQnKSA+PSAwO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gXy5jcmVhdGVQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gSWYgYGxpc3RlbkFuZFByb21pc2VgIGlzIGxpc3RlbmluZ1xuICAgICAgICAgICAgLy8gcGF0Y2ggYHByb21pc2VgIHcvIGNvbnRleHQtbG9hZGVkIHJlc29sdmUvcmVqZWN0XG4gICAgICAgICAgICBpZiAobWUud2lsbENhbGxQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgXy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZF9wcm9taXNlX21ldGhvZCA9IG1lLnByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgIG1lLnByb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCYWNrIHRvIHlvdXIgcmVndWxhcmx5IHNjaGVkdWxlIHByb2dyYW1taW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgbWUucHJvbWlzZSA9IG9sZF9wcm9taXNlX21ldGhvZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZS5wcm9taXNlLmFwcGx5KG1lLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBtZS50cmlnZ2VyLmFwcGx5KG1lLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYW5IYW5kbGVQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZVN1Y2Nlc3MgPSBtZS5jb21wbGV0ZWQubGlzdGVuKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGYWlsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVGYWlsZWQgPSBtZS5mYWlsZWQubGlzdGVuKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGYWlsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS50cmlnZ2VyQXN5bmMuYXBwbHkobWUsIGFyZ3MpO1xuXG4gICAgICAgICAgICBpZiAoIWNhbkhhbmRsZVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn07XG4iLCIvKipcbiAqIEEgbW9kdWxlIG9mIG1ldGhvZHMgdGhhdCB5b3Ugd2FudCB0byBpbmNsdWRlIGluIGFsbCBzdG9yZXMuXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlU3RvcmVgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0b3JlLCBkZWZpbml0aW9uKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gZGVmaW5pdGlvbikge1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZpbml0aW9uLCBuYW1lKTtcblxuICAgICAgICBpZiAoIXByb3BlcnR5RGVzY3JpcHRvci52YWx1ZSB8fCB0eXBlb2YgcHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlICE9PSAnZnVuY3Rpb24nIHx8ICFkZWZpbml0aW9uLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3JlW25hbWVdID0gZGVmaW5pdGlvbltuYW1lXS5iaW5kKHN0b3JlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHJvcGVydHkgPSBkZWZpbml0aW9uW25hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgIT09ICdmdW5jdGlvbicgfHwgIWRlZmluaXRpb24uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcmVbbmFtZV0gPSBwcm9wZXJ0eS5iaW5kKHN0b3JlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RvcmU7XG59O1xuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsa2V5KXtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLm9iamVjdChba2V5XSxbbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIF8uZXh0ZW5kKHRoaXMsUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyk7XG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCBjYiA9IChrZXkgPT09IHVuZGVmaW5lZCA/IHRoaXMuc2V0U3RhdGUgOiBmdW5jdGlvbih2KXtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lLmlzTW91bnRlZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBtZS5pc01vdW50ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShfLm9iamVjdChba2V5XSxbdl0pKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsY2IpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudDogUmVmbHV4Lkxpc3RlbmVyTWl4aW4uY29tcG9uZW50V2lsbFVubW91bnRcbiAgICB9O1xufTtcbiIsInZhciBSZWZsdXggPSByZXF1aXJlKCcuL2luZGV4JyksXG4gIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZSwga2V5LCBmaWx0ZXJGdW5jKSB7XG4gICAgZmlsdGVyRnVuYyA9IF8uaXNGdW5jdGlvbihrZXkpID8ga2V5IDogZmlsdGVyRnVuYztcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24obGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24oa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGdW5jLmNhbGwodGhpcywgbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBpbml0aWFsIHBheWxvYWQgZnJvbSBzdG9yZS5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmlsdGVyRnVuYy5jYWxsKHRoaXMsIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfLm9iamVjdChba2V5XSwgW3Jlc3VsdF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfLmV4dGVuZCh0aGlzLCBSZWZsdXguTGlzdGVuZXJNZXRob2RzKTtcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShmaWx0ZXJGdW5jLmNhbGwobWUsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpbHRlckZ1bmMuY2FsbChtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShfLm9iamVjdChba2V5XSwgW3Jlc3VsdF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1peGluLmNvbXBvbmVudFdpbGxVbm1vdW50XG4gICAgfTtcbn07XG5cbiIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBLZWVwID0gcmVxdWlyZSgnLi9LZWVwJyksXG4gICAgYWxsb3dlZCA9IHtwcmVFbWl0OjEsc2hvdWxkRW1pdDoxfTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFjdGlvbiBmdW5jdG9yIG9iamVjdC4gSXQgaXMgbWl4ZWQgaW4gd2l0aCBmdW5jdGlvbnNcbiAqIGZyb20gdGhlIGBQdWJsaXNoZXJNZXRob2RzYCBtaXhpbi4gYHByZUVtaXRgIGFuZCBgc2hvdWxkRW1pdGAgbWF5XG4gKiBiZSBvdmVycmlkZGVuIGluIHRoZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiBUaGUgYWN0aW9uIG9iamVjdCBkZWZpbml0aW9uXG4gKi9cbnZhciBjcmVhdGVBY3Rpb24gPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG5cbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbiB8fCB7fTtcbiAgICBpZiAoIV8uaXNPYmplY3QoZGVmaW5pdGlvbikpe1xuICAgICAgICBkZWZpbml0aW9uID0ge2FjdGlvbk5hbWU6IGRlZmluaXRpb259O1xuICAgIH1cblxuICAgIGZvcih2YXIgYSBpbiBSZWZsdXguQWN0aW9uTWV0aG9kcyl7XG4gICAgICAgIGlmICghYWxsb3dlZFthXSAmJiBSZWZsdXguUHVibGlzaGVyTWV0aG9kc1thXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IG92ZXJyaWRlIEFQSSBtZXRob2QgXCIgKyBhICtcbiAgICAgICAgICAgICAgICBcIiBpbiBSZWZsdXguQWN0aW9uTWV0aG9kcy4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcih2YXIgZCBpbiBkZWZpbml0aW9uKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2RdICYmIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2RdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGQgK1xuICAgICAgICAgICAgICAgIFwiIGluIGFjdGlvbiBjcmVhdGlvbi4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluaXRpb24uY2hpbGRyZW4gPSBkZWZpbml0aW9uLmNoaWxkcmVuIHx8IFtdO1xuICAgIGlmIChkZWZpbml0aW9uLmFzeW5jUmVzdWx0KXtcbiAgICAgICAgZGVmaW5pdGlvbi5jaGlsZHJlbiA9IGRlZmluaXRpb24uY2hpbGRyZW4uY29uY2F0KFtcImNvbXBsZXRlZFwiLFwiZmFpbGVkXCJdKTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IDAsIGNoaWxkQWN0aW9ucyA9IHt9O1xuICAgIGZvciAoOyBpIDwgZGVmaW5pdGlvbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmFtZSA9IGRlZmluaXRpb24uY2hpbGRyZW5baV07XG4gICAgICAgIGNoaWxkQWN0aW9uc1tuYW1lXSA9IGNyZWF0ZUFjdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgY29udGV4dCA9IF8uZXh0ZW5kKHtcbiAgICAgICAgZXZlbnRMYWJlbDogXCJhY3Rpb25cIixcbiAgICAgICAgZW1pdHRlcjogbmV3IF8uRXZlbnRFbWl0dGVyKCksXG4gICAgICAgIF9pc0FjdGlvbjogdHJ1ZVxuICAgIH0sIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzLCBSZWZsdXguQWN0aW9uTWV0aG9kcywgZGVmaW5pdGlvbik7XG5cbiAgICB2YXIgZnVuY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3RvcltmdW5jdG9yLnN5bmM/XCJ0cmlnZ2VyXCI6XCJ0cmlnZ2VyUHJvbWlzZVwiXS5hcHBseShmdW5jdG9yLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBfLmV4dGVuZChmdW5jdG9yLGNoaWxkQWN0aW9ucyxjb250ZXh0KTtcblxuICAgIEtlZXAuY3JlYXRlZEFjdGlvbnMucHVzaChmdW5jdG9yKTtcblxuICAgIHJldHVybiBmdW5jdG9yO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFjdGlvbjtcbiIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBLZWVwID0gcmVxdWlyZSgnLi9LZWVwJyksXG4gICAgbWl4ZXIgPSByZXF1aXJlKCcuL21peGVyJyksXG4gICAgYWxsb3dlZCA9IHtwcmVFbWl0OjEsc2hvdWxkRW1pdDoxfSxcbiAgICBiaW5kTWV0aG9kcyA9IHJlcXVpcmUoJy4vYmluZE1ldGhvZHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGV2ZW50IGVtaXR0aW5nIERhdGEgU3RvcmUuIEl0IGlzIG1peGVkIGluIHdpdGggZnVuY3Rpb25zXG4gKiBmcm9tIHRoZSBgTGlzdGVuZXJNZXRob2RzYCBhbmQgYFB1Ymxpc2hlck1ldGhvZHNgIG1peGlucy4gYHByZUVtaXRgXG4gKiBhbmQgYHNob3VsZEVtaXRgIG1heSBiZSBvdmVycmlkZGVuIGluIHRoZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiBUaGUgZGF0YSBzdG9yZSBvYmplY3QgZGVmaW5pdGlvblxuICogQHJldHVybnMge1N0b3JlfSBBIGRhdGEgc3RvcmUgaW5zdGFuY2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG5cbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbiB8fCB7fTtcblxuICAgIGZvcih2YXIgYSBpbiBSZWZsdXguU3RvcmVNZXRob2RzKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2FdICYmIChSZWZsdXguUHVibGlzaGVyTWV0aG9kc1thXSB8fCBSZWZsdXguTGlzdGVuZXJNZXRob2RzW2FdKSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGEgK1xuICAgICAgICAgICAgICAgIFwiIGluIFJlZmx1eC5TdG9yZU1ldGhvZHMuIFVzZSBhbm90aGVyIG1ldGhvZCBuYW1lIG9yIG92ZXJyaWRlIGl0IG9uIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzIC8gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBkIGluIGRlZmluaXRpb24pe1xuICAgICAgICBpZiAoIWFsbG93ZWRbZF0gJiYgKFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2RdIHx8IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbZF0pKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBvdmVycmlkZSBBUEkgbWV0aG9kIFwiICsgZCArXG4gICAgICAgICAgICAgICAgXCIgaW4gc3RvcmUgY3JlYXRpb24uIFVzZSBhbm90aGVyIG1ldGhvZCBuYW1lIG9yIG92ZXJyaWRlIGl0IG9uIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzIC8gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5pdGlvbiA9IG1peGVyKGRlZmluaXRpb24pO1xuXG4gICAgZnVuY3Rpb24gU3RvcmUoKSB7XG4gICAgICAgIHZhciBpPTAsIGFycjtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBfLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmV2ZW50TGFiZWwgPSBcImNoYW5nZVwiO1xuICAgICAgICBiaW5kTWV0aG9kcyh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdCAmJiBfLmlzRnVuY3Rpb24odGhpcy5pbml0KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuYWJsZXMpe1xuICAgICAgICAgICAgYXJyID0gW10uY29uY2F0KHRoaXMubGlzdGVuYWJsZXMpO1xuICAgICAgICAgICAgZm9yKDtpIDwgYXJyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG9NYW55KGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfLmV4dGVuZChTdG9yZS5wcm90b3R5cGUsIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMsIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzLCBSZWZsdXguU3RvcmVNZXRob2RzLCBkZWZpbml0aW9uKTtcblxuICAgIHZhciBzdG9yZSA9IG5ldyBTdG9yZSgpO1xuICAgIEtlZXAuY3JlYXRlZFN0b3Jlcy5wdXNoKHN0b3JlKTtcblxuICAgIHJldHVybiBzdG9yZTtcbn07XG4iLCJleHBvcnRzLkFjdGlvbk1ldGhvZHMgPSByZXF1aXJlKCcuL0FjdGlvbk1ldGhvZHMnKTtcblxuZXhwb3J0cy5MaXN0ZW5lck1ldGhvZHMgPSByZXF1aXJlKCcuL0xpc3RlbmVyTWV0aG9kcycpO1xuXG5leHBvcnRzLlB1Ymxpc2hlck1ldGhvZHMgPSByZXF1aXJlKCcuL1B1Ymxpc2hlck1ldGhvZHMnKTtcblxuZXhwb3J0cy5TdG9yZU1ldGhvZHMgPSByZXF1aXJlKCcuL1N0b3JlTWV0aG9kcycpO1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IHJlcXVpcmUoJy4vY3JlYXRlQWN0aW9uJyk7XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZVN0b3JlJyk7XG5cbmV4cG9ydHMuY29ubmVjdCA9IHJlcXVpcmUoJy4vY29ubmVjdCcpO1xuXG5leHBvcnRzLmNvbm5lY3RGaWx0ZXIgPSByZXF1aXJlKCcuL2Nvbm5lY3RGaWx0ZXInKTtcblxuZXhwb3J0cy5MaXN0ZW5lck1peGluID0gcmVxdWlyZSgnLi9MaXN0ZW5lck1peGluJyk7XG5cbmV4cG9ydHMubGlzdGVuVG8gPSByZXF1aXJlKCcuL2xpc3RlblRvJyk7XG5cbmV4cG9ydHMubGlzdGVuVG9NYW55ID0gcmVxdWlyZSgnLi9saXN0ZW5Ub01hbnknKTtcblxuXG52YXIgbWFrZXIgPSByZXF1aXJlKCcuL2pvaW5zJykuc3RhdGljSm9pbkNyZWF0b3I7XG5cbmV4cG9ydHMuam9pblRyYWlsaW5nID0gZXhwb3J0cy5hbGwgPSBtYWtlcihcImxhc3RcIik7IC8vIFJlZmx1eC5hbGwgYWxpYXMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblxuZXhwb3J0cy5qb2luTGVhZGluZyA9IG1ha2VyKFwiZmlyc3RcIik7XG5cbmV4cG9ydHMuam9pblN0cmljdCA9IG1ha2VyKFwic3RyaWN0XCIpO1xuXG5leHBvcnRzLmpvaW5Db25jYXQgPSBtYWtlcihcImFsbFwiKTtcblxudmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gXy5FdmVudEVtaXR0ZXI7XG5cbmV4cG9ydHMuUHJvbWlzZSA9IF8uUHJvbWlzZTtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzZXQgb2YgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSBkZWZpbml0aW9ucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBhY3Rpb25zIHRvIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFjdGlvbnMgb2YgY29ycmVzcG9uZGluZyBhY3Rpb24gbmFtZXNcbiAqL1xuZXhwb3J0cy5jcmVhdGVBY3Rpb25zID0gZnVuY3Rpb24oZGVmaW5pdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9ucyA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gZGVmaW5pdGlvbnMpe1xuICAgICAgICBpZiAoZGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBkZWZpbml0aW9uc1trXSxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lID0gXy5pc09iamVjdCh2YWwpID8gayA6IHZhbDtcblxuICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25OYW1lXSA9IGV4cG9ydHMuY3JlYXRlQWN0aW9uKHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFjdGlvbnM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGV2ZW50bWl0dGVyIHRoYXQgUmVmbHV4IHVzZXNcbiAqL1xuZXhwb3J0cy5zZXRFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihjdHgpIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IF8uRXZlbnRFbWl0dGVyID0gY3R4O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIFByb21pc2UgbGlicmFyeSB0aGF0IFJlZmx1eCB1c2VzXG4gKi9cbmV4cG9ydHMuc2V0UHJvbWlzZSA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIGV4cG9ydHMuUHJvbWlzZSA9IF8uUHJvbWlzZSA9IGN0eDtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBQcm9taXNlIGZhY3RvcnkgdGhhdCBjcmVhdGVzIG5ldyBwcm9taXNlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZmFjdG9yeSBoYXMgdGhlIHNpZ25hdHVyZSBgZnVuY3Rpb24ocmVzb2x2ZXIpIHsgcmV0dXJuIFtuZXcgUHJvbWlzZV07IH1gXG4gKi9cbmV4cG9ydHMuc2V0UHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4gICAgXy5jcmVhdGVQcm9taXNlID0gZmFjdG9yeTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBtZXRob2QgdXNlZCBmb3IgZGVmZXJyaW5nIGFjdGlvbnMgYW5kIHN0b3Jlc1xuICovXG5leHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24obmV4dFRpY2spIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBfLm5leHRUaWNrID0gbmV4dFRpY2s7XG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBzZXQgb2YgY3JlYXRlZCBhY3Rpb25zIGFuZCBzdG9yZXMgZm9yIGludHJvc3BlY3Rpb25cbiAqL1xuZXhwb3J0cy5fX2tlZXAgPSByZXF1aXJlKCcuL0tlZXAnKTtcblxuLyoqXG4gKiBXYXJuIGlmIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIG5vdCBhdmFpbGFibGVcbiAqL1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBub3QgYXZhaWxhYmxlLiAnICtcbiAgICAnRVM1IHNoaW0gcmVxdWlyZWQuICcgK1xuICAgICdodHRwczovL2dpdGh1Yi5jb20vc3BvaWtlL3JlZmx1eGpzI2VzNSdcbiAgKTtcbn1cbiIsIi8qKlxuICogSW50ZXJuYWwgbW9kdWxlIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBhbmQgaW5zdGFuY2Ugam9pbiBtZXRob2RzXG4gKi9cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgIF8gPSByZXF1aXJlKFwiLi91dGlsc1wiKSxcbiAgICBjcmVhdGVTdG9yZSA9IHJlcXVpcmUoXCIuL2NyZWF0ZVN0b3JlXCIpLFxuICAgIHN0cmF0ZWd5TWV0aG9kTmFtZXMgPSB7XG4gICAgICAgIHN0cmljdDogXCJqb2luU3RyaWN0XCIsXG4gICAgICAgIGZpcnN0OiBcImpvaW5MZWFkaW5nXCIsXG4gICAgICAgIGxhc3Q6IFwiam9pblRyYWlsaW5nXCIsXG4gICAgICAgIGFsbDogXCJqb2luQ29uY2F0XCJcbiAgICB9O1xuXG4vKipcbiAqIFVzZWQgaW4gYGluZGV4LmpzYCB0byBjcmVhdGUgdGhlIHN0YXRpYyBqb2luIG1ldGhvZHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJhdGVneSBXaGljaCBzdHJhdGVneSB0byB1c2Ugd2hlbiB0cmFja2luZyBsaXN0ZW5hYmxlIHRyaWdnZXIgYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RhdGljIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBzdG9yZSB3aXRoIGEgam9pbiBsaXN0ZW4gb24gdGhlIGdpdmVuIGxpc3RlbmFibGVzIHVzaW5nIHRoZSBnaXZlbiBzdHJhdGVneVxuICovXG5leHBvcnRzLnN0YXRpY0pvaW5DcmVhdG9yID0gZnVuY3Rpb24oc3RyYXRlZ3kpe1xuICAgIHJldHVybiBmdW5jdGlvbigvKiBsaXN0ZW5hYmxlcy4uLiAqLykge1xuICAgICAgICB2YXIgbGlzdGVuYWJsZXMgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVTdG9yZSh7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXNbc3RyYXRlZ3lNZXRob2ROYW1lc1tzdHJhdGVneV1dLmFwcGx5KHRoaXMsbGlzdGVuYWJsZXMuY29uY2F0KFwidHJpZ2dlckFzeW5jXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbi8qKlxuICogVXNlZCBpbiBgTGlzdGVuZXJNZXRob2RzLmpzYCB0byBjcmVhdGUgdGhlIGluc3RhbmNlIGpvaW4gbWV0aG9kc1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmF0ZWd5IFdoaWNoIHN0cmF0ZWd5IHRvIHVzZSB3aGVuIHRyYWNraW5nIGxpc3RlbmFibGUgdHJpZ2dlciBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQW4gaW5zdGFuY2UgbWV0aG9kIHdoaWNoIHNldHMgdXAgYSBqb2luIGxpc3RlbiBvbiB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMgdXNpbmcgdGhlIGdpdmVuIHN0cmF0ZWd5XG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VKb2luQ3JlYXRvciA9IGZ1bmN0aW9uKHN0cmF0ZWd5KXtcbiAgICByZXR1cm4gZnVuY3Rpb24oLyogbGlzdGVuYWJsZXMuLi4sIGNhbGxiYWNrKi8pe1xuICAgICAgICBfLnRocm93SWYoYXJndW1lbnRzLmxlbmd0aCA8IDMsJ0Nhbm5vdCBjcmVhdGUgYSBqb2luIHdpdGggbGVzcyB0aGFuIDIgbGlzdGVuYWJsZXMhJyk7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlcyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbGlzdGVuYWJsZXMucG9wKCksXG4gICAgICAgICAgICBudW1iZXJPZkxpc3RlbmFibGVzID0gbGlzdGVuYWJsZXMubGVuZ3RoLFxuICAgICAgICAgICAgam9pbiA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkxpc3RlbmFibGVzOiBudW1iZXJPZkxpc3RlbmFibGVzLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzW2NhbGxiYWNrXXx8Y2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbGlzdGVuZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgc3RyYXRlZ3k6IHN0cmF0ZWd5XG4gICAgICAgICAgICB9LCBpLCBjYW5jZWxzID0gW10sIHN1Ym9iajtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bWJlck9mTGlzdGVuYWJsZXM7IGkrKykge1xuICAgICAgICAgICAgXy50aHJvd0lmKHRoaXMudmFsaWRhdGVMaXN0ZW5pbmcobGlzdGVuYWJsZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtYmVyT2ZMaXN0ZW5hYmxlczsgaSsrKSB7XG4gICAgICAgICAgICBjYW5jZWxzLnB1c2gobGlzdGVuYWJsZXNbaV0ubGlzdGVuKG5ld0xpc3RlbmVyKGksam9pbiksdGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0KGpvaW4pO1xuICAgICAgICBzdWJvYmogPSB7bGlzdGVuYWJsZTogbGlzdGVuYWJsZXN9O1xuICAgICAgICBzdWJvYmouc3RvcCA9IG1ha2VTdG9wcGVyKHN1Ym9iaixjYW5jZWxzLHRoaXMpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSAodGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdKS5jb25jYXQoc3Vib2JqKTtcbiAgICAgICAgcmV0dXJuIHN1Ym9iajtcbiAgICB9O1xufTtcblxuLy8gLS0tLSBpbnRlcm5hbCBqb2luIGZ1bmN0aW9ucyAtLS0tXG5cbmZ1bmN0aW9uIG1ha2VTdG9wcGVyKHN1Ym9iaixjYW5jZWxzLGNvbnRleHQpe1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksIHN1YnMgPSBjb250ZXh0LnN1YnNjcmlwdGlvbnMsXG4gICAgICAgICAgICBpbmRleCA9IChzdWJzID8gc3Vicy5pbmRleE9mKHN1Ym9iaikgOiAtMSk7XG4gICAgICAgIF8udGhyb3dJZihpbmRleCA9PT0gLTEsJ1RyaWVkIHRvIHJlbW92ZSBqb2luIGFscmVhZHkgZ29uZSBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgZm9yKGk9MDtpIDwgY2FuY2Vscy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjYW5jZWxzW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KGpvaW4pIHtcbiAgICBqb2luLmxpc3RlbmFibGVzRW1pdHRlZCA9IG5ldyBBcnJheShqb2luLm51bWJlck9mTGlzdGVuYWJsZXMpO1xuICAgIGpvaW4uYXJncyA9IG5ldyBBcnJheShqb2luLm51bWJlck9mTGlzdGVuYWJsZXMpO1xufVxuXG5mdW5jdGlvbiBuZXdMaXN0ZW5lcihpLGpvaW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYWxsYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKGpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkW2ldKXtcbiAgICAgICAgICAgIHN3aXRjaChqb2luLnN0cmF0ZWd5KXtcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RyaWN0XCI6IHRocm93IG5ldyBFcnJvcihcIlN0cmljdCBqb2luIGZhaWxlZCBiZWNhdXNlIGxpc3RlbmVyIHRyaWdnZXJlZCB0d2ljZS5cIik7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxhc3RcIjogam9pbi5hcmdzW2ldID0gY2FsbGFyZ3M7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhbGxcIjogam9pbi5hcmdzW2ldLnB1c2goY2FsbGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgam9pbi5saXN0ZW5hYmxlc0VtaXR0ZWRbaV0gPSB0cnVlO1xuICAgICAgICAgICAgam9pbi5hcmdzW2ldID0gKGpvaW4uc3RyYXRlZ3k9PT1cImFsbFwiP1tjYWxsYXJnc106Y2FsbGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRJZkFsbExpc3RlbmFibGVzRW1pdHRlZChqb2luKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbWl0SWZBbGxMaXN0ZW5hYmxlc0VtaXR0ZWQoam9pbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgam9pbi5udW1iZXJPZkxpc3RlbmFibGVzOyBpKyspIHtcbiAgICAgICAgaWYgKCFqb2luLmxpc3RlbmFibGVzRW1pdHRlZFtpXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGpvaW4uY2FsbGJhY2suYXBwbHkoam9pbi5saXN0ZW5lcixqb2luLmFyZ3MpO1xuICAgIHJlc2V0KGpvaW4pO1xufVxuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuXG4vKipcbiAqIEEgbWl4aW4gZmFjdG9yeSBmb3IgYSBSZWFjdCBjb21wb25lbnQuIE1lYW50IGFzIGEgbW9yZSBjb252ZW5pZW50IHdheSBvZiB1c2luZyB0aGUgYExpc3RlbmVyTWl4aW5gLFxuICogd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgc2V0IGxpc3RlbmVycyBpbiB0aGUgYGNvbXBvbmVudERpZE1vdW50YCBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gKiAgbGlzdGVuZWQgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGRlZmF1bHQgaGFuZGxlclxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBtaXhpbiwgd2hpY2ggc2V0cyB1cCB0aGUgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBsaXN0ZW5hYmxlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsY2FsbGJhY2ssaW5pdGlhbCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB1cCB0aGUgbWl4aW4gYmVmb3JlIHRoZSBpbml0aWFsIHJlbmRlcmluZyBvY2N1cnMuIEltcG9ydCBtZXRob2RzIGZyb20gYExpc3RlbmVyTWV0aG9kc2BcbiAgICAgICAgICogYW5kIHRoZW4gbWFrZSB0aGUgY2FsbCB0byBgbGlzdGVuVG9gIHdpdGggdGhlIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yKHZhciBtIGluIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW21dICE9PSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJDYW4ndCBoYXZlIG90aGVyIHByb3BlcnR5ICdcIittK1wiJyB3aGVuIHVzaW5nIFJlZmx1eC5saXN0ZW5UbyFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW21dID0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsY2FsbGJhY2ssaW5pdGlhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuICAgIH07XG59O1xuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuLyoqXG4gKiBBIG1peGluIGZhY3RvcnkgZm9yIGEgUmVhY3QgY29tcG9uZW50LiBNZWFudCBhcyBhIG1vcmUgY29udmVuaWVudCB3YXkgb2YgdXNpbmcgdGhlIGBsaXN0ZW5lck1peGluYCxcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IHNldCBsaXN0ZW5lcnMgaW4gdGhlIGBjb21wb25lbnREaWRNb3VudGAgbWV0aG9kLiBUaGlzIHZlcnNpb24gaXMgdXNlZFxuICogdG8gYXV0b21hdGljYWxseSBzZXQgdXAgYSBgbGlzdGVuVG9NYW55YCBjYWxsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5hYmxlcyBBbiBvYmplY3Qgb2YgbGlzdGVuYWJsZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCB0byBiZSB1c2VkIGFzIGEgbWl4aW4sIHdoaWNoIHNldHMgdXAgdGhlIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIGxpc3RlbmFibGVzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGVzKXtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHVwIHRoZSBtaXhpbiBiZWZvcmUgdGhlIGluaXRpYWwgcmVuZGVyaW5nIG9jY3Vycy4gSW1wb3J0IG1ldGhvZHMgZnJvbSBgTGlzdGVuZXJNZXRob2RzYFxuICAgICAgICAgKiBhbmQgdGhlbiBtYWtlIHRoZSBjYWxsIHRvIGBsaXN0ZW5Ub2Agd2l0aCB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IodmFyIG0gaW4gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0gIT09IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbbV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbid0IGhhdmUgb3RoZXIgcHJvcGVydHkgJ1wiK20rXCInIHdoZW4gdXNpbmcgUmVmbHV4Lmxpc3RlblRvTWFueSFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW21dID0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvTWFueShsaXN0ZW5hYmxlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuICAgIH07XG59O1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWl4KGRlZikge1xuICAgIHZhciBjb21wb3NlZCA9IHtcbiAgICAgICAgaW5pdDogW10sXG4gICAgICAgIHByZUVtaXQ6IFtdLFxuICAgICAgICBzaG91bGRFbWl0OiBbXVxuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlZCA9IChmdW5jdGlvbiBtaXhEZWYobWl4aW4pIHtcbiAgICAgICAgdmFyIG1peGVkID0ge307XG4gICAgICAgIGlmIChtaXhpbi5taXhpbnMpIHtcbiAgICAgICAgICAgIG1peGluLm1peGlucy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJNaXhpbikge1xuICAgICAgICAgICAgICAgIF8uZXh0ZW5kKG1peGVkLCBtaXhEZWYoc3ViTWl4aW4pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8uZXh0ZW5kKG1peGVkLCBtaXhpbik7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvc2VkKS5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb3NhYmxlKSB7XG4gICAgICAgICAgICBpZiAobWl4aW4uaGFzT3duUHJvcGVydHkoY29tcG9zYWJsZSkpIHtcbiAgICAgICAgICAgICAgICBjb21wb3NlZFtjb21wb3NhYmxlXS5wdXNoKG1peGluW2NvbXBvc2FibGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtaXhlZDtcbiAgICB9KGRlZikpO1xuXG4gICAgaWYgKGNvbXBvc2VkLmluaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGNvbXBvc2VkLmluaXQuZm9yRWFjaChmdW5jdGlvbiAoaW5pdCkge1xuICAgICAgICAgICAgICAgIGluaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGNvbXBvc2VkLnByZUVtaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLnByZUVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9zZWQucHJlRW1pdC5yZWR1Y2UoZnVuY3Rpb24gKGFyZ3MsIHByZUVtaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBwcmVFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gYXJncyA6IFtuZXdWYWx1ZV07XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChjb21wb3NlZC5zaG91bGRFbWl0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdXBkYXRlZC5zaG91bGRFbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICByZXR1cm4gIWNvbXBvc2VkLnNob3VsZEVtaXQuc29tZShmdW5jdGlvbiAoc2hvdWxkRW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc2hvdWxkRW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhjb21wb3NlZCkuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9zYWJsZSkge1xuICAgICAgICBpZiAoY29tcG9zZWRbY29tcG9zYWJsZV0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB1cGRhdGVkW2NvbXBvc2FibGVdID0gY29tcG9zZWRbY29tcG9zYWJsZV1bMF07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB1cGRhdGVkO1xufTtcbiIsIi8qXG4gKiBpc09iamVjdCwgZXh0ZW5kLCBpc0Z1bmN0aW9uLCBpc0FyZ3VtZW50cyBhcmUgdGFrZW4gZnJvbSB1bmRlc2NvcmUvbG9kYXNoIGluXG4gKiBvcmRlciB0byByZW1vdmUgdGhlIGRlcGVuZGVuY3lcbiAqL1xudmFyIGlzT2JqZWN0ID0gZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHZhciBzb3VyY2UsIHByb3A7XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAocHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgcHJvcCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgcHJvcGVydHlEZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLmlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuXG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcblxuZXhwb3J0cy5uZXh0VGljayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG59O1xuXG5leHBvcnRzLmNhcGl0YWxpemUgPSBmdW5jdGlvbihzdHJpbmcpe1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrc3RyaW5nLnNsaWNlKDEpO1xufTtcblxuZXhwb3J0cy5jYWxsYmFja05hbWUgPSBmdW5jdGlvbihzdHJpbmcpe1xuICAgIHJldHVybiBcIm9uXCIrZXhwb3J0cy5jYXBpdGFsaXplKHN0cmluZyk7XG59O1xuXG5leHBvcnRzLm9iamVjdCA9IGZ1bmN0aW9uKGtleXMsdmFscyl7XG4gICAgdmFyIG89e30sIGk9MDtcbiAgICBmb3IoO2kgPCBrZXlzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgb1trZXlzW2ldXSA9IHZhbHNbaV07XG4gICAgfVxuICAgIHJldHVybiBvO1xufTtcblxuZXhwb3J0cy5Qcm9taXNlID0gcmVxdWlyZShcIm5hdGl2ZS1wcm9taXNlLW9ubHlcIik7XG5cbmV4cG9ydHMuY3JlYXRlUHJvbWlzZSA9IGZ1bmN0aW9uKHJlc29sdmVyKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlByb21pc2UocmVzb2x2ZXIpO1xufTtcblxuZXhwb3J0cy5pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgKCdjYWxsZWUnIGluIHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJztcbn07XG5cbmV4cG9ydHMudGhyb3dJZiA9IGZ1bmN0aW9uKHZhbCxtc2cpe1xuICAgIGlmICh2YWwpe1xuICAgICAgICB0aHJvdyBFcnJvcihtc2d8fHZhbCk7XG4gICAgfVxufTtcbiJdfQ==
