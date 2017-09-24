make("Symbol", function(Container, ClassUtil) {
	"use strict";

	function Symbol() {
		Container.apply(this, arguments);
	}

	ClassUtil.extend(Symbol, Container);

	Object.defineProperty(Symbol.prototype, "type", {
		get: function() {
			return this._type;
		},
		set: function(value) {
			if (_type !== value) {
				this.onTypeChange(value);
			}
			this._type = value;

		}
	});
	
	Symbol.prototype.onTypeChange = function() {
	    
	};

	return Symbol;
});
