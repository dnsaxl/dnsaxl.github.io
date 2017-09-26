make("Model", function(ClassUtil, EventEmitter) {
	"use strict";

	function Model() {
		EventEmitter.call(this);
		ClassUtil.bindAll(this);
	}

	ClassUtil.extend(Model, EventEmitter);

	Model.prototype.property = function(property, defaultValue) {
		var _value;
		Object.defineProperty(this, property, {
			get: function() {
				return _value;
			},
			set: function(value) {
				if (_value !== value) {
					var prev = _value;
					_value = value;
					this.emit(property + "-changed", value);
				}
			}
		});

		if (defaultValue !== undefined) {
			this[property] = defaultValue;
		}
	};

	return Model;
});