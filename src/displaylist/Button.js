make("Button", function(Container, ClassUtil, Sprite) {
	"use strict";

	function Button(idle, down) {
		Container.apply(this, arguments);
		this.interactive = true;
		if (idle.constructor === String) {
			this.idle = this.addChild(new Sprite(idle));
		}
		if (down.constructor === String) {
			this.down = this.addChild(new Sprite(down));
		}
		console.log(idle.constructor === String, down.constructor === String, this);
		this.on("mousedown,touchstart", this.onDown);
		this.on("mouseup,touchend,touchcancel", this.onUp);
		this.down.visible = false;
	}

	ClassUtil.extend(Button, Container);

	Button.prototype.onDown = function() {
		this.idle.visible = false;
		this.down.visible = true;
	};

	Button.prototype.onUp = function() {
		this.idle.visible = true;
		this.down.visible = false;
	};

	// Object.defineProperty(Button.prototype, "anchorX", {
	// 	get: function() {
	// 		return this._anchorX;
	// 	},
	// 	set: function(value) {
	// 		this._anchorX = value;
	// 		this.updateAnchors();
	// 	}
	// });
	//
	// Object.defineProperty(Button.prototype, "anchorY", {
	// 	get: function() {
	// 		return this._anchorY;
	// 	},
	// 	set: function(value) {
	// 		this._anchorY = value;
	// 		this.updateAnchors();
	// 	}
	// });

	Button.prototype.setAnchor = function(value) {
		//this._anchorX = this._anchorY = value;
		this.updateAnchors(value, value);
	};

	Button.prototype.updateAnchors = function(ax, ay) {
		if (this.idle) {
			this.idle.anchorX = ax;
			this.idle.anchorY = ay;
		}
		if (this.down) {
			this.down.anchorX = ax;
			this.down.anchorY = ay;
		}
	};

	return Button;
});
