make("Symbol", function(Container, ClassUtil, Sprite, BlendModes, Tween, msg) {
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

	Symbol.prototype.showWin = function() {
		this.image.blendMode = BlendModes.SCREEN;
		this.scaleUp();
		msg.once(msg.EVENTS.SPIN.BEGIN, this.reset);
	};

	Symbol.prototype.scaleUp = function() {
		var scale = 1.3;
		Tween.to(this, 0.6, {scaleX: scale, scaleY: scale, onComplete: this.scaleDown});
	};

	Symbol.prototype.scaleDown = function() {
		Tween.to(this, 0.6, {scaleX: 1, scaleY: 1, onComplete: this.scaleUp});
	};

	Symbol.prototype.reset = function() {
		Tween.killByTarget(this);
		this.setScale(1);
		this.image.blendMode = BlendModes.SOURCE.OVER;
	};

	return Symbol;
});
