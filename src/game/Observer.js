make("Observer", function(ObjectUtil, ClassUtil, msg) {
	"use strict";

	function Observer(target, properties, onChange) {
		ClassUtil.bindAll(this);
		this.target = target;
		this.debounce = true;
		this.onChange = onChange;
		this.lastValues = {};

		ObjectUtil.mixinSpecific(this.lastValues, target, properties);
		this.resume();
	}

	Object.defineProperty(Observer.prototype, "debounce", {
		get: function() {
			return this._debounce;
		},
		set: function(value) {
			if (value !== this._debounce) {
				this._debounce = value;
				this.restart();
			}
		}
	});

	Observer.prototype.changeChecker = function() {
		for (var property in this.lastValues) {
			if (this.target[property] !== this.lastValues[property]) {
				this.onChange(property, this.target[property], this.lastValues[property]);
			}
			this.lastValues[property] = this.target[property];
		}
	};

	Observer.prototype.changeCheckerDebounced = function() {
		var changes = {}, change = false;
		for (var property in this.lastValues) {
			if (this.target[property] !== this.lastValues[property]) {
				changes[property] = this.target[property];
				change = changes;
			}
			this.lastValues[property] = this.target[property];
		}
		if (change) {
			this.onChange(change);
		}
	};

	Observer.prototype.restart = function() {
		this.pause();
		this.resume();
	};

	Observer.prototype.pause = function() {
		msg.off(msg.EVENTS.GAME.FRAME, this.changeChecker);
		msg.off(msg.EVENTS.GAME.FRAME, this.changeCheckerDebounced);
	};

	Observer.prototype.resume = function() {
		msg.on(msg.EVENTS.GAME.FRAME, this.debounce ? this.changeCheckerDebounced : this.changeChecker);
	};

	return Observer;
});
