make("EventEmitter", function() {
	"use strict";

	function EventEmitter() {
		this.handlers = {};
	}

	EventEmitter.prototype.on = function(eventName, callback, priority, once) {
		if (!eventName || !callback) {
			throw new Error("Can't listen to `" + eventName + "` with " + callback);
		}
		if (eventName.constructor === Array) {
			return this.stacked(eventName, callback, priority, once);
		}
		eventName = eventName.split(",");
		if (eventName.length === 1) {
			eventName = eventName.pop();
		}
		else {
			return this.stacked(eventName, callback, priority, once);
		}

		if (!this.handlers[eventName]) {
			this.handlers[eventName] = [];
		}
		this.handlers[eventName].push({c: callback, p: priority || 0, o: once});
		this.handlers[eventName].sort(this.sortPriorities);
	};

	EventEmitter.prototype.stacked = function(events, callback, priority, once) {
		while (events.length) {
			this.on(events.pop(), callback, priority, once);
		}
	};

	EventEmitter.prototype.sortPriorities = function(a, b) {
		return a.p - b.p;
	};

	EventEmitter.prototype.once = function(eventName, callback, priority) {
		this.on(eventName, callback, priority);
	};

	EventEmitter.prototype.off = function(eventName, callback) {
		var handlers = this.handlers[eventName];
		if (!handlers) {
			return;
		}
		for (var i = handlers.length; i--;) {
			if (handlers[i].c === callback) {
				handlers.splice(i, 1);
			}
		}
	};

	EventEmitter.prototype.hasListener = function(eventName) {
		return this.handlers[eventName] ? this.handlers[eventName].length : 0;
	};

	EventEmitter.prototype.emit = function(eventName) {
		var handlers = this.handlers[eventName];
		if (eventName !== "game-frame") {
			console.log(eventName, !!handlers);
		}
		if (!handlers) {
			return;
		}
		var handlersArguments = Array.prototype.slice.call(arguments, 1);
		var handler = null;
		for (var i = handlers.length; i--;) {
			handler = handlers[i];
			if (handler.o) {
				handlers.splice(i, 1);
			}
			handler.c.apply(this, handlersArguments);
		}
	};

	return EventEmitter;
});
