make("Button", function(Container, ClassUtil, Sprite) {
	"use strict";

	function Button(idle, down, over) {
		Container.apply(this, arguments);
		this.interactive = true;
		if (idle && idle.constructor === String) {
			this.idle = this.addChild(new Sprite(idle));
		}
		if (down && down.constructor === String) {
			this.down = this.addChild(new Sprite(down));
		}
		if (over && over.constructor === String) {
			this.over = this.addChild(new Sprite(over));
		}
		this.on("mousedown,touchstart", this.onDown);
		this.on("mouseup,touchend,touchcancel", this.onUp);
		this.down.visible = false;
	}

	ClassUtil.extend(Button, Container);

	Button.prototype.onDown = function(event, trueTarget) {
		if (this.idle) {
			this.idle.visible = false;
		}
		if (this.over) {
			this.over.visible = false;
		}
		if (this.down) {
			this.down.visible = true;
		}
	};

	Button.prototype.onUp = function(event, trueTarget) {
		if (this.idle) {
			this.idle.visible = !trueTarget || !this.over;
		}
		if (this.over) {
			this.over.visible = trueTarget;
		}
		if (this.down) {
			this.down.visible = false;
		}
	};

	Object.defineProperty(Button.prototype, "enabled", {
		get: function() {
			return this._enabled;
		},
		set: function(value) {
			if (value) {
				this.onEnable();
			}
			else {
				this.onDisable();
			}
			this._enabled = value;
		}
	});

	Button.prototype.onEnable = function() {
		this.resetState();
		this.interactive = true;
	};

	Button.prototype.onDisable = function() {
		this.resetState();
		this.interactive = false;
	};

	Button.prototype.resetState = function() {
		if (this.idle) {
			this.idle.visible = true;
		}
		if (this.over) {
			this.over.visible = false;
		}
		if (this.down) {
			this.down.visible = false;
		}
	};

	return Button;
});