make("Model", function(ClassUtil, EventEmitter) {
	"use strict";

	function Model() {
		EventEmitter.call(this);
		ClassUtil.bindAll(this);
	}

	ClassUtil.extend(Model, EventEmitter);

	Model.prototype.property = function(property, defaultValue) {
		this[property] = defaultValue;
		Object.defineProperty(this, property, {
			get: function() {
				return this[property];
			},
			set: function(value) {
				if (this[property] !== value) {
					this[property] = value;
					this.emit(property + "/changed", value);
				}
			}
		});
	};

	return Model;
});