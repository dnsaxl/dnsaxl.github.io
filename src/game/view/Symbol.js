make("Symbol", function(Container, ClassUtil, Sprite) {
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
			if (this._type !== value) {
				this._type = value;
				this.onTypeChange();
			}
		}
	});

	Symbol.prototype.onTypeChange = function() {
		var url = "images/" + this.type + ".png";
		if (!this.image) {
			this.image = this.addChild(new Sprite(url));
		}
		else {
			this.image.setFrame(url);
		}
	};

	return Symbol;
});
